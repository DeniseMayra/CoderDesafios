class usuario{
    constructor(name, surname){
        this.nombre = name  
        this.apellido = surname  
        this.libros = [] 
        this.mascotas = [] 
    }

    getFullName(){
        return `${this.nombre} ${this.apellido}`
    }
    addMascota(name){
        this.mascotas.push(name)
    }
    countMascotas(){
        return this.mascotas.length
    }
    addBook(name, author){
        const newBook = {
            nombre: name,
            autor: author
        }
        this.libros.push(newBook)
    }
    getBookNames(){
        let bookNames = []
        for (let i=0; i < this.libros.length; i++){
            bookNames.push(this.libros[i].nombre)
        }
        return bookNames
    }
}

const userOne = new usuario('Denise', 'Higa')

userOne.addMascota('kitty')
userOne.addMascota('kesha')
userOne.addBook('el hombre en busca del sentido', 'viktor frankl')
userOne.addBook('palabras cruzadas', 'gabriel rolon')

console.log(userOne.getFullName())
console.log(userOne.countMascotas())
console.log(userOne.getBookNames())



