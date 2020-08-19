const fs = require('fs');
const path = require('path')

//统一定义一个写日志的function
const writeLog = (writeStream, log) => {
    writeStream.write(log + '\n')
}


// 写一个function 这样可以更加的scable。。。
function createWriteStream(fileName) {
    const fullFileName = path.join(__dirname, '../', '../', 'logs', fileName)
    const writeStream = fs.createWriteStream(fullFileName, {
        flags: 'a'
    })
    return writeStream
}
const accessWriteStream = createWriteStream('access.log')

const access = (_log) => {
    writeLog(accessWriteStream, _log)

}

module.exports = {
    access
}