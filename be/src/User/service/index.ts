import { IUserRegistration } from "./../Repository/UserLogin.types";
import { IUser } from "./../Repository/User.types";
import jwt from "jsonwebtoken";
import {
  User,
  editUserProfile,
  fetchUserProfile,
  removeUser,
} from "../Repository";

import {
  create,
  login,
  getUserByEmail as getUserByEmailService,
  resetUserPassword,
} from "../Repository";
import { TUser, TUserInfo } from "../user.type";
interface IResetpassword {
  password: string;
  confirmpassword: string;
  id: string;
  token: string;
}

export const Create = async (user: IUser) => {
  try {
    const response = await create(user);
    return response;
  } catch (error) {
    throw new Error("Failed to create user");
  }
};

export const Login = async (user: IUserRegistration) => {
  try {
    const { status, message, data } = await login(user);
    if (status === 200) {
      const token = jwt.sign(
        {
          userId: data._id,
          username: data.Username,
        },
        process.env.SECRET_KEY as string
      );

      return { status, token, message, data };
    }
    return { status, message };
  } catch (error) {
    return { status: 500, message: "Error occured" };
  }
};

export const getUser = async (user: TUser) => {
  try {
    const response = await User(user);
    return response;
  } catch (error) {
    throw new Error("Failed to get users");
  }
};
export const getUserProfile = async (user: TUser) => {
  try {
    const response = await fetchUserProfile(user);
    return response;
  } catch (error) {
    throw new Error("Failed to get users");
  }
};
export const updateUserProfile = async (
  user: TUser,
  updatedUserInfo: TUserInfo
) => {
  try {
    const response = await editUserProfile(user, updatedUserInfo);
    return response;
  } catch (error) {
    throw new Error("Failed to get users");
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    const user = await getUserByEmailService(email);
    return user;
  } catch (error) {
    throw new Error("Error while retrieving user by email");
  }
};

export const ResetPassword = async (pass: IResetpassword) => {
  try {
    const result = await resetUserPassword(pass);
    return {
      status: result?.status as number,
      message: result?.message as string,
    };
  } catch (error) {
    return { status: 500, message: "Error occured" };
  }
};

export const userDelete = async (id: string) => {
  try {
    const response = await removeUser(id);
    return response;
  } catch (error) {
    return { status: 500, message: "Error occured" };
  }
};
