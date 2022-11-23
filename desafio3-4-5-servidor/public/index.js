const socket = io()

// ------------- PRODUCTS ------------

async function renderProductList(products){
    const template = await fetch('template/productsList.hbs')
    const templateText = await template.text()
    const hbsFunction = Handlebars.compile(templateText)
    
    const haveProd = products.length > 0
    const html = hbsFunction({haveProd, products})
    document.getElementById('productsTable').innerHTML = html
}

socket.on('allProducts', data => {
    renderProductList(data)
})

const productForm = document.getElementById('productForm')
productForm.addEventListener('submit', e =>{
    e.preventDefault()

    const title = document.getElementById('title')
    const price = document.getElementById('price')
    const thumbnail = document.getElementById('thumbnail')
    const product = {
        title: title.value,
        price: price.value,
        thumbnail: thumbnail.value
    }
    socket.emit('newProduct', product)
    productForm.reset()
})


// ------------- CHAT ------------

function renderMessage(message){
    if(message){
        const oneMssg = message.map(({date, email, mssg, id}) => {
            
            return `<div class="line" key=${id}>
                <div class="userEmail">${email}</div>
                <div class="userDate">${date}</div>
                <div class="userMsg">${mssg}</div>
                </div>`
        })
        const messageBox = document.getElementById('messageBox')
        messageBox.innerHTML = oneMssg.join("")
    }
    else(null)
}

socket.on('allMsj', data => {
    renderMessage(data)
})

const btnChat = document.getElementById('chatBtn')
btnChat.addEventListener('click', e =>{
    const inputEmail = document.getElementById('email')
    const inputmsg = document.getElementById('chatMsg')
    if(inputEmail.value && inputmsg.value){
        const message = {
            email: inputEmail.value,
            mssg: inputmsg.value
        }
        socket.emit('newMessage', message) 
        inputmsg.value = ""
    }
    else(
        alert('Complete los campos')
    )
})