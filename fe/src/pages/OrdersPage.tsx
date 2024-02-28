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
  const [userOrderInfo, setUserOrderInfo] = useState<Order[]>([]);

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/product/api/orders?status=pending`
        );
        setUserOrderInfo(res?.data.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchUserOrders();
  }, []);

  // const handleOrder = async (
  //   e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  //   id: string
  // ) => {
  //   try {
  //     const res = await axios.patch(
  //       `http://localhost:8000/product/api/orders/${id}`,
  //       {
  //         status: e.currentTarget.value, //if button element wraps the image instead of text then to retireve the value use e.currentTarget.value instead of e.target.value
  //       }
  //     );

  //     console.log("patch response", res);
  //     if (res.status === 200) {
  //       const updatedOrders = userOrderInfo.map((item: Order) => {
  //         if (item._id === res?.data.data._id) {
  //           console.log("i am inside if block");
  //           return {
  //             ...item,
  //             status: res?.data.data.status,
  //           };
  //         }
  //         return item;
  //       });
  //       console.log("my updated orders", updatedOrders);
  //       setUserOrderInfo(updatedOrders);
  //     }

  //     if (res.status === 200 && res?.data.data.status === "approved") {
  //       const updatedData = productData.map((item: Product) => {
  //         if (item.name === res?.data.data.name) {
  //           setStatus("approved");
  //           return { ...item, stock: item.stock - res.data.data.noOfProducts };
  //         }
  //         return item;
  //       });
  //       setProductData(updatedData);
  //     }
  //   } catch (error) {
  //     console.log("patch error", error);
  //   }
  // };

  const handleOrder = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string
  ) => {
    try {
      const res = await axios.patch(
        `http://localhost:8000/product/api/orders/${id}`,
        {
          status: e.currentTarget.value,
        }
      );

      console.log("patch response", res);
      if (res.status === 200) {
        // Remove the order from state directly
        setUserOrderInfo((prevState) =>
          prevState.filter((item) => item._id !== id)
        );

        if (res.status === 200 && res?.data.data.status === "approved") {
          const updatedData = productData.map((item: Product) => {
            if (item.name === res?.data.data.name) {
              setStatus("approved");
              return {
                ...item,
                stock: item.stock - res.data.data.noOfProducts,
              };
            }
            return item;
          });
          setProductData(updatedData);
        }
      }
    } catch (error) {
      console.log("patch error", error);
    }
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
      </div>
    </>
  );
};

export default OrdersPage;
