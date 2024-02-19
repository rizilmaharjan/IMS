import { create, createOrder, deleteOrders, deleteProduct, fetchProducts, getOrders, updateOrders, updateProducts } from "../Repository"

import { IProduct, IOrder, IStatus } from "../Repository/product.types"

  

export const Create = async(product:IProduct)=>{
    try {
        const response = await create(product)
        return response

    } catch (error) {
        throw new Error("Failed to create product")
        
    }
}


export const Fetch = async()=>{
    try {
        const response = await fetchProducts()
        return response

    } catch (error) {
        throw new Error("Failed to get products")
        
    }
}
export const DeleteProduct = async(product:string)=>{
    try {
        const response = await deleteProduct(product)
        return response

    } catch (error) {
        throw new Error("Failed to delete user")
        
    }
}

export const productOrder = async(order:IOrder)=>{
    try {
        const response = await createOrder(order)
        return response
        
    } catch (error) {
        throw new Error("Failed to create order")
        
    }
    


}

export const fetchOrders = async()=>{
    try {
        const response = await getOrders()
        return response
    } catch (error) {
        throw new Error("Failed to get orders")
        
    }
}

export const updateUserOrder = async(id:string, status:IStatus)=>{
    try {
        const response = await updateOrders(id, status);
        return response
    } catch (error) {
        throw new Error("Failed to update order")
        
    }
}
export const deleteUserOrder = async(id:string)=>{
    try {
        const response = await deleteOrders(id);
        return response
    } catch (error) {
        throw new Error("Failed to update order")
        
    }
}

export const updateProductData = async(id:string, productData:IProduct)=>{
    try {
        const response = await updateProducts(id,productData)
        return response
        
    } catch (error) {
        throw new Error("Failed to update the product")
        
    }
}




