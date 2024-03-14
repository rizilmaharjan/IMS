import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import { Product } from "../../context/context.types";

import { useCustomContext } from "../../context/Context";
interface IPostData {
  message: string;
  status: number;
  token?: string;
  data: Product;
}
interface IProductData {
  name: string;
  amount: string;
  stock: number;
  image: string;
}

interface ILoginData {
  email?: string;
  password?: string;
  confirmpassword?: string;
}

interface IProductOrderData {
  name: string;
  image: string;
  noOfProducts: number;
}

export const useAxios = () => {
  const [datas, setData] = useState<IPostData | null>(null);
  const [fetchError, setFetchError] = useState<IPostData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = async (
    url: string,
    userData: ILoginData | IProductData | IProductOrderData
  ) => {
    setIsLoading(true);
    const headers = {
      Authorization: `Bearer ${Cookies.get("authToken")} `,
    };
    const config = {
      headers: headers,
    };
    try {
      const res = await axios.post(url, userData, config);
      setData(res.data);
      console.log("login data", res.data);
      setFetchError(null);
    } catch (error: any) {
      setFetchError(error.response?.data);
      setData(null);
    } finally {
      setIsLoading(false);
    }
  };

  return { datas, fetchError, isLoading, fetchData, setFetchError, setData };
};
