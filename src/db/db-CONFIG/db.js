const env = process.env.NODE_ENV //environment viriables
console.log(env)

let MYSQL_CONF
let REDIS_CONF

if (env === 'dev') {
    console.log('Now the server created by node.js is runing at the DEV environment...')

    MYSQL_CONF = {
        host: "localhost",
        user: "root",
        password: "aa5135462",
        database: 'homemanger'.toUpperCase(), //这里mysql只认小写。。。醉了。。。
        insecureAuth: true
    }

    REDIS_CONF = {
        port: 6379,
        host: '127.0.0.1'
    }
}

if (env === 'production') {
    先暂时不写了吧
    MYSQL_CONF = {
        host: "localhost",
        user: "root",
        password: "aa5135462",
        database: 'HOMEMANAGER',
        insecureAuth: true
    }
}

module.exports = {
    MYSQL_CONF,
    REDIS_CONF
}