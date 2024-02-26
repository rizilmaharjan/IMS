import { useEffect, useState } from "react";
import { useGet } from "../../hooks/get/useGet";
import Loader from "../../components/loader/Loader";
import { Order } from "../../context/context.types";
import { FaTrashAlt } from "react-icons/fa";
import axios from "axios";

export const UserOrder = () => {
  const [orderedData, setOrderedData] = useState<null | Order[]>(null);
  const loggedInUserId = localStorage.getItem("userId");

  const { response, fetchError } = useGet(
    `http://localhost:8000/product/api/orders?userid=${loggedInUserId}`
  );
  useEffect(() => {
    console.log("this is order response", response);
    if (response) {
      setOrderedData(response.data);
    }
  }, [response, fetchError]);

  const handleOrderDelete = async (id: string) => {
    try {
      const deleteOrder = await axios.delete(
        `http://localhost:8000/product/api/orders/${id}`
      );
      console.log("deleteOrder", deleteOrder);
      if (deleteOrder.data.status === 200) {
        const remainingProducts = orderedData?.filter(
          (item) => item._id !== id
        );
        if (remainingProducts) {
          setOrderedData(remainingProducts);
        }
      }
    } catch (error) {
      console.log("error occured", error);
    }
  };

  return (
    <>
      <div className="w-[98%] md:w-11/12 md:px-8 mx-auto mt-4">
        <table className="w-full">
          <thead className="text-left">
            <tr className="bg-gray-100">
              <th className="text-xs md:text-lg">SN</th>
              <th className="py-4 text-xs md:text-lg">Name</th>
              <th className="text-xs md:text-lg">Quantity</th>
              <th className="text-xs md:text-lg">Status</th>
              <th className="text-xs md:text-lg">Action</th>
            </tr>
          </thead>
          {orderedData && orderedData.length > 0 ? (
            <tbody>
              {orderedData ? (
                orderedData.map((item, indx) => (
                  <tr key={item._id}>
                    <td className="w-fit mt-3 text-xs md:text-lg">
                      {indx + 1}
                    </td>
                    <td className="w-1/3 items-center py-3">
                      <div className="flex items-center gap-4">
                        <img
                          className="hidden md:block"
                          width={"50px"}
                          src={item.image}
                          alt={item.name}
                        />
                        <span className="capitalize text-xs md:text-lg">
                          {item.name}
                        </span>
                      </div>
                    </td>
                    <td className="text-xs md:text-lg md:w-1/4 lg:w-1/6">
                      {item.noOfProducts}
                    </td>
                    <td
                      className={`text-xs md:text-lg font-semibold capitalize ${
                        item.status === "approved"
                          ? "text-green-500"
                          : item.status === "pending"
                          ? "text-yellow-400"
                          : "text-red-500"
                      }`}
                    >
                      {item.status}
                    </td>
                    <td>
                      <div
                        onClick={() => handleOrderDelete(item._id)}
                        className="hover:bg-red-500 w-fit p-2 hover:text-white text-red-500 cursor-pointer text-xl transition-hover duration-300 ease-in-out rounded-full"
                      >
                        <FaTrashAlt />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <Loader />
              )}
            </tbody>
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
        </table>
      </div>
    </>
  );
};
