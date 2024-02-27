import {
  DashboardIcon,
  PersonOutlineOutlinedIcon,
  CategoryOutlinedIcon,
  BorderColorOutlinedIcon,
  LogoutOutlinedIcon,
  EditNotificationsOutlinedIcon,
} from "../../utils/ReactIcons";
import { AiOutlineHistory } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useCustomContext } from "../../context/Context";

const Sidebar = () => {
  const navigate = useNavigate();
  const { toggleDarkMode } = useCustomContext();

  const handleLogout = () => {
    Cookies.remove("authToken");
    navigate("/");
  };
  return (
    <>
      <div
        className={`flex ${
          toggleDarkMode ? "bg-[#191919] text-white" : ""
        } flex-col items-center py-4 w-1/5 `}
      >
        <div className="flex justify-center">
          <NavLink to="/dashboard">
            <span className="text-purple-600 font-semibold text-2xl">
              Admin
            </span>
          </NavLink>
        </div>
        <div className="w-full">
          <ul className="pl-5 text-sm">
            <p className="font-bold text-[#999] mt-4 mb-1">MAIN</p>
            <NavLink to={"/dashboard"}>
              {({ isActive }) => (
                <li
                  className={`flex ${
                    isActive && "bg-gradient-to-r from-blue-500 to-white"
                  } gap-1 items-center p-2 cursor-pointer hover:bg-gradient-to-r from-blue-500 to-white`}
                >
                  <DashboardIcon className="icon" /> <p>Dashboard</p>
                </li>
              )}
            </NavLink>
            <p className="text-xs font-bold text-[#999] mt-4 mb-1">LISTS</p>
            <NavLink to={"/users"}>
              {({ isActive }) => (
                <li
                  className={`flex ${
                    isActive && "bg-gradient-to-r from-blue-500 to-white"
                  } gap-1 items-center p-2 cursor-pointer hover:bg-gradient-to-r from-blue-500 to-white`}
                >
                  <PersonOutlineOutlinedIcon className="icon" />{" "}
                  <span className="span">Users</span>
                </li>
              )}
            </NavLink>
            <NavLink to={"/products"}>
              {({ isActive }) => (
                <li
                  className={`flex ${
                    isActive && "bg-gradient-to-r from-blue-500 to-white"
                  } gap-1 items-center p-2 mt-2 cursor-pointer hover:bg-gradient-to-r from-blue-500 to-white`}
                >
                  <CategoryOutlinedIcon className="icon" />{" "}
                  <span className="span">Products</span>
                </li>
              )}
            </NavLink>
            <NavLink to={"/orders"}>
              {({ isActive }) => (
                <li
                  className={`flex ${
                    isActive && "bg-gradient-to-r from-blue-500 to-white"
                  } gap-1 items-center p-2 mt-2 cursor-pointer hover:bg-gradient-to-r from-blue-500 to-white`}
                >
                  <BorderColorOutlinedIcon className="icon" />{" "}
                  <span className="span">Orders</span>
                </li>
              )}
            </NavLink>
            <NavLink to={"/history"}>
              {({ isActive }) => (
                <li
                  className={`flex ${
                    isActive && "bg-gradient-to-r from-blue-500 to-white"
                  } gap-1 items-center p-2 mt-2 cursor-pointer hover:bg-gradient-to-r from-blue-500 to-white`}
                >
                  <AiOutlineHistory size={24} className="icon" />{" "}
                  <span className="span">History</span>
                </li>
              )}
            </NavLink>
            {/* <p className="text-xs font-bold text-[#999] mt-4 mb-1">USEFUL</p> */}
            {/* <NavLink
              to={"/notification"}
            >
              {
                ({isActive})=>(
                  <li className={`flex ${
                    isActive && "bg-gradient-to-r from-blue-500 to-white"
                  } gap-1 items-center p-2 cursor-pointer hover:bg-gradient-to-r from-blue-500 to-white`}>
                <EditNotificationsOutlinedIcon className="icon" />
                <span className="span">Notifications</span>
              </li>

                )
              }

            </NavLink> */}

            <p className="text-xs font-bold text-[#999] mt-4 mb-1">USER</p>

            <li
              onClick={handleLogout}
              className="flex gap-1 items-center p-2 cursor-pointer hover:bg-gradient-to-r from-blue-500 to-white"
            >
              <LogoutOutlinedIcon className="icon" />
              <span className="span"> LogOut</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
