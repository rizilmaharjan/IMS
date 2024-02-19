import { useState } from "react";
import SideBarModal from "../components/modal/SideBarModal";
import UserNavbar from "../components/navbar/UserNavbar";
import { Outlet } from "react-router-dom";
export default function UserLayout() {
  const [openSideBar, setOpenSideBar] = useState(false);

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
      <div>
        <Outlet />
      </div>
    </>
  );
}
