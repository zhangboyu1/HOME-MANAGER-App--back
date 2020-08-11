const { getList, NewShcedule } = require('../../controller/schedule')
const { SuccessModel, ErrorModel } = require('../../model/resModel')
const handleUser = require('../user/handleUser')

const susMsg_LIST = 'NOW THE SCHEDULE CAN BE VIEW'
const errorMsg_LIST = 'WORONG! THE SCHDULE CANNNOT BE VIEWED'
const susMsg_NEW = 'NOW THE SCHEDULE IS SUCCESSFULLY A NEW ONE'
const errorMsg_NEW = 'WORNG! THE SCHDULE CANNOT BE A NEW ONE '
const susMsg_DELETE = 'NOW THE SCHEDULE CAN BE DELETED'
const errorMsg_DELETE = 'WRONG! THE SCHDULE CANNNOT BE DELETED'



const handleSchedule = (req, res) => {
    // 这里面无非就是两种，一种是post。。我要往数据库里添加schedule
    if (req.method === 'POST' && req.path === '/api/schedule/new') {
        //handle POSTDATA BY CHUNK by promise.....
        const scheduleData = req.body
        console.log(scheduleData)
        const newResult = NewShcedule(scheduleData)
        console.log(newResult)
        const returnData = newResult !== {} ?
            new SuccessModel(newResult, susMsg_NEW)
            :
            new ErrorModel('', errorMsg_NEW)
        return returnData
    }

    if (req.method === 'POST' && req.path === '/api/schedule/delete') {
        return {
            msg: 'This is the delete schedule API'
        }
    }

    // 还有一种是查找对应日期的的schdule GET
    if (req.method === 'GET' && req.path === '/api/schedule/list') {
        const date = req.query.date || ''
        const user = req.query.user || ''
        const listResult = getList(date, user)
        console.log(listResult.length)
        const returnData = listResult.length ?
            new SuccessModel(listResult, susMsg_LIST)
            :
            new ErrorModel('', errorMsg_LIST)
        return returnData
    }
}


module.exports = handleSchedule