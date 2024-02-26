import { Request, Response } from "express";
import {
  Create,
  Login,
  ResetPassword,
  getUserByEmail,
  userDelete,
} from "../service";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import { getUser } from "../service";

export const createUser = async (req: Request, res: Response) => {
  try {
    const response = await Create({ ...req.body });
    res
      .status(response.status)
      .json({
        message: response.message,
        data: response.data,
        status: response.status,
      });
  } catch (error) {
    res.status(400).json(error);
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { token, status, message, data } = await Login({ ...req.body });
    console.log(token);
    if (token) {
      res.status(200).json({ status, token, message, data });
    } else {
      res.status(401).json({ message, status });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

export const fetchUsers = async (req: Request, res: Response) => {
  try {
    const user = res.locals.user;
    const response = await getUser(user);
    res
      .status(response.status)
      .json({
        message: response.message,
        data: response.data,
        status: response.status,
      });
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getUserInfo = (req: Request, res: Response) => {
  try {
    res.status(200).json({ message: "token verified", status: 200 });
  } catch (error) {
    res.status(400).json(error);
  }
};

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});
export const forgetPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const user = await getUserByEmail(email);
    const userId = user._id.toString();
    if (!user)
      return res.status(404).json({ message: "Email not found", status: 404 });
    // const resetToken = jwt.sign(user.email,process.env.SECRET_KEY as string)
    const resetLink = `http://localhost:5173/reset-password/${userId}`;

    const mailOptions = {
      from: "maharjanrizil1@gmail.com",
      to: email,
      subject: "password reset",
      html: `
            <p>Hello, </p>
            <p>You have requested to reset your password. Click the link below to reset your password:</p>
            <a href="${resetLink}">Reset Password</a>
            `,
    };

    await transporter.sendMail(mailOptions);

    res
      .status(200)
      .json({ message: "password reset email sent successfully", status: 200 });
  } catch (error) {
    res.status(500).json({ error: "Failed to send the reset email" });
  }
};

export const resetpassword = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status, message } = await ResetPassword({ ...req.body, id });
    return res.status(status).json({ message: message, status: status });
  } catch (error) {
    return error;
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const response = await userDelete(id);
    return res
      .status(response.status)
      .json({ message: response.message, status: response.status });
  } catch (error) {
    return error;
  }
};
