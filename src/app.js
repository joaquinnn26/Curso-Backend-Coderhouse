import express from "express";
import { productmanager } from "../index.js";

const app = express();

app.use (express.json())

app.get("/api/products", async (req,res)=>{
    try {
        let limit = req.query.limit;
        // Comprobar si limit es undefined o no se ha enviado
        if (typeof limit === 'undefined') {
        const productos = await productmanager.getProducts();
        return res.json({ productos });
        }
    
        
        limit = parseInt(limit, 10);
    
        
        if (isNaN(limit) || limit <= 0) {
        return res.status(400).json({ error: "El valor de limit es inválido" });
        }
    
        // Obtener la lista completa de productos
        const productos = await productmanager.getProducts();
    
        // Limitar la lista de productos según el valor de limit
        const productosLimitados = productos.slice(0, limit);
    
        res.json({ message: "Resultado limitado", productos: productosLimitados });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener los productos" });
    }
        }
    );



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