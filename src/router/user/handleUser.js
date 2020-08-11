const handleUser = (req, res) => {


    // 这里面无非就是两种，一种是post。。我要往数据库里添加schedule

    if (req.method === 'POST' && req.path === '/api/user/signup') {

        console.log('now the server is doing signup insertion')
        return {
            msg: 'This is the new signup API.'
        }
    }

    if (req.method === 'POST' && req.path === '/api/user/login') {
        return {
            msg: 'This is the new login API.'
        }
    }
}



module.exports = handleUser