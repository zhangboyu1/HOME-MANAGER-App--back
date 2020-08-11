
//controller should handle the interaction with database.....
const getList = (_date) => {
    // This section should interact with database....
    //Now we can retun the fake data 
    return [
        {
            id: 1,
            date: 'dd1-MM1-yyy1',
            schedule: "This is one of the  schdule",
            createTime: "123132132132132132",
            user: 'Jeremy'
        },
        {
            id: 2,
            date: 'dd2-MM2-yyy2',
            schedule: "This is one of the  schdule",
            createTime: "123132132132132132",
            user: 'Li'
        }
    ]

}


const NewShcedule = (schedule_NEW = {}) => {
    //It should contaon date, scheduleContent, createTime, user
    return {
        id: 2,
        date: 'dd2-MM2-yyy2',
        schedule: "This is one of the  schdule",
        createTime: "123132132132132132",
        user: 'Li'
    }
}


module.exports = {
    getList,
    NewShcedule
}