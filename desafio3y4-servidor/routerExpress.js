const {Router} = require('express')
const {container} =require('../Desafio2-archivos')

const products = new container("productsD3.txt")

const routerProducts = new Router()

routerProducts.get('/', async(req,res) => {
    //devuelve todos los productos
    const product = await products.getAll()
    res.json(product)
})
routerProducts.get('/:id', async(req,res) => {
    //devuelve prod segun id
    const prodId = await products.getById(req.params.id)
    if (prodId != null){
        res.json(prodId)
    } else {
        res.status(404)
        res.send("error: producto no encontrado")
    }
})
routerProducts.post('/', async(req,res) => {
    // recibe y agrega un prod, devuelve el id
    const newProd = {...req.body}
    const prodId = await products.save(newProd) 
    res.status(201)
    res.json(prodId)
})
routerProducts.put('/:id', (req,res) => {
    //recibe y actualiza un prod segun id
    console.log(req.body)
    const prodUpdate = {...req.body, id: req.params.id}
    products.updateById(prodUpdate)
    res.json('producto actualizado')
})
routerProducts.delete('/:id', (req,res) => {
    products.deleteById(req.params.id)
    res.json('eliminado correctamente')
})

module.exports=routerProducts