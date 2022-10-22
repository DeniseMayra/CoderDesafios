
const fs = require('fs')
class container {
    constructor(fileName){
        this.name = fileName,
        this.content = []
    }

    async save(obj){
        try{
            const jsonData = await fs.promises.readFile(this.name, 'utf-8')
            this.content = JSON.parse(jsonData)
            const newObj = {...obj, id: this.content.length+1}
            this.content.push(newObj)
            await fs.promises.writeFile(this.name, JSON.stringify(this.content))
            return newObj.id
        }
        catch(err){ console.log(err)}
    }
    
    async getAll(){ //devuelve array de prod 
        try{
            const dataJson = await fs.promises.readFile(this.name, 'utf-8')
            return JSON.parse(dataJson)
        }catch(error){
            console.log(error)
        }
    } 

    async getById(idNumber){  //devuelve objeto con id enviado
        try{
            const jsonData = await fs.promises.readFile(this.name, 'utf-8')
            for(let prod of JSON.parse(jsonData)){
                if(prod.id == idNumber){
                    return prod 
                }
            }
            return null
        }  
        catch(error){ console.log(error)}
    }
    
    async deleteAll(){
        try{
            this.content = []
            fs.promises.writeFile(this.name, JSON.stringify(this.content))
            console.log("Eliminado correctamente")
        }
        catch(error){console.log(error)}
    }
    
    async deleteById(idNumber){
        try{
            const jsonData = await fs.promises.readFile(this.name, 'utf-8')
            const data = JSON.parse(jsonData)
            this.content = data.filter((prod) => prod.id != idNumber)
            fs.promises.writeFile(this.name, JSON.stringify(this.content))
        }
        catch(error){console.log(error)}
    } 
}

const products = new container("products.txt")

// const object = {
//     title: "iphone 12 pro",
//     price: 1000
// }
// products.save(object)  
//  const object2 ={
//     title: "iphone 12",
//     price: 900
// }
// products.save(object2) 
// const object3 ={
//     title:"iphone 13",
//     price: 1200
// }
// products.save(object3)  

const getall = products.getAll()
const getbyid = products.getById(2)

setTimeout(() => {
    console.log(getall)
    console.log(getbyid)
    
}, 700);

// products.deleteById(2)
// products.deleteAll()

