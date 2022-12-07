import {randomUUID} from "crypto"

export class mysqlContainer{
    constructor(mysqlClient, table){
        this.client = mysqlClient;
        this.table = table;
    }

    // tableContentFn= tabla => {
    //     tabla.increments('id'),
    //         tabla.string('nombre'),
    //         tabla.integer('edad')
    // }

    createTable(tableContentFn){
        this.client.schema.hasTable(this.table)
        .then(exists => {
            if (!exists) {
                this.client.schema.createTable(this.table, tableContentFn)
                    .then(() => {
                        console.log('tabla creada!')
                    })
            } else {
                console.log(`la tabla ${this.table} ya existe. no se realizaron cambios`)
            }
        })
    }

    async save(obj){
        try{
            const newObj = {...obj, id: randomUUID()}
            await this.client(this.table).insert(newObj)
            return newObj.id
        }
        catch(err){ console.log(err)}
    }

    async getAll(){
        try{
            const products = await this.client(this.table).select()
            return products
        }
        catch(err){ console.log(err)}
    }

    async getById(idNumber){
        try{
            const product = await this.client(this.table).select().where('id', idNumber)
            return product
        }
        catch(err){ console.log(err)}
    }

    async deleteAll(){
        try{
            this.client(this.table).del()
            console.log('eliminado correctamente')
        }
        catch(err){ console.log(err)}
    }

    async deleteById(idNumber){
        try{
            this.client(this.table).where({id: idNumber}).del()
            console.log('producto eliminado')
        }
        catch(err){ console.log(err)}
    }

    async updateById(obj){
        try{
            this.client(this.table).where({id: obj.id}).update(obj)
            console.log('producto actualizado')
        }
        catch(error){console.log(error)}
    }

}