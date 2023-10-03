import { Router } from "express";
import { productsmanager } from "../productsManager.js "


const router=Router()




router.get("/", async (req,res)=>{
    try {
        const products = await productsmanager.getProducts(req.query)
        if(!products){
            res.status(200).json({message: "no products"})
        }
        res.status(200).json({message:"product found",products})
    } catch (error) {
        res.status(500).json({message: error.message})
    }

}
    );

router.get("/:pid", async (req,res)=>{
    const {pid}= req.params
    try {
    const productoById=await productsmanager.getProductById(+pid)
    res.status(200).json({message:"Producto:",productoById})   
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


router.post("/",async(req,res)=>{
    const {title,description,price,code,stock,category,thumbnails} = req.body
    if (!title || !description || !price || !code || !stock || !category || !thumbnails) {
        res.status(400).json({message: "not found"})
    }
    try {
        const productNew=await productsmanager.createProduct(req.body)
        res.status(200).json({message:"product created",productNew})
    } catch (error) {
        res.status(500).json({message: error.message})
    }

})

router.put("/:pid", async (req,res)=>{

    const {pid} = req.params
    try{
    const actualizacion=await productsmanager.updateProduct(+pid,req.body)
    if (!actualizacion) {
        res.status(404).json({message:"product not found"})
    }
    res.status(200).json({message:"actualizacion hecha",actualizacion})}
    catch{
        res.status(500).json(error.message)
    }
})

router.delete("/:pid",async(req,res)=>{
    const {pid} = req.params
    try{
    const productDeleted=await productsmanager.deleteProduct(+pid)
    if (!productDeleted) {
        res.status(404).json({message:"id not found"})
    }
    res.status(200).json({message:"delete succesfull",productDeleted})}
    catch{
        res.status(500).json(error.message)
}})



export default router