import express from 'express'
import routerProducts from './routerExpress.js'
import path from 'path'
import { fileURLToPath } from 'url'
import {engine} from 'express-handlebars'

const app = express()

// ------------- HANDLEBARS SETTING -------------
const hbsConfig = {
    extname: 'hbs',
    defaultLayout: 'index.hbs'
}
app.engine('hbs', engine(hbsConfig))
app.set('view engine', 'hbs')

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

app.set('views', path.join(__dirname, '../views'))

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

export default conectServer