const { exec } = require('../db/mysql')
const { xss } = require(`xss`)
//controller should handle the interaction with database.....
const getScheduleList = (_date, _user) => {
    // This section should interact with database....
    //Now we can retun the fake data 
    console.log('now it starts to exc the sql with database')
    console.log(_date, _user)
    let sql = `SELECT schedules_CONTENT, schedules_DATE FROM SCHEDULES WHERE schedules_DATE='${_date}' AND user='${_user}' AND state=1 ORDER BY schedules_CREATETIME;`
    console.log(sql)
    return exec(sql) // return this promise
}

const NewShcedule = (_schedule_NEW = {}) => {
    //It should contaon date, scheduleContent, createTime, user
    const { date, content, user } = _schedule_NEW
    const createTime = Date.now()
    let sql = 'INSERT INTO SCHEDULES (schedules_DATE, schedules_CONTENT, schedules_CREATETIME, `user`) VALUES ' +
        `('${xss(date)}', '${xss(content)} ', '${xss(createTime)} ', '${xss(user)}');`
    return exec(sql)
}

const DeleteShcedule = (_deleteSheculde) => {
    const { date, user, content } = _deleteSheculde
    let sql = `UPDATE SCHEDULES SET state=0 WHERE schedules_DATE='${xss(date)}' and user='${xss(user)}' and schedules_CONTENT='${xss(content)}';`
    return exec(sql) // return this promise
}


const getScheduleAll = (_user) => {
    let sql = `SELECT schedules_DATE FROM SCHEDULES WHERE 1=1 and user='${_user}' AND state=1 ORDER BY schedules_CREATETIME;`
    return exec(sql)
}


module.exports = {
    getScheduleList,
    NewShcedule,
    DeleteShcedule,
    getScheduleAll
}