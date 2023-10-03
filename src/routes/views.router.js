import { Router } from "express";
import { productsmanager } from "../productsManager.js";


const router=Router();

router.get("/obtener",async(req,res)=>{
    try {
        const products = await productsmanager.getProducts(req.query)

        res.render("products",{products, style: "first"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }

})

router.get("/realTimeProducts.handlebars",async (req,res)=>{
    res.render("websockets")
})


export default router