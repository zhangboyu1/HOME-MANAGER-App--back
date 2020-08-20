const env = process.env.NODE_ENV //environment viriables

var MYSQL_CONF
var REDIS_CONF

if (env === 'dev') {
    MYSQL_CONF = {
        host: "db-mysql-v1-29254-do-user-7904424-0.a.db.ondigitalocean.com",
        user: "doadmin",
        password: "bxvs9216wxwvdudm",
        database: 'defaultdb',
        insecureAuth: true
    };

    REDIS_CONF = {
        port: 6379,
        host: "127.0.0.1"
    }
}

if (env === 'production') {
    // 先暂时不写了吧
    MYSQL_CONF = {
        host: "localhost",
        user: "root",
        password: "zz5135462",
        database: 'homemanger',
        insecureAuth: true
    };

    REDIS_CONF = {
        port: 6379,
        host: "127.0.0.1"
    }
}

module.exports = {
    MYSQL_CONF,
    REDIS_CONF
}
