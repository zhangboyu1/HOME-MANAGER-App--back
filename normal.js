const handleSchedule = require('./src/router/schedule/handleSchedule')
const handleUser = require('./src/router/user/handleUser')
const querystring = require('querystring')

const { get, set } = require('./src/db/redis')
const { Login } = require('./src/controller/user')


const handlePostData = (req) => {
    promise = new Promise((resolve, reject) => {
        console.log('handle post data')
        let postData = ''
        req.method !== 'POST' && resolve('')
        req.method === 'POST' && (req.on('data', chunk => {
            console.log('adasdas')

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
    res.setHeader('Content-type', 'application/json') //client side needs to analysing the data...
    // get url and path is the common coding.....
    // --------------------------------------------------------
    if (err) {
        console.log(err)
    }
    const url = req.url.trim()
    req.path = url.split('?')[0].trim()
    //We need to get the Query
    req.query = querystring.parse(url.split('?')[1])
    console.log(req.path)
    console.log(req.method)
    // console.log(req.headers)

    // get the cookie
    req.cookie = {}
    const cookieStr = req.headers.cookie || '';
    cookieStr.split(';').forEach(item => {
        if (!item) {
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
    console.log('cookie us :', userId)
    // if (req.path === '/api/user/login') {
    if (userId) {
        // 尝试这个区redius库里查找。。
        if (!SESSION_DATA[userId]) {
            SESSION_DATA[userId] = {}
            console.log('sessiondata 里啥都没有')
            // 这个时候就应该去对应的Redis中查找了。。
        }
    } else {
        needSetCookie = true;
        userId = `${Date.now()}_${Math.random()}`
        SESSION_DATA[userId] = {}
    }
    req.session = SESSION_DATA[userId]
    // console.log()
    console.log(SESSION_DATA)
    console.log('now the session is:', req.session)
    // }


    handlePostData(req).then(_postData => {
        req.body = _postData
        console.log(_postData)
        let scheduleresult_returnToClient = handleSchedule(req, res)
        if (scheduleresult_returnToClient) {
            console.log('-------------Now return to client---------------')
            scheduleresult_returnToClient.then(_result_ControlReturn => {
                res.end(JSON.stringify(_result_ControlReturn))
            })
            return
        }

        const userRes_returnToClient = handleUser(req, res)
        if (userRes_returnToClient) {
            userRes_returnToClient.then(_result_ControlReturn => {
                console.log('Now we are at the view stage///////////////')
                console.log(_result_ControlReturn)
                // console.log(_result_ControlReturn)
                if (_result_ControlReturn.data.users_EMAIL) { //only can login set the cookie....
                    const expireDate = setCookieExpires()
                    console.log('need to re-set the cookie')
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
    // Handle Schdeule:
}

module.exports = serverHandle

// env: process.env.NODE_ENV 



