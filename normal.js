const handleSchedule = require('./src/router/schedule/handleSchedule')
const handleUser = require('./src/router/user/handleUser')
const querystring = require('querystring')

const handlePostData = (req) => {
    promise = new Promise((resolve, reject) => {
        let postData = ''
        req.method !== 'POST' && req.headers['content-type'] != 'application/json'
            && reject('CANNOT HANDLE POST DATA')
            || (req.on('data', chunk => {
                postData += chunk.toString()
            }) && req.on('end', () => {
                postData && resolve(JSON.parse(postData))
            }))
    })
    return promise
}

serverHandle = (req, res) => {
    res.setHeader('Content-type', 'application/json') //client side needs to analysing the data...
    // get url and path is the common coding.....
    // --------------------------------------------------------
    const url = req.url
    req.path = url.split('?')[0]

    //We need to get the Query
    req.query = querystring.parse(url.split('?')[1])

    handlePostData(req).then(postData => {
        req.body = postData
        const scheduleData = handleSchedule(req, res)
        if (scheduleData) {
            res.end(
                JSON.stringify(scheduleData)
            )
            return
        }

        const userData = handleUser(req, res)
        if (userData) {
            res.end(
                JSON.stringify(userData)
            )
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



