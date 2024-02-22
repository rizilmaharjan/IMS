import { useParams } from "react-router-dom";
import { useCustomContext } from "../context/Context";
import { useEffect, useState } from "react";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import PieChart from "../components/chart/PieChart";
import { Order, User } from "../context/context.types";
const SingleUser = () => {
  const { id } = useParams();
  const { userData, orderInfo } = useCustomContext();
  const [singleUser, setSingleUser] = useState<User | null>(null);
  const [singleUserTransaction, setSingleUserTransaction] = useState<Order[]>(
    []
  );

  useEffect(() => {
    const user = userData?.find((item: User) => item._id === id);
    setSingleUser(user);
  }, [userData]);

  useEffect(() => {
    const userOrder = orderInfo?.filter((item: Order) => item.orderedId === id);
    setSingleUserTransaction(userOrder);
  }, [singleUser, orderInfo]);

  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="w-full">
          <Navbar />
          <div className="px-16">
            <div className="flex gap-24 items-center">
              <div className="bg-white box-shadow w-[450px] h-64 px-5 py-6">
                <div>
                  <p className="text-gray-400 font-semibold text-lg">
                    Information
                  </p>
                </div>

                <div className="flex  gap-10 mt-4">
                  <img
                    className="w-24 h-24 object-cover rounded-full"
                    src={singleUser?.profile}
                    alt={singleUser?.name}
                  />
                  <div>
                    <h1 className="text-3xl capitalize font-semibold">
                      {singleUser?.name}
                    </h1>
                    <p>
                      <span className="text-gray-500 font-semibold">Email</span>
                      : {singleUser?.email}
                    </p>
                    <p>
                      <span className="text-gray-500 font-semibold">Role</span>:{" "}
                      {singleUser?.role}
                    </p>
                  </div>
                </div>
              </div>

              {/* pieChart */}
              <div className=" h-64 w-[500px] bg-white box-shadow flex flex-col items-center">
                <h1 className="text-left w-full px-3 capitalize text-gray-400 font-semibold text-lg">
                  user order info
                </h1>
                <PieChart
                  width={400}
                  height={200}
                  radius={80}
                  datas={singleUserTransaction || []}
                />
              </div>
            </div>

            {/* table informations */}
            <div className="bg-white box-shadow-second w-[97%] h-screen mt-14">
              <div className="px-4 pt-3">
                <h1 className="text-xl font-semibold text-gray-400">
                  Last Transactions
                </h1>
              </div>
              <div className="bg-white h-[90%] box-shadow-third w-[97%] mx-auto mt-4 py-4 px-2">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-center">SN</th>
                      <th className="text-center">Product</th>
                      {/* <th className="text-center">Ordered By</th> */}
                      <th className="text-center">Status</th>
                      <th className="text-center">Color</th>
                      <th className="text-center">Quantity</th>
                      <th className="text-center">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {singleUserTransaction?.map((item, indx) => (
                      <tr className="border" key={item?._id}>
                        <td className="text-center">{indx + 1}</td>
                        <td className="h-20 capitalize flex items-center gap-1 justify-center">
                          <img
                            className="w-14"
                            src={item?.image}
                            alt={item?._id}
                          />
                          {item?.name}{" "}
                        </td>
                        {/* <td className="capitalize text-center">
                          {item?.orderedId}
                        </td> */}
                        <td
                          className={`capitalize text-center  font-semibold ${
                            item?.status === "approved"
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {item?.status}
                        </td>
                        <td className="capitalize text-center">
                          {item?.color}
                        </td>
                        <td className="text-center">{item?.noOfProducts}</td>
                        <td className="text-center">${item?.totalAmount}</td>
                      </tr>
                    ))}
                    <tr></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleUser;
