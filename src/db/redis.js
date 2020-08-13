const redis = require("redis");
const { REDIS_CONF } = require('../db-CONFIG/db')
const { port, host } = REDIS_CONF


const client = redis.createClient(port, host);
client.on("error", (err, result) => {
    if (err) {
        return
    }
});

client.on('ready', function () {
    redisIsReady = true;
    console.log('redis is running');
});

function set(key, value) {
    if (typeof value === 'object') {
        value = JSON.stringify(value)
    }
    client.set(key, value, () => {
        redis.print
        console.log("ONE SEESION HAS BEEN INSERTED INTO THE REDIS")
    })
}


function get(key) {
    const promise = new Promise((resolve, reject) => {
        client.get(key, (err, val) => {
            console.log(val)
            if (err) {
                reject(err)
                console.log(err)
                return
            }
            if (val === null) {
                resolve(null)
            }
            try {
                resolve(JSON.parse(val))
            } catch (ex) {
                resolve(val)
            }
        })
    })
    return promise
}

module.exports = {
    set,
    get
}