import container from '../../Desafio2-archivos.js'

const productsClass = new container("productsD3.txt")

const getProducts = async(req,res) => {
    //devuelve todos los productos
    const products = await productsClass.getAll()
    let haveProd = false
    if(products.lenght != 0){
        haveProd = true
    }
    // renderiza plantilla list de handlebars, pasando por parametro los valores que se utilizaran en la plantilla
    // res.render('list', {haveProd, products}) // !!!! Failed to lookup view "list" in views directory "/Users/denisehi
    res.json(products)
}

const getById = async(req,res) => {
    //devuelve prod segun id
    const prodId = await productsClass.getById(req.params.id)
    if (prodId != null){
        res.json(prodId)
    } else {
        res.status(404)
        res.send("error: producto no encontrado")
    }
}

const addProduct = async(req,res) => {
    // recibe y agrega un prod, devuelve el id
    const newProd = {...req.body}
    const prodId = await productsClass.save(newProd) 
    res.status(201)
    res.redirect('/')
}

const updateProduct = (req,res) => {
    //recibe y actualiza un prod segun id
    const prodUpdate = {...req.body, id: req.params.id}
    productsClass.updateById(prodUpdate)
    res.json('producto actualizado')
}

const deleteProduct =(req,res) => {
    productsClass.deleteById(req.params.id)
    res.json('eliminado correctamente')
}

export {getProducts, getById, addProduct, updateProduct, deleteProduct}