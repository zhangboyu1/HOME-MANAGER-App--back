const http = require("http")

const PORT = 3000

const serverHandle = require('./normal')

const server = http.createServer(serverHandle)

console.log(1)
server.listen(PORT)
