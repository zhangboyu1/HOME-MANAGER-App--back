const http = require("http")

const PORT = 8000
const serverHandle = require('./normal')

const server = http.createServer(serverHandle)

server.listen(PORT)