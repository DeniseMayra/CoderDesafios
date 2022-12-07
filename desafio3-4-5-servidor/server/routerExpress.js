import Router  from 'express'
import {getProducts, getById, addProduct, updateProduct, deleteProduct} from './routerFunctions'

const routerProducts = new Router()

routerProducts.get('/', getProducts)
routerProducts.get('/:id', getById)
routerProducts.post('/', addProduct)
routerProducts.put('/:id', updateProduct)
routerProducts.delete('/:id', deleteProduct)

export default routerProducts