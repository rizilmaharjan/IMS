import { useCustomContext } from "../context/Context";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { Order, Product } from "../context/context.types";
import { useGet } from "../hooks/get/useGet";

const OrdersPage = () => {
  const {
    setProductData,
    productData,
    setStatus,
    orderInfo,
    setTotalOrders,
    setOrderInfo,
  } = useCustomContext();
  const [items, setItems] = useState<Order[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [userOrderInfo, setUserOrderInfo] = useState<Order[]>([]);

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/product/api/orders?page=${currentPage}&pending=true`
        );
        setUserOrderInfo(res?.data.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchUserOrders();
  }, [currentPage]);

  const handleOrder = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string
  ) => {
    try {
      const res = await axios.patch(
        `http://localhost:8000/product/api/orders/${id}`,
        {
          status: e.currentTarget.value, //if button element wraps the image instead of text then to retireve the value use e.currentTarget.value instead of e.target.value
        }
      );
      if (res.status === 200) {
        const updatedOrders = orderInfo.map((item: Order) => {
          if (item._id === res?.data.data._id) {
            return {
              ...item,
              status: res?.data.data.status,
            };
          }
          return item;
        });
        setOrderInfo(updatedOrders);
      }

      if (res.status === 200 && res?.data.data.status === "approved") {
        const updatedData = productData.map((item: Product) => {
          if (item.name === res?.data.data.name) {
            setStatus("approved");
            return { ...item, stock: item.stock - res.data.data.noOfProducts };
          }
          return item;
        });
        setProductData(updatedData);
      }
    } catch (error) {
      console.log("patch error", error);
    }
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };
  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  return (
    <>
      <div className="bg-white h-full w-[97%] mt-3 rounded-lg mx-auto">
        <table className="w-full mx-auto">
          <thead className="text-center bg-[#6856f4] text-white">
            <tr>
              <th className="py-4 pl-4">SN</th>
              <th>Product</th>
              <th>User</th>
              <th>Quantity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {userOrderInfo?.length > 0 ? (
              userOrderInfo?.map((item, indx: number) => (
                <tr
                  className="text-center cursor-pointer border"
                  key={item._id}
                >
                  <>
                    <td className="pl-4 py-8">{indx + 1}</td>
                    <td className="capitalize">{item.name}</td>
                    <td className="uppercase">{item?.user.username}</td>
                    <td>{item.noOfProducts}</td>
                    <td className="flex items-center justify-center gap-6 py-6">
                      <button
                        onClick={(e) => handleOrder(e, item._id)}
                        value={"approved"}
                        className="cursor-pointer flex items-center justify-center rounded-full hover:bg-green-500 hover:text-white w-7 h-7 text-green-600 font-extrabold"
                      >
                        <AiOutlineCheck />
                      </button>
                      <button
                        onClick={(e) => handleOrder(e, item._id)}
                        value={"rejected"}
                        className="flex items-center rounded-full justify-center cursor-pointer hover:bg-red-500 hover:text-white w-7 h-7 text-red-600 font-extrabold"
                      >
                        <RxCross1 />
                      </button>
                    </td>
                  </>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  className="py-80 text-center text-4xl text-gray-400 font-semibold"
                  colSpan={5}
                >
                  No Orders Yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="flex justify-between px-10 mt-10">
          <button
            onClick={handlePrevPage}
            className="border border-#6856f4 w-24 h-10 rounded-full bg-[#6856f4] text-white"
          >
            Prev
          </button>
          <button
            onClick={handleNextPage}
            className="border border-#6856f4 w-24 h-10 rounded-full bg-[#6856f4] text-white"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default OrdersPage;
