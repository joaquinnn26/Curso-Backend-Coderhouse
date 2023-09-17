import express from "express";
import { productmanager } from "../index.js";

const app = express();


app.get("/api/products", async (req,res)=>{
    try {
        let limit = req.query.limit; 
        limit = parseInt(limit, 10); 
    
        if (isNaN(limit) || limit <= 0) {
            return res.status(400).json({ error: 'Límite no válido' });
        }
    
        const productos = await productmanager.getProducts();
    

        const productosLimitados = productos.slice(0, limit);
    
        res.json({ message: "Resultado limitado", productos: productosLimitados });
        } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener los productos" });
        }
    });



app.get("/api/products/:id", async (req,res)=>{
    const {id}= req.params
    const productoById=await productmanager.getProductsById(+id)

    res.json({message:"asaasd",productoById})
})

app.get("/api/products", async (req,res)=>{
    const productos=await productmanager.getProducts()

    res.json({message:"asaassd",productos})
})

app.listen(8080,()=>{
    console.log("joya")
})