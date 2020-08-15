const { SuccessModel, ErrorModel } = require('../../model/resModel')
const { SignUp, Login, AddProfile } = require('../../controller/user')

const susMsg_SIGNUP = 'NOW THE SCHEDULE JUST SIGNED UP'
const errorMsg_SIGNUP = 'WORONG! THE SCHDULE CANNNOT BE SIGNED UP'
const susMsg_LOGIN = 'WELCOME TO OUR HOME-MANAGER-APP'
const errorMsg_LOGIN = 'WORNG! CANNOT BE LOGINED IN'
const susMsg_LOGOUT = 'PLEASE COME NEXT TIME'
const susMsg_UPDATE = 'NOW THE PROFILE HAS ALREADY BEEN UPDATED'
const errorMsg_UPDATE = 'PLEASE ADD THE PRODILE AGAIN..SOMETHING IS WRONG!'
const errorMsg_USERQUERY = 'THE USER HAS ALREADY BEEN EXISTED IN THE SYSTEM, PLEASE SIGNUP A NEW ONE'
// const errorMsg_USERQUERY = 'PLEASE ADD THE PRODILE AGAIN..SOMETHING IS WRONG!'

const { get } = require('../../db/redis.js')

const handleUser = (req, res) => {
    // 这里面无非就是两种，一种是post。。我要往数据库里添加schedule
    if (req.method === 'POST' && req.path === '/api/user/signup') {

        console.log('start signup????')
        const signUpData = req.body
        return SignUp(signUpData).then(_resultFromDatabase => {

            if (_resultFromDatabase[0]) {
                return new ErrorModel(_resultFromDatabase, errorMsg_USERQUERY)
            }
            return _resultFromDatabase.insertId != 0 ?
                new SuccessModel(_resultFromDatabase.insertId, susMsg_SIGNUP)
                :
                new ErrorModel([], errorMsg_SIGNUP)
        })
    }

    if (req.method === 'POST' && req.path === '/api/user/login') {
        const loginCheckData = req.body
        // 现在Redis中查找、、如果有这个Id的话。。就不继续从数据库中查找了。。。
        if (req.cookie.userId) {
            return get(req.cookie.userId).then(_resultFromRedis => {
                console.log(_resultFromRedis)
                console.log('The user has already has the history in login in this application')
                // req.session = _resultFromRedis
                console.log('now the SESSION is', req.session)
                if (_resultFromRedis != {}) {
                    return new SuccessModel(_resultFromRedis, susMsg_LOGIN)
                }
            })
        }

        return Login(loginCheckData).then(_resultFromDatabase => {
            //如果数据库中有这个数据的话。。。则把username 和firstname存入session中
            console.log('IT would be the first time to start the login in from the mysql database....')
            req.session.username = _resultFromDatabase[0].users_EMAIL;
            req.session.firstname = _resultFromDatabase[0].users_FIRSTNAME;

            console.log("req.session", req.session)
            return _resultFromDatabase.length ?
                new SuccessModel(_resultFromDatabase[0], susMsg_LOGIN)
                :
                new ErrorModel(_resultFromDatabase, errorMsg_LOGIN)
        })
    }

    if (req.method === 'POST' && req.path === '/api/user/logout') {
        // const logoutCheckData = req.body
        // 现在Redis中查找、、如果有这个Id的话。。就不继续从数据库中查找了。。。
        if (req.cookie.userId) {
            return get(req.cookie.userId).then(_resultFromRedis => {
                req.session = _resultFromRedis
                console.log('now the SESSION is', req.session)
                if (req.session != {}) {
                    return new SuccessModel(_resultFromRedis, susMsg_LOGOUT)
                }
            })
        }
    }

    if (req.method === 'POST' && req.path === '/api/user/profile') {
        // 这个loginCheck实际上就是要看这个cookie的值是否满足条件。。。
        //而这个logincheck，则是查看后端收到的cookie中是否包含有这个userName。
        const profileData = req.body

        console.log(profileData)
        return AddProfile(profileData).then(_resultFromDatabase => {
            console.log("updated profile would be :", _resultFromDatabase)
            return _resultFromDatabase.changedRows ?
                new SuccessModel(_resultFromDatabase.changedRows, susMsg_UPDATE)
                :
                new ErrorModel(_resultFromDatabase.changedRows, errorMsg_UPDATE)
        })
    }
}


module.exports = handleUser