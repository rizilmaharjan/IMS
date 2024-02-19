// import { userData } from "../../data/Data/userData";
import { useState } from "react";
import { User } from "../modal/User";
import { useCustomContext } from "../../context/Context";
import axios from "axios";
import { AiFillEye } from "react-icons/ai";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";


// interface ISingleUser{
//   _id:string;
//   username:string;
//   role:"string";
//   password:string;
//   name:string;
//   email:string;
//   confirmpassword:string;
// }

interface IUser {
  _id: "string";
  username: "string";
  name: "string";
  email: "string";
  password: "string";
  confirmpassword: "string";
  role: "string";
}
const UserTable = () => {
  const [searchUser, setSearchUser] = useState<string>("");
  const [individualUser, setIndividualUser] = useState<null | IUser>(null);
  const [userModal, setUserModal] = useState<boolean>(false);
  const { userData, setUserData } = useCustomContext();
  const navigate = useNavigate()

  const handleDelete = async (id: string) => {
    const deleteProduct = await axios.delete(
      `http://localhost:8000/user/api/users/${id}`
    );
    if (deleteProduct.status === 200) {
      const filteredProduct = userData.filter((item: IUser) => item._id !== id);
      setUserData(filteredProduct);
    }
  };

  const filteredUsers = userData?.filter(
    (user: IUser) =>
      user.name.toLowerCase().includes(searchUser.toLowerCase()) ||
      user.email.toLowerCase().includes(searchUser.toLowerCase())
  );

  // const handleViewUser = (id: string) => {
  //   const singleUser = userData?.find((user: IUser) => user._id === id);
  //   setIndividualUser(singleUser);
  //   setUserModal(true);
  // };

  return (
    <>
      {/* {userModal && (
        <User
          closeUserModal={(value: boolean) => setUserModal(value)}
          email={individualUser?.email || ""}
          name={individualUser?.name || ""}
        />
      )} */}
      <div className="bg-white mt-2 h-full rounded-lg w-[97%] mx-auto pb-8 pt-6 px-4">
        <div className="flex items-center justify-between px-8">
        <h1 className="text-2xl font-semibold">Users</h1>

        <div className="w-1/4 relative">
          <input
            type="text"
            onChange={(e) => setSearchUser(e.target.value)}
            value={searchUser}
            placeholder="Search by name or email"
            className="w-full border border-gray-400 py-2 rounded-lg px-3 outline-none"
          />
          <AiOutlineSearch className="absolute right-3 top-[14px] text-gray-400" />
        </div>
        </div>

        <table className="w-[97%] bg-white mx-auto mt-6">
          <thead>
            <tr className="bg-[#6856f4] text-white">
              <th className="text-left px-3 py-4">ID</th>
              <th className="text-left px-3">User</th>
              <th className="text-left px-3">Email</th>
              <th className="text-left px-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers?.map((user: IUser, indx: number) => (
              <tr className="border" key={user._id}>
                <td className="text-left py-6 px-3">{indx + 1}</td>

                <td className="text-left px-3">
                  <span className="capitalize">{user.name}</span>
                </td>
                <td className="text-left px-3">{user.email}</td>
                <td>
                  <button
                    // onClick={() => handleViewUser(user._id)}
                    className="py-1 w-20 text-blue-500"
                    onClick={()=>navigate(`/users/${user._id}`)}
                  >
                    <AiFillEye  size={30} />
                  </button>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="w-10 ml-3 py-1 text-red-500"
                  >
                    <div className="hover:bg-red-600 flex justify-center items-center p-2 hover:transition-all hover:duration-300 hover:ease-in-out rounded-full h-10 hover:text-white">
                      <RiDeleteBin6Fill size={30} />
                    </div>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UserTable;
