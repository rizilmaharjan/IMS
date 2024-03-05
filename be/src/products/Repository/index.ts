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

export const fetchProducts = async (page?: number, limit?: number) => {
  // console.log("page", page);
  try {
    let findProducts;
    if (page && limit) {
      findProducts = await productCollection
        .find()
        .skip((page - 1) * limit)
        .limit(limit)
        .toArray();
    } else {
      findProducts = await productCollection.find().toArray();
    }
    if (!findProducts) return { status: 404, message: "Products not found" };
    // console.log("all products", findProducts);
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
  // console.log("ordered body", order);
  const { orderedId, _id, totalAmount, noOfProducts, status } = order;
  // console.log("ordered product id", _id);
  console.log("my orders", order);
  // console.log("orderedId", orderedId);
  const userOrderedId = new ObjectId(orderedId);
  const orderedProductId = new ObjectId(_id);
  try {
    // if(findProduct) {
    // const findUserId = await userCollection.findOne({ _id: userOrderedId });
    const postProduct = await orderCollection.insertOne({
      productOrdered: orderedProductId,
      orderedId: userOrderedId,
      totalAmount,
      noOfProducts,
      status,
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

export const getOrders = async (status?: string, userId?: string) => {
  // console.log("my userId", userId);

  try {
    let query: any = {}; // Initialize an empty query object

    // if (!status || (status !== "approved" && status !== "rejected")) {
    //   status = "pending";
    // }

    if (status) {
      query.status = status;
    }

    if (userId) {
      query.orderedId = new ObjectId(userId);
    }

    // *fetch the total count of orders
    const totalOrders = await orderCollection.countDocuments({
      status: "pending",
    });
    const findOrders = await orderCollection
      .aggregate([
        {
          $match: query,
        },

        {
          $lookup: {
            from: "users",
            localField: "orderedId",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $unwind: "$user",
        },

        {
          $lookup: {
            from: "products",
            localField: "productOrdered",
            foreignField: "_id",
            as: "product",
          },
        },
        {
          $unwind: "$product",
        },
        {
          $project: {
            productOrdered: 0, // Exclude productOrdered field
            orderedId: 0, // Exclude orderedId field
          },
        },
      ])
      // .skip((page - 1) * limit)
      // .limit(limit)
      .toArray();

    // console.log("my orders", findOrders);

    if (!findOrders) return { status: 404, message: "Orders not found" };

    return {
      status: 200,
      message: "Orders successfully fetched",
      data: findOrders,
      totalOrders: totalOrders,
    };
  } catch (error) {
    return { status: 500, message: "Error occurred" };
  }
};

export const updateOrders = async (id: string, status: IStatus) => {
  // console.log("productid", id);
  try {
    const findOrder = await orderCollection.findOne({ _id: new ObjectId(id) });
    if (!findOrder) return { status: 404, message: "Order not found" };

    console.log("order details", findOrder);
    await orderCollection.updateOne(
      {
        _id: findOrder._id,
      },
      {
        $set: { status: status.status },
      }
    );

    if (status.status === "approved") {
      const findProduct = await productCollection.findOne({
        _id: findOrder.productOrdered,
      });
      if (!findProduct) {
        return { status: 404, message: "Product not found" };
      }

      await productCollection.updateOne(
        {
          _id: findOrder.productOrdered,
        },
        {
          $inc: { stock: -findOrder.noOfProducts },
        }
      );
    }

    const updatedOrder = await orderCollection.findOne({ _id: findOrder._id });
    return {
      status: 200,
      message: "Order updated successfully",
      data: updatedOrder,
    };

    // if (findOrder) {
    //   const updatedStatus =

    //   const findProduct = await productCollection.findOne({
    //     _id: findOrder.productOrdered,
    //   });

    //   const updateStock = await productCollection.updateOne(
    //     {_id:findOrder.productOrdered},
    //    { $set: {stock: findProduct.stock - findOrder.noOfProducts}}
    //   )
    //   console.log("ordered products detail", findProduct);

    //   const updatedOrder = await orderCollection.findOne({
    //     _id: findOrder._id,
    //   });
    //   if (updatedOrder.status === "approved") {
    //     const removeProduct = await productCollection.findOne({
    //       name: updatedOrder.name,
    //     });

    //     if (removeProduct) {
    //       // Correctly update the stock field by subtracting noOfProducts
    //       await productCollection.updateOne(
    //         {
    //           _id: removeProduct._id,
    //         },
    //         {
    //           $set: { stock: removeProduct.stock - updatedOrder.noOfProducts },
    //         }
    //       );
    //     }
    //   }

    //   return {
    //     status: 200,
    //     message: "Status changed successfully",
    //     data: updatedOrder,
    //   };
    // }
  } catch (error) {
    return { status: 500, message: "Error occurred" };
  }
};

export const deleteOrders = async (id: string) => {
  const orderId = new ObjectId(id);

  try {
    const deleteOrder = await orderCollection.findOneAndDelete({
      _id: orderId,
    });
    if (deleteOrder.value) {
      return { status: 200, message: "order deleted successfully" };
    } else {
      return { status: 404, message: "Product not found" };
    }
  } catch (error) {
    return { status: 500, message: "Error occured" };
  }
};

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
