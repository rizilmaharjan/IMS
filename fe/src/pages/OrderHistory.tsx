import { useEffect, useState } from "react";
import { Order } from "../context/context.types";
import axios from "axios";

const OrderHistory = () => {
  const [filter, setFilter] = useState<string>("approved");
  const [filteredDatas, setFilteredData] = useState([]);

  useEffect(() => {
    const orderRes = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/product/api/orders?status=${filter}`
        );
        setFilteredData(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    orderRes();
  }, [filter]);

  return (
    <>
      <div className=" bg-white w-[97%] mx-auto h-full rounded-lg overflow-y-auto pb-10">
        <div className="flex justify-around py-3">
          <button
            onClick={() => setFilter("approved")}
            className={`font-semibold ${
              filter === "approved" ? "border-b-black border-b-2" : ""
            } text-xl `}
          >
            Approved
          </button>
          <button
            onClick={() => setFilter("rejected")}
            className={`font-semibold ${
              filter === "rejected" ? "border-b-black border-b-2" : ""
            } text-xl`}
          >
            Rejected
          </button>
        </div>
        <table className="w-[90%] mx-auto mt-4">
          <thead className="text-left bg-[#6856f4] text-white">
            <th className="py-3 pl-3">SN</th>
            <th>Product</th>
            <th>Name</th>
            <th>Quantity</th>
          </thead>
          <tbody>
            {filteredDatas && filteredDatas.length > 0 ? (
              filteredDatas?.map((item: Order, indx: number) => (
                <tr className="even:bg-blue-100 border" key={item._id}>
                  <td className="pl-3 py-6 font-bold">{indx + 1}</td>
                  <td className="w-1/3 capitalize">{item.name}</td>
                  <td className="uppercase">{item.user.name}</td>
                  <td>{item.noOfProducts}</td>
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

export default OrderHistory;
