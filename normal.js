const handleSchedule = require('./src/router/schedule/handleSchedule')
const handleUser = require('./src/router/user/handleUser')
const querystring = require('querystring')
const { get, set } = require('./src/db/redis')
const { Login } = require('./src/controller/user')
const { access } = require('./src/utils/log')


const handlePostData = (req) => {
    promise = new Promise((resolve, reject) => {
        let postData = ''
        req.method !== 'POST' && resolve('')
        req.method === 'POST' && (req.on('data', chunk => {
            postData += chunk.toString()
        }) && req.on('end', () => {
            postData && resolve(JSON.parse(postData))
        }))
    })
    return promise
}

// 再搞一个函数同来获取过期时间。。。
const setCookieExpires = () => {
    const d = new Date();
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
    return d.toGMTString()
}

const letCokkieExpireNow = () => {
    const d = new Date();
    d.setTime(d.getTime())
    return d.toGMTString()
}


//解析session
serverHandle = (req, res, err) => {
    if (err) {
        throw new Error('Handel server has error.....')
    }

    // Record log....
    const d2 = new Date();
    const currentLogTime = d2.toString()
    access(`${req.method} -- ${req.url} -- ${req.headers['user-agent']}  /n
    ---User: ${req.cookie ? req.cookie.userId : 'During Signup'} --- ${currentLogTime}
    --------------------------------------------------------------------------------------
    `)

    res.setHeader('Content-type', 'application/json') //client side needs to analysing the data...

    const url = req.url.trim()
    req.path = url.split('?')[0].trim()
    //We need to get the Query
    req.query = querystring.parse(url.split('?')[1])
    if (req.url.trim() === '/api/user/error') {
        throw new Error('This is the error url')
    }

    // get the cookie
    req.cookie = {}
    const cookieStr = req.headers.cookie || '';
    cookieStr.split(';').forEach(item => {
        if (!item) {
            // throw new Error('There is no any cookie string...')
            return
        }
        const arr = item.split('=')
        const key = arr[0].trim();
        const value = arr[1];
        req.cookie[key] = value;
    })
    // 解析session 
    let needSetCookie = false;
    let SESSION_DATA = {};
    let userId = req.cookie.userId
    if (userId) {
        if (!SESSION_DATA[userId]) {
            SESSION_DATA[userId] = {}
            // 这个时候就应该去对应的Redis中查找了。。
        }
    } else {
        needSetCookie = true;
        userId = `${Date.now()}_${Math.random()}`
        SESSION_DATA[userId] = {}
    }
    req.session = SESSION_DATA[userId]

    handlePostData(req).then(_postData => {
        req.body = _postData
        let scheduleresult_returnToClient = handleSchedule(req, res)
        if (scheduleresult_returnToClient) {
            scheduleresult_returnToClient.then(_result_ControlReturn => {
                res.end(JSON.stringify(_result_ControlReturn))
            })
            return
        }

        const userRes_returnToClient = handleUser(req, res)
        if (userRes_returnToClient) {
            userRes_returnToClient.then(_result_ControlReturn => {

                // console.log(_result_ControlReturn)
                if (_result_ControlReturn.data.users_EMAIL) { //only can login set the cookie....
                    const expireDate = setCookieExpires()
                    //就在这里把session写入redis中： 
                    set(userId, _result_ControlReturn.data)
                    res.setHeader('Set-Cookie', `userId=${userId};path = /; httpOnly; expires=${expireDate}`)
                    res.end(JSON.stringify(_result_ControlReturn))
                    return
                }

                const expireNow = letCokkieExpireNow()
                res.setHeader('Set-Cookie', `userId=${userId}; path = /; httpOnly; expires=${expireNow}`)
                res.end(JSON.stringify(_result_ControlReturn))
            })
            return
        }
        res.writeHead(404, { 'Content-type': 'text/plain' })
        res.write('404 NOT FOUND\n')
        res.end()
    })
    // ---------------------------------------------------------------
}

module.exports = serverHandle

// env: process.env.NODE_ENV 



