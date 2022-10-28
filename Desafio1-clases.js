class contenedor{
    constructor(){
        this.productosArray = [] 
    }

    save(object){
        this.productosArray.push(object)
    }
    getById(idNumber){
        for (let i = 0; i < this.productosArray.length ; i++){
            if (this.productosArray[i].id == idNumber){
                return this.productosArray[i]
            }
        }
        return null
    }
    getAll(){
        return this.productosArray
    }
    deleteById(number){
        const newArray = this.productosArray.filter(prod => prod.id != number)
        this.productosArray = newArray
    }
    deleteAll(){
        this.productosArray = []
    }
}


const prod1 = new contenedor()

prod1.save({
    id: 1,
    title: "Iphone 12 mini",
    price: 1100,
    thumbnail: "https://www.google.com.ar/url?sa=i&url=https%3A%2F%2Fwww.macstation.com.ar%2Fiphone-12-mini-128-gb-verde-green.html&psig=AOvVaw3nKes8YS7bIThCA-XHtBHc&ust=1665932693602000&source=images&cd=vfe&ved=0CA0QjRxqFwoTCJDEuIXB4voCFQAAAAAdAAAAABAH"
})
prod1.save({
    id: 2,
    title: "MacBook Air",
    price: 1500,
    thumbnail: "https://www.google.https://www.google.com.ar/url?sa=i&url=https%3A%2F%2Fipoint.com.ar%2Fmac%2F10133-macbook-air-13-m1-2020-8-core-cpu-256-gb-space-gray-194252056172.html&psig=AOvVaw2yf0Xcvi3-u7qz_RPAtSsy&ust=1665932795304000&source=images&cd=vfe&ved=0CA0QjRxqFwoTCIit87XB4voCFQAAAAAdAAAAABAF.ar/url?sa=i&url=https%3A%2F%2Fwww.macstation.com.ar%2Fiphone-12-mini-128-gb-verde-green.html&psig=AOvVaw3nKes8YS7bIThCA-XHtBHc&ust=1665932693602000&source=images&cd=vfe&ved=0CA0QjRxqFwoTCJDEuIXB4voCFQAAAAAdAAAAABAH"
})
prod1.save({
    id: 3,
    title: "Airpods ",
    price: 300,
    thumbnail: "https://image.png.google.https://www.google.com.ar/url?sa=i&url=https%3A%2F%2Fipoint.com.ar%2Fmac%2F10133-macbook-air-13-m1-2020-8-core-cpu-256-gb-space-gray-194252056172.html&psig=AOvVaw2yf0Xcvi3-u7qz_RPAtSsy&ust=1665932795304000&source=images&cd=vfe&ved=0CA0QjRxqFwoTCIit87XB4voCFQAAAAAdAAAAABAF.ar/url?sa=i&url=https%3A%2F%2Fwww.macstation.com.ar%2Fiphone-12-mini-128-gb-verde-green.html&psig=AOvVaw3nKes8YS7bIThCA-XHtBHc&ust=1665932693602000&source=images&cd=vfe&ved=0CA0QjRxqFwoTCJDEuIXB4voCFQAAAAAdAAAAABAH"
})
console.log("metodo getAll: ")
console.log(prod1.getAll())

console.log("\nmetodo getById con id 2: ")
console.log(prod1.getById(2))

prod1.deleteById(2)
console.log("\nmetodo eliminar el prod con id 2: ")
console.log(prod1.getAll())

prod1.deleteAll()
console.log("\nmetodo deleteAll: ")
console.log(prod1.getAll())

