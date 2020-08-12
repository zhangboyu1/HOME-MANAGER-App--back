const { exec } = require('../db/mysql')

const Login = (_loginCheckData) => {
    //应该是去对应的Sign-up表中去查找
    const { userName, password } = _loginCheckData;

    //loginCheck.... LOGIN INFO store.......

    //password cannot be MINGWEN..IT needs to be crn
    let sql = `select users_EMAIL, users_FIRSTNAME, users_LASTNAME from users where users_EMAIL='${userName}' and users_PASSWORD='${password}'`
    return exec(sql)
}


const SignUp = (_SignUpInfo) => {
    // 直接在表中插入这些数据。。。。。
    const { userName, password, firstName, lastName, title } = _SignUpInfo
    const users_CREATETIME = Date.now()
    let sql = 'INSERT INTO users (users_EMAIL, users_PASSWORD, users_FIRSTNAME, `users_LASTNAME`, users_TITLE, users_CREATETIME) VALUES ' +
        `('${userName}', '${password}', '${firstName}', '${lastName}', '${title}',${users_CREATETIME});`
    return exec(sql)
}

module.exports = {
    Login,
    SignUp
}