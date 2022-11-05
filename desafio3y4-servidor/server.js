const express = require('express')
const routerProducts = require('./routerExpress')

const server = express()

server.use(express.json())
server.use(express.urlencoded({extended: true}))

server.use('/', express.static('public'))
server.use('/api/productos', routerProducts)

function conectServer(port = 0){
    return new Promise((resolve, reject) => {
        const serverConected = server.listen(port, () => {
            resolve(serverConected)
        })
        serverConected.on("error", error => reject(error))
    })
}

module.exports = {conectServer}