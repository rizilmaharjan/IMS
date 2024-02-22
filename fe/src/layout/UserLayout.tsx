import { useState } from "react";
import SideBarModal from "../components/modal/SideBarModal";
import UserNavbar from "../components/navbar/UserNavbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/user/Footer";
import { useLocation } from "react-router-dom";
export default function UserLayout() {
  const [openSideBar, setOpenSideBar] = useState(false);
  const location = useLocation();

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
