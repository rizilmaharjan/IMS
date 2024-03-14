import { useEffect, useState } from "react";
import SideBarModal from "../components/modal/SideBarModal";
import UserNavbar from "../components/navbar/UserNavbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/user/Footer";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { useCustomContext } from "../context/Context";
export default function UserLayout() {
  const [openSideBar, setOpenSideBar] = useState(false);
  const { setLoggedInUser, setUserProfilePicture } = useCustomContext();
  const location = useLocation();

  useEffect(() => {
    const fetchLoggedInUserData = async () => {
      try {
        const headers = {
          Authorization: `Bearer ${Cookies.get("authToken")}`,
        };
        const config = {
          headers: headers,
        };
        const res = await axios.get(
          "http://localhost:8000/user/api/profile",
          config
        );

        setLoggedInUser(res.data.data);
        setUserProfilePicture(res.data?.data.profile);
      } catch (error) {}
    };
    fetchLoggedInUserData();
    console.log("this is userlayout component");
  }, []);

  return (
    <>
      <UserNavbar
        setOpenSideBar={(val) => setOpenSideBar(val)}
        openSideBar={openSideBar}
      />
      {openSideBar && (
        <SideBarModal
          showSideBar={openSideBar}
          closeSideBar={(val) => setOpenSideBar(val)}
        />
      )}
      <div className="max-w-7xl mx-auto">
        <div>
          <Outlet />
        </div>
      </div>
      {location.pathname === "/dashboard" && <Footer />}
    </>
  );
}
