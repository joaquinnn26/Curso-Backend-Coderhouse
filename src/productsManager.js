import { existsSync, promises } from "fs";
import { createHash } from "crypto";
import { log } from "console";
const path = "productsFile.json";

class ProductManager {
    async getProducts(queryObj = {}) {
        const { limit } = queryObj;

        try {
            if (existsSync(path)) {
                const productsFile = await promises.readFile(path, "utf-8");
                console.log("productsFile", productsFile);
                const productsData = JSON.parse(productsFile);
                return limit ? productsData.slice(0, +limit) : productsData;
            } else {
                console.log("no existe el archivo");
                return [];
            }
        } catch (error) {
            console.log("error", error);
            return error;
        }
    }

    async createProduct(product) {
        try {
            const products = await this.getProducts({});
            let id;
            if (!products.length) {
                id = 1;
            } else {
                id = products[products.length - 1].id + 1;
            }

            const newProduct = { id, ...product , status:true};
            products.push(newProduct);
            await promises.writeFile(path, JSON.stringify(products));
            return newProduct;
        } catch (error) {
            return error;
        }
    }

    async getProductById(id) {
        try {
            const products = await this.getProducts();
            console.log("products", products);
            const Product = products.find((u) => u.id === id);
            console.log("Product", Product);
            return Product;
        } catch (error) {
            console.log("error catch");
            throw new Error(error.message);
        }
    }

    async deleteProduct(id) {
        try {
            const products = await this.getProducts({});
            const Product = products.find((u) => u.id === id);
            if (Product) {
                const newArrayproducts = products.filter((u) => u.id !== id);
                await promises.writeFile(path, JSON.stringify(newArrayproducts));
            }
            return Product;
        } catch (error) {
            return error;
        }
    }

    async updateProduct(id, obj) {
        try {
            const products = await this.getProducts({});
            const index = products.findIndex((u) => u.id === id);
            if (index === -1) {
                return null;
            }
            const updateProduct = { ...products[index], ...obj };
            products.splice(index, 1, updateProduct);
            await promises.writeFile(path, JSON.stringify(products));
            return updateProduct;
        } catch (error) {
            return error;
        }
    }
}

// PROBANDO LOS METODOS

const Product1 = {
    first_name: "Juan",
    last_name: "Hoyos",
    age: 40,
    course: "JAVASCRIPT",
    password: "12345",
};

const Product2 = {
    first_name: "Luis",
    last_name: "Abello",
    age: 35,
    course: "BACKEND",
    password: "abcde",
};

const Product3 = {
    first_name: "Carlos",
    last_name: "Abello",
    age: 35,
    course: "BACKEND",
    password: "abcde",
};

const Product4 = {
    first_name: "Laura",
    last_name: "Abello",
    age: 35,
    course: "BACKEND",
    password: "abcde",
};

const Product5 = {
    first_name: "Camila",
    last_name: "Abello",
    age: 35,
    course: "BACKEND",
    password: "abcde",
};
// async function test() {
//   const manager = new productsManager();
//   await manager.createProduct(Product1);
//   await manager.createProduct(Product2);
//   await manager.createProduct(Product3);
//   await manager.createProduct(Product4);
//   await manager.createProduct(Product5);
//   //const products = await manager.getproducts()
//   //console.log(products);
//   //await manager.deleteProduct(1)
// }

// test();

export const productsmanager = new ProductManager();
