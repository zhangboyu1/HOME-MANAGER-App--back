const mysql = require('mysql');
// const { MYSQL_CONF } = require('../db-CONFIG/db')
const fs = require('fs')
const path = require('path')


const MYSQL_CONF = {
    host: 'db-mysql-v1-29254-do-user-7904424-0.a.db.ondigitalocean.com',
    username: 'JerryZ',
    password: 'ze2wkje6aedq2y4j',
    database: 'defaultdb',
    port: 25060,
    dialect: 'mysql',
    // dialectOptions: {
    //     ssl: {
    //         ssl: true,
    //         cert: fs.readFileSync(path.resolve(__dirname, 'ca-certificate.crt')).toString()
    //     }
    // }
}

const con = mysql.createConnection(MYSQL_CONF)
con.connect((err, result) => {
    if (err) {
        throw new Error(err)
        return
    } else {
        console.log('Successfully connecing with the database')
    }
});


function exec(sql) {    //这里定义的这个exec函数相当于是一个全局函数。。。
    const promise = new Promise((resolve, reject) => {
        con.query(sql, (err, result) => { // 通过con.query 来和数据库交流
            // console.log(err)
            // if (err) {
            //     throw new Error(err)
            // }
            console.log('------------EXEC----------------')
            resolve(result)
        })
    })
    return promise
}

module.exports = {
    exec,
    escape: mysql.escape
}
