const Login = (_username, password) => {
    //应该是去对应的Sign-up表中去查找
    return {
        id: 1,
        username: 'Li@@gmail.com',
        firstName: 'Boyu',
        lastName: 'Li',
        title: 'Front-end Developer'
    }
}


const SignUp = (_userName, _passwprd, _firstName, _lastName, _title) => {
    // 直接在表中插入这些数据。。。。。
    return {
        id: 1,
        username: 'boyu@gmail.com',
        firstName: 'Boyu',
        lastName: 'Zhang',
        title: 'Front-end Developer'
    }
}

module.exports = {
    Login,
    SignUp
}