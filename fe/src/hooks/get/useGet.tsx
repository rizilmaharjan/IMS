import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios, { AxiosError, AxiosResponse } from "axios";

import { AxiosResponse as BaseAxiosResponse } from "axios";

export interface CustomAxiosResponse<T = any> extends BaseAxiosResponse<T> {
  totalOrders?: number;
}

export const useGet = (url: string) => {
  const [response, setResponse] = useState<CustomAxiosResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fetchError, setFetchError] = useState<AxiosError | null>(null);
  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const headers = {
        Authorization: `Bearer ${Cookies.get("authToken")}`,
      };
      const config = {
        headers: headers,
      };

      try {
        const res: AxiosResponse = await axios.get(url, config);
        setResponse(res.data);
        setFetchError(null);
      } catch (error: any) {
        setFetchError(error.response.data);
        setResponse(null);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [url]);
  return { response, isLoading, fetchError, setResponse };
};
