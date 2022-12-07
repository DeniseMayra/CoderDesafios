import express from 'express'
// import container from '../../Desafio2-archivos.js'
import {productContainer, chatContainer} from '../sqlDB/productContainer.js';
import {Server as HttpServer} from 'http'
import {Server} from 'socket.io'

const app = express()

// ------------- SOCKET.IO SETTING -------------
const httpServer = new HttpServer(app)
const io = new Server(httpServer)


// ------------- PUBLIC ------------
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api', express.static('../public'))


// ------------- SOCKET.IO ------------
// const productsClass = new container("productsD6.txt")
// const chatClass = new container("chatD6.txt")

io.on('connection', (socket) => {
    console.log(`usuario ${socket.id} conectado`)

    async function newUser(){
        const getAllProd = await productContainer.getAll()
        socket.emit('allProducts', getAllProd)

        const getAllMsj = await chatContainer.getAll()
        socket.emit('allMsj', getAllMsj)
    }
    newUser()

    socket.on('newProduct', async(product) => {
        await productContainer.save(product)
        const getProducts = await productContainer.getAll()
        io.sockets.emit('allProducts', getProducts)
    })

    socket.on('newMessage', async(mssg) => {
        mssg.date = new Date().toLocaleString()
        await chatContainer.save(mssg)
        const getMssg = await chatContainer.getAll()
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

export default conectServer