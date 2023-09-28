import  express  from "express";
import productsRouter from "./routes/products.router.js"
import cartsRouter from "./routes/carts.router.js"

const app =express()

app.use(express.json())
app.use(express.urlencoded({exteded:true}))

//rutas

app.use("/api/products",productsRouter)
app.use("/api/carts",cartsRouter)

//server
app.listen(8080,()=>{
    console.log("escuchando puerto 8080")
})