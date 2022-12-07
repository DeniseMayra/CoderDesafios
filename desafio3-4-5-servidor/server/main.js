import conectServer from './server.js'

async function main(){
    try{
        const server = await conectServer(8080)
        console.log(`Conectado al puerto ${server.address().port}`)
    }catch (err) {
        console.log(err)
    }
}

main()



