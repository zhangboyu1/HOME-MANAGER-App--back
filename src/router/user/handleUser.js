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
        const { userName, passwprd, firstName, lastName, title } = signUpData
        const signUpResult = SignUp(userName, passwprd, firstName, lastName, title)
        const returnData = signUpResult !== {} ?
            new SuccessModel(signUpResult, susMsg_SIGNUP)
            :
            new ErrorModel('', errorMsg_SIGNUP)
        return returnData
    }

    if (req.path === '/api/user/login') {
        const loginUpData = req.body
        const { userName, passwprd } = loginUpData
        const logInResult = Login(userName, passwprd)
        const returnData = logInResult !== {} ?
            new SuccessModel(logInResult, susMsg_LOGIN)
            :
            new ErrorModel('', errorMsg_LOGIN)
        return returnData


    }
}



module.exports = handleUser