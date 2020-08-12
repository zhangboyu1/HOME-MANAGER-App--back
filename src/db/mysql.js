const mysql = require('mysql')
const { MYSQL_CONF } = require('./db-CONFIG/db')

const con = mysql.createConnection(MYSQL_CONF)

con.connect((err, result) => {
    if (err) {
        console.log(err)
        return
    }
    console.log("The Database has been conntected!!!")
    console.log("__________________________________________")
});


function exec(sql) {    //这里定义的这个exec函数相当于是一个全局函数。。。
    const promise = new Promise((resolve, reject) => {
        con.query(sql, (err, result) => { // 通过con.query 来和数据库交流
            // console.log(err)
            if (err) {
                console.log(err)
            }
            console.log('------------EXEC----------------')
            resolve(result)
        })
    })
    return promise
}

module.exports = {
    exec
}