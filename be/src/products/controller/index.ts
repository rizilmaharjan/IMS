import { Request, Response } from "express";
import {
  Create,
  DeleteProduct,
  Fetch,
  deleteUserOrder,
  fetchOrders,
  productOrder,
  updateProductData,
  updateUserOrder,
} from "../service";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const response = await Create({ ...req.body });
    res.json({
      message: response?.message,
      data: response?.data,
      status: response?.status,
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getProducts = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 8;
  try {
    const response = await Fetch(page, limit);
    res.status(response.status).json({
      message: response.message,
      data: response.data,
      status: response.status,
    });
  } catch (error) {
    res.status(400).json(error);
  }
};
export const deleteProducts = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const response = await DeleteProduct(id);
    res
      .status(response.status)
      .json({ message: response.message, status: response.status });
  } catch (error) {
    res.status(400).json(error);
  }
};

export const createOrder = async (req: Request, res: Response) => {
  try {
    const response = await productOrder({ ...req.body });
    res.json({
      message: response?.message,
      data: response?.data,
      status: response?.status,
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getOrders = async (req: Request, res: Response) => {
  // const page = parseInt(req.query.page as string);
  // const limit = parseInt(req.query.limit as string);
  // const pending = req.query.pending as string;
  const status = req.query.status as string;
  const userId = req.query.userid as string;
  console.log("my status", status);
  try {
    const response = await fetchOrders(status, userId);
    res.json({
      message: response?.message,
      data: response?.data,
      status: response?.status,
      totalOrders: response?.totalOrders,
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

export const updateOrders = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const response = await updateUserOrder(id, { ...req.body });
    res.json({
      message: response?.message,
      data: response?.data,
      status: response?.status,
    });
  } catch (error) {
    res.status(400).json(error);
  }
};
export const deleteOrders = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const response = await deleteUserOrder(id);
    res.json({ message: response?.message, status: response?.status });
  } catch (error) {
    res.status(400).json(error);
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const response = await updateProductData(id, { ...req.body });
    res.json({
      message: response?.message,
      data: response?.data,
      status: response?.status,
    });
  } catch (error) {
    res.status(400).json(error);
  }
};
