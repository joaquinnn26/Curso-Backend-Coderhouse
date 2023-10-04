

console.log("probadno")

const socketClient=io()

const primerListaProductos= (productos) =>{
    let primerLista = document.getElementById("primerLista")

    let html = "";
    let i=0
    productos.forEach(product => { 

        html+= `
            <h1>ID producto: ${product.id} </h1>
            <p>titulo: ${product.title}</p>
            <p>descripcion: ${product.description}</p>
            <p>precio: ${product.price}</p>
            <p>codigo: ${product.code}</p>
            <p>categoria: ${product.category}</p>
            <p>stock: ${product.stock}</p>
            <br></br>
        `
        primerLista.innerHTML= html;
        
    });

}


socketClient.on(`allProducts`,(productos)=>{
    let primerLista = document.getElementById("primerLista")

    let html = "";
    let i=0
    productos.forEach(product => { 

        html+= `
            <h1>ID producto: ${product.id} </h1>
            <p>titulo: ${product.title}</p>
            <p>descripcion: ${product.description}</p>
            <p>precio: ${product.price}</p>
            <p>codigo: ${product.code}</p>
            <p>categoria: ${product.category}</p>
            <p>stock: ${product.stock}</p>
            <br></br>
        `
        primerLista.innerHTML= html;
})})

const form = document.getElementById("form");
const inputTitle = document.getElementById("title");
const inputDescription= document.getElementById("description");   
const inputPrice= document.getElementById("price");
const inputCode= document.getElementById("code");
const inputStock= document.getElementById("stock");
const inputCategory= document.getElementById("category");
const inputStatus= document.getElementById("status"); 

form.onsubmit= (e)=>{
    e.preventDefault();

    const title = inputTitle.value
    const description=inputDescription.value;
    const price=inputPrice.value;
    const code=inputCode.value;
    const stock=inputStock.value;
    const category=inputCategory.value;
    const status=inputStatus.value;

    form.reset()

    console.log("andando primer form")
    socketClient.emit(`addProduct`, {title,status,description,price,code,stock,category})
}


socketClient.on(`productUpdate`,(products)=>{
    primerListaProductos(products);
})
//formulario para borrar
const formDelete = document.getElementById("form-delete");
const inputId = document.getElementById("id-delete");


formDelete.onsubmit= (e)=>{
    e.preventDefault();
    const idDelete= inputId.value;

    formDelete.reset()
    console.log("andando formulario borrar");
    socketClient.emit(`productDeleted`,idDelete)
}

socketClient.on(`productosNew`,(productsNews)=>{
    primerListaProductos(productsNews)
})