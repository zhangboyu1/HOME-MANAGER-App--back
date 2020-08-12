const { exec } = require('../db/mysql')
//controller should handle the interaction with database.....
const getScheduleList = (_date, _user) => {
    // This section should interact with database....
    //Now we can retun the fake data 
    console.log('now it starts to exc the sql with database')
    console.log(_date, _user)
    let sql = 'select * from schedules where 1=1';
    _date && _user && (sql += ` and schedules_DATE='${_date}' and user='${_user}' order by schedules_CREATETIME;`)
    console.log(sql)
    return exec(sql) // return this promise
}

const NewShcedule = (_schedule_NEW = {}) => {
    //It should contaon date, scheduleContent, createTime, user
    const { date, content, user } = _schedule_NEW
    const createTime = Date.now()
    let sql = 'INSERT INTO SCHEDULES (schedules_DATE, schedules_CONTENT, schedules_CREATETIME, `user`) VALUES ' +
        `('${date}', '${content}', '${createTime}', '${user}');`
    return exec(sql)
}

const DeleteShcedule = (_deleteSheculde) => {
    //It should contaon date, user
    const { date, user } = _deleteSheculde
    // here we use sofe delete.....by changing the state...
    let sql = `UPDATE SCHEDULES SET state=0 WHERE schedules_DATE='${date}' and user='${user}';`
    console.log(sql)
    return exec(sql) // return this promise
}


module.exports = {
    getScheduleList,
    NewShcedule,
    DeleteShcedule
}