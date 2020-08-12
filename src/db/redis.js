const redis = require('redis')
const { REDIS_CONF } = require('./db-CONFIG/db')
//Create client.....
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)


redisClient.on('connect', function () {
    console.log('Redis client connected');
});

redisClient.on('error', err => {
    console.error(err)

})

function set(key, value) {

    if (typeof value === 'object') {
        val = JSON.stringify(value)
    }

    console.log(key, val)
    redisClient.set(key, val, () => {
        console.log("ONE SEESION HAS BEEN INSERTED INTO THE REDIS")
    })
}



function get(key) {
    const promise = new Promise((resolve, reject) => {
        redisClient.get(key, (err, val) => {
            console.log(val)
            if (err) {
                reject(err)

                console.log(err)
                return
            }
            resolve(val)
        })
    })
    return promise

}

module.exports = {
    set,
    get
}