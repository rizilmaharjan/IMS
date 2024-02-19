import { ObjectId } from "mongodb";

import { IProduct, IStatus } from "./product.types";
import { IOrder } from "./product.types";
const { MongoClient } = require("mongodb");
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

const db = client.db("userRegistrationandLogin");
const productCollection = db.collection("products");
const orderCollection = db.collection("orders");
const userCollection = db.collection("users");
export const create = async (product: IProduct) => {
  const { name } = product;
  try {
    const findProduct = await productCollection.findOne({ name: name });
    if (findProduct) {
      return {
        status: 409,
        message: "Product already exists",
        data: findProduct,
      };
    } else {
      const postProduct = await productCollection.insertOne(product);
      if (postProduct.acknowledged) {
        const insertedDocument = await productCollection.findOne({
          _id: postProduct.insertedId,
        });
        return {
          status: 200,
          message: "Product registered successfully",
          data: insertedDocument,
        };
      }
    }
  } catch (error) {
    return { status: 500, message: "Error Occured" };
  }
};

export const fetchProducts = async () => {
  try {
    const findProducts = await productCollection.find().toArray();
    if (!findProducts) return { status: 404, message: "Products not found" };
    return {
      status: 200,
      message: "products successfully fetched",
      data: findProducts,
    };
  } catch (error) {
    return { status: 500, message: "Error occured" };
  }
};

export const deleteProduct = async (product: string) => {
  try {
    const productId = new ObjectId(product);
    const deleteProduct = await productCollection.findOneAndDelete({
      _id: productId,
    });
    if (deleteProduct.value) {
      return { status: 200, message: "product deleted successfully" };
    } else {
      return { status: 404, message: "Product not found" };
    }
  } catch (error) {
    return { status: 500, message: "Error occured" };
  }
};

export const createOrder = async (order: IOrder) => {
  const { orderedId } = order;
  try {
    // if(findProduct) {
      const findUserId =  await userCollection.findOne({username:orderedId});
    const postProduct = await orderCollection.insertOne({
      ...order,
      orderedId:findUserId._id
    });
    if (postProduct.acknowledged) {
      const insertedProduct = await orderCollection.findOne({
        _id: postProduct.insertedId,
      });
      return {
        status: 200,
        message: "Product registered successfully",
        data: insertedProduct,
      };
    }
    // }
  } catch (error) {
    return { status: 500, message: "Error Occured" };
  }
};

export const getOrders = async () => {
  try {
    const findOrders = await orderCollection.aggregate([
      {
        $lookup: {
          from: 'users', // The name of the users collection
          localField: 'orderedId', // The field in the orders collection
          foreignField: '_id', // The field in the users collection
          as: 'user'
        }
      },
      {
        $unwind: '$user' // Deconstruct the array field 'user'
      }
    ]).toArray();

    if (!findOrders) return { status: 404, message: "Orders not found" };

    return {
      status: 200,
      message: "Orders successfully fetched",
      data: findOrders,
    };
  } catch (error) {
    return { status: 500, message: "Error occurred" };
  }
};


export const updateOrders = async (id: string, status: IStatus) => {
  try {
    const findOrder = await orderCollection.findOne({ _id: new ObjectId(id) });

    if (findOrder) {
      const updatedStatus = await orderCollection.updateOne(
        {
          _id: findOrder._id,
        },
        {
          $set: { status: status.status },
        }
      );

      const updatedOrder = await orderCollection.findOne({
        _id: findOrder._id,
      });
      if (updatedOrder.status === "approved") {
        const removeProduct = await productCollection.findOne({
          name: updatedOrder.name,
        });

        if (removeProduct) {
          // Correctly update the stock field by subtracting noOfProducts
          await productCollection.updateOne(
            {
              _id: removeProduct._id,
            },
            {
              $set: { stock: removeProduct.stock - updatedOrder.noOfProducts },
            }
          );
        }
      }

      return {
        status: 200,
        message: "Status changed successfully",
        data: updatedOrder,
      };
    }
  } catch (error) {
    return { status: 500, message: "Error occurred" };
  }
};

export const deleteOrders = async(id: string)=>{
  const orderId = new ObjectId(id);

  try {
    const deleteOrder = await orderCollection.findOneAndDelete({_id:orderId})
    if(deleteOrder.value){
      return {status: 200, message: "order deleted successfully"}
    }else{
      return {status:404, message: "Product not found"};
    }
    
  } catch (error) {
    return {status:500, message:"Error occured"};
    
  }
}

export const updateProducts = async (id: string, productData: IProduct) => {
  try {
    const findProduct = await productCollection.findOne({
      _id: new ObjectId(id),
    });

    if (findProduct) {
      const updatedProduct = await productCollection.updateOne(
        {
          _id: findProduct._id,
        },
        {
          $set: productData,
        }
      );

      const product = await productCollection.findOne({
        _id: new ObjectId(id),
      });

      if (product) {
        return {
          status: 200,
          message: "product updated successfully",
          data: product,
        };
      }
    }
  } catch (error) {
    return { status: 500, message: "Error occurred" };
  }
};
