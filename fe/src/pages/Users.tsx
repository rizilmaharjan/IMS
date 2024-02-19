import Sidebar from "../components/sidebar/Sidebar";
import UserTable from "../components/table/UserTable";
import Navbar from "../components/navbar/Navbar";

const Users = () => {
  return (
    <>
      <div className="flex h-screen">
        <Sidebar />
        <div className="w-full ">
          <Navbar />
          <div className="py-4 bg-[#dfe0fe] ">

          <UserTable />
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;
