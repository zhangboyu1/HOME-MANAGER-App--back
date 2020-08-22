const { exec, escape } = require('../db/mysql')
const xss = require('xss')
const { generatePassword } = require('../db/cryp')

const Login = (_loginCheckData) => {
    //应该是去对应的Sign-up表中去查找
    const { userName, password } = _loginCheckData;
    let sql = `select users_EMAIL, users_FIRSTNAME, users_LASTNAME, users_TITLE from users where users_EMAIL=${escape(userName)} and users_PASSWORD=${escape(generatePassword(password))}`
    console.log(sql)
    return exec(sql)
}


const SignUp = (_SignUpInfo) => {
    // 直接在表中插入这些数据。。。。。
    const { userName, password } = _SignUpInfo

    console.log(_SignUpInfo)

    let sql_QUERYUSER = 'SELECT * FROM USERS WHERE 1=1';
    userName && password && (sql_QUERYUSER += ` and users_EMAIL='${userName}' and users_PASSWORD='${generatePassword(password)}' order by users_CREATETIME;`)

    console.log(sql_QUERYUSER)

    return exec(sql_QUERYUSER).then(_result_USERQUERY => {
        console.log('THE QUERY RESULT WOULD BE:', _result_USERQUERY)
        if (_result_USERQUERY.length === 0) {
            // 如果查询结果不是空集的话。。那我们就开始插入这个值
            console.log('This would be the first time to do the sign-up')
            const users_CREATETIME = Date.now()
            let sql_INSERTUSER = 'INSERT INTO users (users_EMAIL, users_PASSWORD, users_CREATETIME) VALUES ' +
                `('${userName}', '${generatePassword(password)}',${users_CREATETIME});`

            console.log(sql_INSERTUSER)
            return exec(sql_INSERTUSER)
        } else {
            return exec(sql_QUERYUSER)
        }
    })
}


const AddProfile = (_profileData) => {
    console.log(_profileData)
    const { userName, firstName, lastName, title } = _profileData;
    let sql = `UPDATE users SET users_FIRSTNAME='${xss(firstName)}', users_LASTNAME='${xss(lastName)}', users_TITLE='${xss(title)}' WHERE ` + `users_EMAIL='${xss(userName)}'`
    return exec(sql)
}

module.exports = {
    Login,
    SignUp,
    AddProfile
}