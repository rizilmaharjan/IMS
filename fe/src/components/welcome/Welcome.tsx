import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import Navbar from "../navbar/Navbar";
import Widgets from "../widget/Widget";
import Featured from "../Featured/Featured";
import Chart from "../chart/Chart";
import { useCustomContext } from "../../context/Context";
import { useState, useEffect } from "react";
import { Order } from "../../context/context.types";
import { useGet } from "../../hooks/get/useGet";

const Welcome = () => {
  const navigate = useNavigate();
  const { response: userResponse } = useGet(
    "http://localhost:8000/user/api/users"
  );
  const { response: productResponse } = useGet(
    "http://localhost:8000/product/api/products?all=true"
  );

  const { response: orderResponse } = useGet(
    "http://localhost:8000/product/api/orders"
  );
  const {
    productData,
    userData,
    orderInfo,
    totalOrders,
    setTotalOrders,
    setOrderInfo,
    setUserData,
    setProductData,
  } = useCustomContext();

  useEffect(() => {
    setUserData(userResponse?.data);
  }, [userResponse]);

  useEffect(() => {
    setProductData(productResponse?.data);
    console.log("all products", productResponse?.data);
  }, [productResponse]);

  useEffect(() => {
    setOrderInfo(orderResponse?.data);
    console.log("this is order response", orderResponse);
  }, [orderResponse]);
  useEffect(() => {
    setTotalOrders(orderResponse?.totalOrders);
  }, [orderResponse]);

  // console.log("userResponse", userResponse);
  // console.log("productResponse", productResponse);
  // console.log("orderResponse", orderResponse);

  const [totalEarnings, setTotalEarnings] = useState(0);
  useEffect(() => {
    let earnedTotal = 0;

    orderInfo?.forEach((item: Order) => {
      if (item?.status === "approved") {
        earnedTotal += item?.totalAmount;
      }
    });

    setTotalEarnings(earnedTotal);
  }, [orderInfo]);
  return (
    <>
      <div className="flex h-screen">
        <Sidebar />
        <div className=" bg-gray-50 w-full">
          <div className="bg-white w-full">
            <Navbar />
          </div>

          <div className=" flex gap-10 px-8 mt-6">
            <Widgets type="user" userData={userData} />
            <Widgets
              type="order"
              orderData={orderInfo}
              totalOrders={totalOrders}
            />
            <Widgets type="products" productData={productData} />
            <Widgets type="balance" earnings={totalEarnings} />
          </div>
          <div className="flex mt-8 gap-x-5 px-10">
            <Featured />
            <Chart title={"Last 6 Months (Revenue)"} aspect={2 / 1} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Welcome;
