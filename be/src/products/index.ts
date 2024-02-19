import { Router } from "express";
import { createOrder, createProduct, deleteOrders, deleteProducts, getOrders, getProducts, updateOrders, updateProduct } from "./controller";
import { upload } from "./multer";
const router = Router();

const productRoutes = ()=>{
    router.post("/api/products", upload.single("image"),createProduct);
    router.get("/api/products", getProducts)
    router.put("/api/products/:id", updateProduct)
    router.delete("/api/products/:id", deleteProducts)
    router.post("/api/orders", createOrder)
    router.get("/api/orders", getOrders)
    router.patch("/api/orders/:id", updateOrders)
    router.delete("/api/orders/:id", deleteOrders)
    return router;
}

export default productRoutes;