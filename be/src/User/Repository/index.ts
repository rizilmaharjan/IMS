import { IUser } from "./User.types";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { IUserRegistration } from "./UserLogin.types";
import { ObjectId } from "mongodb";
import { TUser, TUserInfo } from "../user.type";
const { MongoClient } = require("mongodb");
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);
// const db = client.db("web-fellowship");

const db = client.db("userRegistrationandLogin");
const userCollection = db.collection("users");
const rolesCollection = db.collection("roles");
interface IResetpassword {
  password: string;
  confirmpassword: string;
  id: string;
  token: string;
}
export const create = async (user: IUser) => {
  // console.log(user)
  const { email, role } = user;
  const capitalizeRole = role.toUpperCase();
  try {
    const findUser = await userCollection.findOne({ email: email });
    if (findUser) {
      return { status: 409, message: "user already exists", data: findUser };
    } else {
      const findRole = await rolesCollection.findOne({ name: capitalizeRole });
      const roleID = findRole._id;

      user.role = roleID;
      user.profile = "https://i.stack.imgur.com/l60Hf.png";
      user.password = await bcrypt.hash(user.password, 12);
      user.confirmpassword = await bcrypt.hash(user.confirmpassword, 12);
      const postUser = await userCollection.insertOne(user);
      return { status: 200, message: "user registered successfully" };
    }
  } catch (error) {
    return { status: 500, message: "Error Occured" };
  }
};

export const User = async (user: TUser) => {
  try {
    console.log("logged in user", user);
    const userIdObject = new ObjectId(user.userId);
    const getUsers = await userCollection
      .find({ _id: { $ne: userIdObject } })
      .toArray();
    console.log("fetched users", getUsers);
    if (!getUsers) return { status: 404, message: "User not found" };
    return {
      status: 200,
      message: "users fetched successfully",
      data: getUsers,
    };
  } catch (error) {
    return { status: 500, message: "Error occured" };
  }
};

export const fetchUserProfile = async (user: TUser) => {
  try {
    const { userId } = user;
    const userObjectId = new ObjectId(userId);
    const getUser = await userCollection
      .aggregate([
        {
          $match: { _id: userObjectId }, // Match stage
        },
        {
          $lookup: {
            from: "roles",
            localField: "role",
            foreignField: "_id",
            as: "userRoles",
          }, // Lookup stage
        },
        {
          $unwind: "$userRoles", // Unwind stage
        },
      ])
      .toArray();
    if (!getUser) return { status: 404, message: "User not found" };
    const [{ password, confirmpassword, ...userData }] = getUser;
    return {
      status: 200,
      message: "user fetched successfully",
      data: userData,
    };
  } catch (error) {
    return { status: 500, message: "Error occured" };
  }
};

// export const editUserProfile = async (
//   user: TUser,
//   updatedUserInfo: TUserInfo
// ) => {
//   try {
//     const { userId } = user;
//     const userObjectId = new ObjectId(userId);
//     const findUser = await userCollection.findOne({ _id: userObjectId });
//     if (!findUser) return { status: 404, message: "User not found" };
//     const updatedStatus = await userCollection.updateOne(
//       {
//         _id: findUser._id,
//       },
//       {
//         $set: updatedUserInfo,
//       }
//     );
//     return {
//       status: 200,
//       message: "user updated successfully",
//       data: updatedStatus,
//     };
//   } catch (error) {
//     return { status: 500, message: "Error occured" };
//   }
// };

export const editUserProfile = async (
  user: TUser,
  updatedUserInfo: TUserInfo
) => {
  try {
    const { userId } = user;
    const userObjectId = new ObjectId(userId);
    const findUser = await userCollection.findOne({ _id: userObjectId });
    if (!findUser) return { status: 404, message: "User not found" };

    const updatedUser = await userCollection.findOneAndUpdate(
      { _id: findUser._id },
      { $set: updatedUserInfo },
      { returnOriginal: false } // Return the updated document
    );

    return {
      status: 200,
      message: "User updated successfully",
      data: updatedUser.value, // Access the updated document from the result
    };
  } catch (error) {
    return { status: 500, message: "Error occurred" };
  }
};

export const login = async (user: IUserRegistration) => {
  try {
    const loggedUser = await userCollection
      .aggregate([
        {
          $match: { email: user.email },
        },
        {
          $lookup: {
            from: "roles",
            localField: "role",
            foreignField: "_id",
            as: "userRoles",
          },
        },
        {
          $unwind: "$userRoles",
        },
      ])
      .toArray();
    if (loggedUser.length > 0) {
      const passwordMatch = await bcrypt.compare(
        user.password,
        loggedUser[0].password
      );
      if (passwordMatch) {
        return {
          status: 200,
          message: "User logged in successfully",
          data: loggedUser[0],
        };
      } else {
        return { status: 401, message: "Invalid Credentials" };
      }
    } else {
      return { status: 404, message: "Invalid Credentials" };
    }
  } catch (error) {
    return { status: 500, message: "Error occurred" };
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    const user = await userCollection.findOne({ email });
    return user;
  } catch (error) {
    throw new Error("Error while retrieving user by email");
  }
};

export const resetUserPassword = async (pass: IResetpassword) => {
  try {
    const userEmail = await userCollection.findOne({
      _id: ObjectId.createFromHexString(pass.id),
    });
    if (!userEmail) return { status: 404, message: "user not found" };

    const updatePassword = await userCollection.updateOne(
      { _id: userEmail._id },
      {
        $set: {
          password: pass.password,
          confirmpassword: pass.confirmpassword,
        },
      }
    );
    if (updatePassword)
      return { status: 200, message: "password updated successfully" };
  } catch (error) {
    return { status: 500, message: "Error occured" };
  }
};

export const removeUser = async (id: string) => {
  try {
    const userId = id;
    const userExist = await userCollection.findOne({
      _id: ObjectId.createFromHexString(userId),
    });
    if (!userExist) return { status: 404, message: "User not found" };
    const removedUser = await userCollection.deleteOne({
      _id: ObjectId.createFromHexString(userId),
    });
    if (removedUser.deletedCount === 1) {
      return { status: 200, message: "User deleted successfully" };
    } else {
      return { status: 500, message: "Failed to delete user" };
    }
  } catch (error) {
    return { status: 500, message: "Error occured" };
  }
};
