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
    handlePostData(req).then(_postData => {
        req.body = _postData
        let scheduleresult_returnToClient = handleSchedule(req, res)
        if (scheduleresult_returnToClient) {
            console.log('-------------Now return to client---------------')
            console.log(scheduleresult_returnToClient)
            scheduleresult_returnToClient.then(_result_ControlReturn => {
                res.end(JSON.stringify(result_ControlReturn))
            })
            return
        }

        const userRes_returnToClient = handleUser(req, res)
        if (userRes_returnToClient) {
            userRes_returnToClient.then(_result_ControlReturn => {
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



