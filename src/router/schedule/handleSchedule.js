const { getScheduleList, NewShcedule, DeleteShcedule } = require('../../controller/schedule')
const { SuccessModel, ErrorModel } = require('../../model/resModel')

const susMsg_LIST = 'NOW THE SCHEDULE CAN BE VIEW'
const errorMsg_LIST = 'WORONG! THE SCHDULE CANNNOT BE VIEWED'
const susMsg_NEW = 'NOW THE SCHEDULE IS SUCCESSFULLY A NEW ONE'
const errorMsg_NEW = 'WORNG! THE SCHDULE CANNOT BE A NEW ONE '
const susMsg_DELETE = 'NOW THE SCHEDULE CAN BE DELETED'
const errorMsg_DELETE = 'WRONG! THE SCHDULE CANNNOT BE DELETED'
const errorMsg_LOGIN = 'WORNG! CANNOT BE LOGINED IN'

const { get } = require('../../db/redis.js')

// const loginCheck = (req) => {
//     // console.log(req.session)
//     console.log('开始logincheck了。。。')
//     // const userId = req.cookie.userId
//     //直接从req。session中取。。。。
//     console.log(req.session)
//     if (!req.session.username) {
//         console.log('接下来要给normal.js返回一个promise')
//         return Promise.resolve(
//             new ErrorModel({}, errorMsg_LOGIN)
//         )
//     }
// }

// 这个loginCheck实际上就是要看这个cookie的值是否满足条件。。。
//而这个logincheck，则是查看后端收到的cookie中是否包含有这个userName......

const handleSchedule = (req, res) => {

    // 这里面无非就是两种，一种是post。。我要往数据库里添加schedule
    if (req.method === 'POST' && req.path === '/api/schedule/new') {
        //handle POSTDATA BY CHUNK by promise.....
        // 每次新建schedule的时候。。。需要。做登录验证。。。。
        // const loginCheckRsult = loginCheck(req)
        // if (loginCheckRsult) {
        //     console.log('User need to login')
        //     console.log(loginCheckRsult)
        //     return loginCheckRsult
        // }

        const newSchdule = req.body
        // console.log(newSchdule)
        return NewShcedule(newSchdule).then((result_returnFromDataBase) => {
            console.log(result_returnFromDataBase)
            return result_returnFromDataBase.insertId != 0 ?
                new SuccessModel(result_returnFromDataBase.insertId, susMsg_NEW)
                :
                new ErrorModel([], errorMsg_NEW)
        })
    }

    if (req.method === 'POST' && req.path === '/api/schedule/delete') {
        // deletSchele 是要删除特定的那一项。。。。。
        const deleteSheculde = req.body
        return DeleteShcedule(deleteSheculde).then(result_returnFromDataBase => {
            console.log(result_returnFromDataBase)
            return result_returnFromDataBase.affectedRows != 0 ?
                new SuccessModel(result_returnFromDataBase.affectedRows, susMsg_DELETE)
                :
                new ErrorModel([], errorMsg_DELETE)
        })
    }

    // 还有一种是查找对应日期的的schdule GET
    if (req.method === 'GET' && req.path === '/api/schedule/list') {
        //OK 现在这个查看接口是调通了。。。//
        console.log('Hit the route')
        const date = req.query.date || ''
        const user = req.query.user || ''
        return getScheduleList(date, user).then(listResult => {
            console.log('Now list data is:')
            console.log(listResult)
            return listResult.length ?
                new SuccessModel(listResult, susMsg_LIST)
                :
                new ErrorModel(listResult, errorMsg_LIST)
        })
    }
}


module.exports = handleSchedule