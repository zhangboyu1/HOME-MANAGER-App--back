const { SuccessModel, ErrorModel } = require('../../model/resModel')
const { SignUp, Login } = require('../../controller/user')

const susMsg_SIGNUP = 'NOW THE SCHEDULE JUST SIGNED UP'
const errorMsg_SIGNUP = 'WORONG! THE SCHDULE CANNNOT BE SIGNED UP'
const susMsg_LOGIN = 'WELCOME TO OUR HOME-MANAGER-APP'
const errorMsg_LOGIN = 'WORNG! CANNOT BE LOGINED IN'


const handleUser = (req, res) => {
    // 这里面无非就是两种，一种是post。。我要往数据库里添加schedule
    if (req.path === '/api/user/signup') {
        const signUpData = req.body
        return SignUp(signUpData).then(_resultFromDatabase => {
            console.log(_resultFromDatabase)
            return _resultFromDatabase.insertId != 0 ?
                new SuccessModel(_resultFromDatabase.insertId, susMsg_SIGNUP)
                :
                new ErrorModel([], errorMsg_SIGNUP)
        })
    }

    if (req.path === '/api/user/login') {
        const loginCheckData = req.body
        return Login(loginCheckData).then(_resultFromDatabase => {
            return _resultFromDatabase.length ?
                new SuccessModel(_resultFromDatabase, susMsg_LOGIN)
                :
                new ErrorModel(_resultFromDatabase, errorMsg_LOGIN)
        })
    }
}


module.exports = handleUser