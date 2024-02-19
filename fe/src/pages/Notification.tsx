import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/navbar/Navbar";
const Notification = () => {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="w-full">
          <div>
            <Navbar />
            <div className="bg-blue-50 h-screen py-8">
                <div className="bg-white w-[94%] flex items-center justify-center box-shadow-third h-full  rounded-lg mx-auto">
                    <h1 className="text-gray-400 font-semibold capitalize text-4xl">No Notifications yet</h1>

                </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Notification;
