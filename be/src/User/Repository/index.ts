import { IUser } from "./User.types";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs";


import { IUserRegistration } from "./UserLogin.types";
import { ObjectId } from "mongodb";
const { MongoClient } = require("mongodb");
const uri = process.env.MONGO_URI
const client = new MongoClient(uri);
// const db = client.db("web-fellowship");

const db = client.db("userRegistrationandLogin");
const userCollection = db.collection("users");
const rolesCollection = db.collection("roles");
interface IResetpassword{
  password: string;
  confirmpassword: string;
  id:string;
  token:string;
}
export const create = async (user: IUser) => {
  // console.log(user)
  const {email,role} = user;
  const capitalizeRole = role.toUpperCase();
  console.log("🚀 ~ file: index.ts:25 ~ create ~ capitalizeRole:", capitalizeRole)
  try {
    const findUser = await userCollection.findOne({ email:email });
    if (findUser) {
      return {status:409, message: "user already exists", data:findUser}
    } else {
      const findRole = await rolesCollection.findOne({name: capitalizeRole})
      const roleID = findRole._id;

      user.role = roleID;
      user.password = await bcrypt.hash(user.password,12)
      user.confirmpassword = await bcrypt.hash(user.confirmpassword,12)
      const postUser = await userCollection.insertOne(user);
      return {status:200, message:"user registered successfully"}
    }
  } catch (error) {
    return {status: 500, message:"Error Occured"}
  }
};

export const User = async()=>{
  try {
   const getUsers = await userCollection.find().toArray();
   if(!getUsers) return {status: 404, message:"User not found"}
   return {status:200, message:"users fetched successfully", data:getUsers}

    
  } catch (error) {
    return{status:500, message:"Error occured"}
    
  }
}

export const login = async (user: IUserRegistration) => {
  try {
      const loggedUser = await userCollection.findOne({ email: user.email });
      if (loggedUser) {
          if (loggedUser.password === user.password) {
              return {status:200, message:"User logged in successfully", data: loggedUser}
          } else {
              return {status: 401, message:"Invalid Cardentials"}
          }
      } else {
        return {status: 404, message:"Invalid Cardentials"}
      }
  } catch (error) {
    return {status:500, message:"Error occured"}
  }
};


export const getUserByEmail = async (email:string) => {
  try {
    const user = await userCollection.findOne({ email });
    return user;
  } catch (error) {
    throw new Error("Error while retrieving user by email");
  }
};


export const resetUserPassword = async(pass:IResetpassword)=>{
  try {
    const userEmail = await userCollection.findOne({_id:ObjectId.createFromHexString(pass.id)})
    if(!userEmail) return {status:404, message: "user not found"}

    const updatePassword = await userCollection.updateOne(
      {_id: userEmail._id},
      {$set: {password:pass.password, confirmpassword:pass.confirmpassword}}

    )  
    if(updatePassword) return {status:200, message:"password updated successfully"}  
  } catch (error) {
    return {status:500, message:"Error occured"}
    
  }
}

export const removeUser = async(id:string)=>{
  try {
    const userId = id;
    const userExist = await userCollection.findOne({_id:ObjectId.createFromHexString(userId)}) 
    if(!userExist) return {status:404, message:"User not found"}
    const removedUser = await userCollection.deleteOne({
      _id: ObjectId.createFromHexString(userId)
    })
    if(removedUser.deletedCount === 1){
      return {status: 200, message:"User deleted successfully"}
    }else{
      return {status:500, message:"Failed to delete user"}
    }
    
  } catch (error) {
    return {status: 500, message:"Error occured"}
    
  }
}