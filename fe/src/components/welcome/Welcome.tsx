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

const Welcome = () => {
  const navigate = useNavigate();
  const { productData, userData, orderInfo, totalOrders } = useCustomContext();
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
