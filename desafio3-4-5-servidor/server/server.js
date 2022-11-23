const express = require('express')
const routerProducts = require('./routerExpress')
const {engine} = require('express-handlebars')

const app = express()

// ------------- HANDLEBARS SETTING -------------
const hbsConfig = {
    extname: 'hbs',
    defaultLayout: 'index.hbs'
}
app.engine('hbs', engine(hbsConfig))
app.set('view engine', 'hbs')
app.set('views', '../views')

// ------------- ROUTES ------------
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// app.use('/', express.static('public'))
// app.get('/style.css', function(req,res){
//     res.sendFile('../style.css')
// })
app.get('/', (req, res) => {
    // renderiza plantilla form de handlebars
    res.render('form') 
})
app.use('/api/productos', routerProducts)

// ------------- SERVER -------------
function conectServer(port = 0){
    return new Promise((resolve, reject) => {
        const serverConected = app.listen(port, () => {
            resolve(serverConected)
        })
        serverConected.on("error", error => reject(error))
    })
}

module.exports = {conectServer}