import { existsSync, promises } from "fs";
import { error, log } from "console";
import { productsmanager } from "./productsManager.js";
const path = "cartsFile.json";

class cartsManager {
    async getCarts() {


        try {
            if (existsSync(path)) {
                const cartsFile = await promises.readFile(path, "utf-8");
                const cartsData = JSON.parse(cartsFile);
                return cartsData;
            } else {
                console.log("no existe el archivo");
                return [];
            }
        } catch (error) {

            return error;
        }
    }

    async createCart() {
        try {
            const carts = await this.getCarts({});
            let id;
            if (!carts.length) {
                id = 1;
            } else {
                id = carts[carts.length - 1].id + 1;
            }

            const newCart =  [...carts, { id: id, products: [] }];

            await promises.writeFile(path, JSON.stringify(carts));
            return newCart;
        } catch (error) {
            return error;
        }
    }

    async getCartById(id) {
        try {
            const carts = await this.getCarts();

            const Product = carts.find((u) => u.id === id);

            return Product;
        } catch (error) {
            console.log("error catch");
            throw new Error(error.message);
        }
    }

    async deleteCart(id) {
        try {
            const carts = await this.getCarts({});
            const Product = carts.find((u) => u.id === id);
            if (Product) {
                const newArraycarts = carts.filter((u) => u.id != id);
                await promises.writeFile(path, JSON.stringify(newArraycarts));
            return newArraycarts
            }
            return Product;
        } catch (error) {
            return error;
        }
    }

    async addProductToCart(idCart,idProduct){
        //validar
        const cartById = await this.getCartById(idCart)
        if(!cartById){
            return "cart not found";
        }
        //validar
        const product = await productsmanager.getProductById(idProduct)
        if(!product){
            return "product not found";
        }
        const cartFilter = await this.deleteCart(idCart);
        const productIndex= cartById.products.findIndex(p=>p.id === idProduct)
        
        if (productIndex !== -1) {
            cartById.products[productIndex].quantity++;
        } else {
            cartById.products.push({ productId: idProduct, quantity: 1 });
        }


    const newCarts = [{ ...cartById }, ...cartFilter];
    await promises.writeFile(path, JSON.stringify(newCarts));
    }


}



export const CartsManager = new cartsManager();
