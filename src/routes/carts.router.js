import { Router } from "express";
import { CartsManager } from "../cartsManager.js";

const router=Router()

router.post("/",async (req,res)=>{
    try {
        const cartNew= await CartsManager.createCart()
        res.status(200).json({message:"cart created",cartNew})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    try {
    let response = await CartsManager.deleteCart(+id);

    if (!response) {
        return res.status(404).json({ message: "Cart not found" });
    }
    res.status(200).json({ message: "Cart delete" });
    } catch (error) {
    res.status(500).json({ message: error.message });
    }
});



router.get("/:cid",async (req,res)=>{
    const {cid}= req.params
    try {
        const cartId=await CartsManager.getCartById(+cid)
        res.status(200).json({message:"cart found",cartId})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

router.post("/:cid/products/:pid",async (req,res)=>{
    const { cid } = req.params;
    const { pid } = req.params;

    try {
        const addProduct=await CartsManager.addProductToCart(+cid, +pid)
        res.status(200).json({message:"product added",addProduct})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})
export default router;