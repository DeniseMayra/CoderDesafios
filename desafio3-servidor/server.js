const {container} =require('../Desafio2-archivos')
const express = require('express')

const server = express()

const products = new container("productsD3.txt")

server.get('/productos', async(req,res) => {
    const product = await products.getAll()
    res.json(product)  
})

server.get('/productoRandom', async(req,res) => {
    const product = await products.getAll()
    const numRandom = Math.floor(Math.random() * product.length)
    const prodRandom = product[numRandom]
    res.json(prodRandom)
}) 

function conectServer(port = 0){
    return new Promise((resolve, reject) => {
        const serverConected = server.listen(port, () => {
            resolve(serverConected)
        })
        serverConected.on("error", error => reject(error))
    })
}

module.exports = {conectServer}