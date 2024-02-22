import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { useGet } from "../hooks/get/useGet";
import { Product, User, Order } from "./context.types";

const productContext = createContext<any>(null);
interface ProductsContextProps {
  children: ReactNode;
}

const ProductsContext = ({ children }: ProductsContextProps) => {
  // const { response: productResponse, fetchError: productFetchError } = useGet(
  //   "http://localhost:8000/product/api/products"
  // );
  // const { response: userResponse, fetchError: userFetchError } = useGet(
  //   "http://localhost:8000/user/api/users"
  // );
  // const { response: userOrder, fetchError: userOrderError } = useGet(
  //   "http://localhost:8000/product/api/orders"
  // );

  const [productData, setProductData] = useState<Product[]>();
  const [userData, setUserData] = useState<User[]>();
  const [userRole, setUserRole] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [orderInfo, setOrderInfo] = useState<Order[] | null>(null);
  const [status, setStatus] = useState("pending");
  const [totalOrders, setTotalOrders] = useState<number>();

  // useEffect(() => {
  //   setProductData(productResponse?.data);
  // }, [productResponse]);
  // useEffect(() => {
  //   setUserData(userResponse?.data);
  // }, [userResponse]);
  // useEffect(() => {
  //   setOrderInfo(userOrder?.data);
  // }, [userOrder]);
  // useEffect(() => {
  //   setTotalOrders(userOrder?.totalOrders);
  // }, [userOrder]);

  return (
    <productContext.Provider
      value={{
        productData,
        setOrderInfo,
        loggedInUser,
        setLoggedInUser,
        setUserRole,
        userRole,
        setProductData,
        userData,
        setUserData,
        status,
        setStatus,
        // productFetchError,
        orderInfo,
        // userFetchError,
        totalOrders,
        setTotalOrders,
      }}
    >
      {children}
    </productContext.Provider>
  );
};

export default ProductsContext;

export const useCustomContext = () => {
  const customContext = useContext(productContext);
  if (customContext === null) {
    throw new Error("Error");
  }
  return customContext;
};
