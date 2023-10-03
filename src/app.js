import express from "express";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";
import { __dirname } from "./utils.js";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import { productsmanager } from "./productsManager.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

//handlebars

app.engine("handlebars", engine());
app.set("views", __dirname + "/views"); //aca va la ruta de donde tengamos las vistas de la plantilla
app.set("view engine", "handlebars"); //aca va el motor de plantilla que usamos

//rutas

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/views", viewsRouter);

//server
//app.listen(8080,()=>{
//  console.log("escuchando puerto 8080")
//});
const httpServer = app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});


const socketServer = new Server(httpServer);

const allProducts= await productsmanager.getProducts({});

  socketServer.on(`connection`, (socket) => {
    
  console.log(`cleinte conectado: ${socket.id}`);
  
  socket.emit(`allProducts`,allProducts)

  socket.on(`addProduct`, async (producto) => {
    
    const product = await productsmanager.createProduct(producto);
    const productosActualizados = await productsmanager.getProducts({});
    socket.emit(`productUpdate`, productosActualizados);


  });
  socket.on(`productDeleted`,async (idDelete)=>{
    const deletedById= await productsmanager.deleteProduct(idDelete);
    const productosTotal= await productsmanager.getProducts({});
    console.log("adnadnosadas",deletedById);
    socket.emit(`productosNew`,productosTotal);
  })
});
