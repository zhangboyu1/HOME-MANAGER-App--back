const { exec } = require('../db/mysql')

const Login = (_loginCheckData) => {
    //应该是去对应的Sign-up表中去查找
    const { userName, password } = _loginCheckData;
    let sql = `select users_EMAIL, users_FIRSTNAME, users_LASTNAME, users_TITLE from users where users_EMAIL='${userName}' and users_PASSWORD='${password}'`
    return exec(sql)
}


const SignUp = (_SignUpInfo) => {
    // 直接在表中插入这些数据。。。。。
    const { userName, password } = _SignUpInfo

    let sql_QUERYUSER = 'SELECT * FROM USERS WHERE 1=1';
    userName && password && (sql_QUERYUSER += ` and users_EMAIL='${userName}' and users_PASSWORD='${password}' order by users_CREATETIME;`)

    return exec(sql_QUERYUSER).then(_result_USERQUERY => {
        // console.log('THE QUERY RESULT WOULD BE:', _result_USERQUERY)
        if (_result_USERQUERY.length === 0) {
            // 如果查询结果不是空集的话。。那我们就开始插入这个值
            const users_CREATETIME = Date.now()
            let sql_INSERTUSER = 'INSERT INTO users (users_EMAIL, users_PASSWORD, users_CREATETIME) VALUES ' +
                `('${userName}', '${password}',${users_CREATETIME});`
            return exec(sql_INSERTUSER)

        } else {

            console.log('the user has already registered in the database....')
            return exec(sql_QUERYUSER)
        }

    })
    // 先查询，后insert。。这个怎么玩

}


const AddProfile = (_profileData) => {
    console.log(_profileData)
    const { userName, firstName, lastName, title } = _profileData;
    let sql = `UPDATE users SET users_FIRSTNAME='${firstName}', users_LASTNAME='${lastName}', users_TITLE='${title}' WHERE ` + `users_EMAIL='${userName}'`
    return exec(sql)
}

module.exports = {
    Login,
    SignUp,
    AddProfile
}