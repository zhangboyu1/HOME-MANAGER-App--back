const { getScheduleList, NewShcedule, DeleteShcedule, getScheduleAll } = require('../../controller/schedule')
const { SuccessModel, ErrorModel } = require('../../model/resModel')
const susMsg_LIST = 'NOW THE SCHEDULE CAN BE VIEW'
const errorMsg_LIST = 'WORONG! THE SCHDULE CANNNOT BE VIEWED'
const susMsg_NEW = 'NOW THE SCHEDULE IS SUCCESSFULLY A NEW ONE'
const errorMsg_NEW = 'WORNG! THE SCHDULE CANNOT BE A NEW ONE '
const susMsg_DELETE = 'NOW THE SCHEDULE CAN BE DELETED'
const errorMsg_DELETE = 'WRONG! THE SCHDULE CANNNOT BE DELETED'
const errorMsg_LOGIN = 'WORNG! CANNOT BE LOGINED IN'
const susMsg_ALL = 'PLEASE VIEW ALL THE SCHEDULED DATES!'
const errorMsg_ALL = 'NO SHCEDULE YET!'

const { get } = require('../../db/redis.js')
const handleSchedule = (req, res) => {

    // 这里面无非就是两种，一种是post。。我要往数据库里添加schedule
    if (req.method === 'POST' && req.path === '/api/schedule/new') {
        const newSchdule = req.body
        return NewShcedule(newSchdule).then((result_returnFromDataBase) => {
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
            return result_returnFromDataBase.affectedRows != 0 ?
                new SuccessModel(result_returnFromDataBase.affectedRows, susMsg_DELETE)
                :
                new ErrorModel([], errorMsg_DELETE)
        })
    }

    // 还有一种是查找对应日期的的schdule GET
    if (req.method === 'GET' && req.path === '/api/schedule/list') {
        //OK 现在这个查看接口是调通了。。。//
        const date = req.query.date || ''
        const user = req.query.user || ''
        return getScheduleList(date, user).then(listResult => {
            return listResult.length ?
                new SuccessModel(listResult, susMsg_LIST)
                :
                new ErrorModel(listResult, errorMsg_LIST)
        })
    }

    if (req.method === 'GET' && req.path === '/api/schedule/all') {
        //OK 现在这个查看接口是调通了。。。//
        const user = req.query.user || ''
        return getScheduleAll(user).then(listResult => {
            return listResult.length ?
                new SuccessModel(listResult, susMsg_ALL)
                :
                new ErrorModel(listResult, errorMsg_ALL)
        })
    }


    if (req.method === 'GET' && req.path === '/') {
        //OK 现在这个查看接口是调通了。。。//
        console.log("hit the rout /")
        return Promise.resolve(new SuccessModel('This is our app', susMsg_ALL))
    }
}


module.exports = handleSchedule
