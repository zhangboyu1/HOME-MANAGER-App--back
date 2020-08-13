const { SuccessModel, ErrorModel } = require('../../model/resModel')
const { SignUp, Login } = require('../../controller/user')
const susMsg_SIGNUP = 'NOW THE SCHEDULE JUST SIGNED UP'
const errorMsg_SIGNUP = 'WORONG! THE SCHDULE CANNNOT BE SIGNED UP'
const susMsg_LOGIN = 'WELCOME TO OUR HOME-MANAGER-APP'
const errorMsg_LOGIN = 'WORNG! CANNOT BE LOGINED IN'


const { get } = require('../../db/redis.js')

const handleUser = (req, res) => {
    // 这里面无非就是两种，一种是post。。我要往数据库里添加schedule
    if (req.method === 'GET' && req.path === '/api/user/signup') {
        const signUpData = req.body
        return SignUp(signUpData).then(_resultFromDatabase => {
            // console.log(_resultFromDatabase)
            return _resultFromDatabase.insertId != 0 ?
                new SuccessModel(_resultFromDatabase.insertId, susMsg_SIGNUP)
                :
                new ErrorModel([], errorMsg_SIGNUP)
        })
    }

    if (req.method === 'GET' && req.path === '/api/user/login') {
        // const loginCheckData = req.body
        // const { userName, password } = loginCheckData;
        console.log('Now it starts to login')
        // 先用query试一下。。
        const { userName, password } = req.query
        const loginCheckData = req.query  //就是还是需要从数据库中查看是否有这个用户名和密码。。。如果有，则设置cookie
        // 然后给浏览器设置cookie。。。。
        //要通过后端修改cookie，并给cookie做限制。。。使得前端无法修改这个cookie。。。
        return Login(loginCheckData).then(_resultFromDatabase => {
            //如果数据库中有这个数据的话。。。则把username 和firstname存入session中
            req.session.username = _resultFromDatabase[0].users_EMAIL;
            req.session.firstname = _resultFromDatabase[0].users_FIRSTNAME;

            // console.log(SESSION_DATA)
            // console.log(SESSION_DATA)
            return _resultFromDatabase.length ?
                new SuccessModel(_resultFromDatabase[0], susMsg_LOGIN)
                :
                new ErrorModel(_resultFromDatabase, errorMsg_LOGIN)
        })
    }

    if (req.method === 'GET' && req.path === '/api/user/loginCheck-test') {
        // 这个loginCheck实际上就是要看这个cookie的值是否满足条件。。。
        //而这个logincheck，则是查看后端收到的cookie中是否包含有这个userName。
        console.log(req.session)
        const userId = req.cookie.userId
        return get(userId).then(result => {
            console.log('The data get from the redis:')
            console.log(result)
            return new SuccessModel(result, susMsg_LOGIN)
        })
    }
}


module.exports = handleUser