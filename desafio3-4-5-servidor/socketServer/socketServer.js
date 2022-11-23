const express = require('express')
const {container} = require('../../Desafio2-archivos')
const {Server: HttpServer} = require('http')
const {Server: IOServer} = require('socket.io')

const app = express()

// ------------- SOCKET.IO SETTING -------------
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)


// ------------- PUBLIC ------------
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api', express.static('../public'))


// ------------- SOCKET.IO ------------
const productsClass = new container("productsD6.txt")
const chatClass = new container("chatD6.txt")

io.on('connection', (socket) => {
    console.log(`usuario ${socket.id} conectado`)

    async function newUser(){
        const getAllProd = await productsClass.getAll()
        socket.emit('allProducts', getAllProd)

        const getAllMsj = await chatClass.getAll()
        socket.emit('allMsj', getAllMsj)
    }
    newUser()

    socket.on('newProduct', async(product) => {
        await productsClass.save(product)
        const getProducts = await productsClass.getAll()
        io.sockets.emit('allProducts', getProducts)
    })

    socket.on('newMessage', async(mssg) => {
        mssg.date = new Date().toLocaleString()
        await chatClass.save(mssg)
        const getMssg = await chatClass.getAll()
        io.sockets.emit('allMsj', getMssg)
    })
})

// ------------- SERVER -------------
function conectServer(port = 0){
    return new Promise((resolve, reject) => {
        const serverConected = httpServer.listen(port, () => {
            // pongo a escuchar el servidor express para socket.io
            resolve(serverConected)
        })
        serverConected.on("error", error => reject(error))
    })
}

module.exports = {conectServer}