import { NavLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { BiLogOut } from "react-icons/bi";
import { MdOutlineHome } from "react-icons/md";
import { FiShoppingCart } from "react-icons/fi";
import { MdOutlineBorderColor } from "react-icons/md";

interface ISideBarProps {
  closeSideBar: (value: React.SetStateAction<boolean>) => void;
  showSideBar: boolean;
}

const SideBarModal = ({ closeSideBar, showSideBar }: ISideBarProps) => {
  const navigate = useNavigate();
  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const handleLogout = () => {
    Cookies.remove("authToken");
    navigate("/");
    closeSideBar(false);
  };

  return (
    <>
      <div
        onClick={() => closeSideBar(false)}
        className="fixed cursor-pointer h-screen w-full top-0 z-50 modal-background"
      >
        <div
          onClick={handleClose}
          className={`bg-white absolute py-5 ${
            showSideBar ? "left-0 top-0 bottom-0 w-72 px-8" : "left-[-100%]"
          } transition-all duration-300 ease-in-out`}
        >
          <h1
            onClick={() => navigate("/dashboard")}
            className="text-2xl font-bold uppercase tracking-wider font-lato"
          >
            GADGETIFY
          </h1>
          <ul className="mt-8 relative h-full">
            <li className="">
              <NavLink
                to="/dashboard"
                onClick={() => {
                  closeSideBar(false);
                }}
                style={({ isActive }) => {
                  return {
                    backgroundColor: isActive ? "#F3F2F5" : "",
                    color: isActive ? "#6225FD" : ""
                  };
                }}
                className="w-full flex items-center uppercase gap-1 py-3 px-2 rounded-lg font-semibold text-lg hover:bg-blue-100"
              >
                <span className="w-8 text-left">
                  <MdOutlineHome className="text-2xl" />
                </span>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/products"
                onClick={() => {
                  closeSideBar(false);
                }}
                style={({ isActive }) => {
                  return {
                    backgroundColor: isActive ? "#F3F2F5" : "",
                    color: isActive ? "#6225FD" : ""

                  };
                }}
                className="w-full flex items-center uppercase gap-1 py-3 px-2 rounded-lg my-2 font-semibold text-lg hover:bg-blue-100"
              >
                <span className="w-8 text-left">
                  <FiShoppingCart className="text-2xl" />
                </span>
                Products
              </NavLink>
            </li>
            <li
            >
               <NavLink
                to="/orders"
                onClick={() => {
                  closeSideBar(false);
                }}
                style={({ isActive }) => {
                  return {
                    backgroundColor: isActive ? "#F3F2F5" : "",
                    color: isActive ? "#6225FD" : ""

                  };
                }}
                className="w-full flex items-center uppercase gap-1 py-3 px-2 rounded-lg font-semibold text-lg hover:bg-blue-100"
              >
                <span className="w-8 text-left">
                  <MdOutlineBorderColor className="text-2xl" />
                </span>
                Orders
              </NavLink>
            </li>
            <li
              onClick={handleLogout}
              className="uppercase w-full absolute bottom-16 rounded-lg py-3 px-2 font-semibold text-lg hover:bg-blue-100"
            >
              <div className="w-2/3 flex justify-between items-center">
                logout
                <BiLogOut className="text-2xl" />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default SideBarModal;
