import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import SideBarModal from "../modal/SideBarModal";
import { useEffect } from "react";
import { useCustomContext } from "../../context/Context";
import { useNavigate } from "react-router-dom";
type props = {
  setOpenSideBar: (value: React.SetStateAction<boolean>) => void;
  openSideBar: boolean;
};
const UserNavbar = ({ setOpenSideBar, openSideBar }: props) => {
  const { loggedInUser } = useCustomContext();
  const navigate = useNavigate();
  // const [openSideBar, setOpenSideBar] = useState<boolean>(false);
  const storedLoggedInfo = localStorage.getItem("LoggedInUser");
  const storedLoggedProfile = localStorage.getItem("LoggedInProfile");
  const [loggedInfo, setLoggedInInfo] = useState<string | null>(
    storedLoggedInfo || null
  );
  const [loggedInProfile, setLoggedInProfile] = useState<string | null>(
    storedLoggedProfile || null
  );

  const [shadow, setShadow] = useState(false);
  useEffect(() => {
    if (loggedInUser) {
      localStorage.setItem("LoggedInUser", loggedInUser.name);
      localStorage.setItem("LoggedInUserID", loggedInUser.username);
      localStorage.setItem("LoggedInProfile", loggedInUser.profile);
      setLoggedInInfo(loggedInUser.name);
      setLoggedInProfile(loggedInUser.profile);
    }
  }, [loggedInUser]);

  useEffect(() => {
    const colorChange = () => {
      if (window.scrollY > 0) {
        setShadow(true);
      } else {
        setShadow(false);
      }
    };
    window.addEventListener("scroll", colorChange);
    return () => {
      window.removeEventListener("scroll", colorChange);
    };
  }, []);

  return (
    <>
      {/* {openSideBar && (
        <SideBarModal

          closeSideBar={(val) => setOpenSideBar(val)}
          showSideBar = {openSideBar}
        />
      )} */}
      <nav
        className={`bg-white sticky top-0 ${
          shadow ? "shadow-md" : ""
        } transition-all duration-300 ease-in-out z-30`}
      >
        <div className="flex justify-between px-3 items-center md:px-10 py-4 w-full md:w-11/12 mx-auto">
          <div className="flex items-center gap-10">
            <GiHamburgerMenu
              color="#5f19f4"
              onClick={
                function(){
                  setOpenSideBar(true)
                }
              }
              size={30}
              className="cursor-pointer"
            />
            <h1
              onClick={() => navigate("/dashboard")}
              className="text-3xl hidden md:block cursor-pointer uppercase font-bold text-[#5f19f4]"
            >
              Inventory
            </h1>
          </div>
          <div className="flex items-center gap-5">
            <h1 className="font-semibold text-lg">{loggedInfo}</h1>
            {loggedInProfile && (
              <img
                className="w-14 h-14 object-cover rounded-full"
                src={loggedInProfile}
                alt="profilepicture"
              />
            )}
            {/* <div className="bg-red-600 w-14 h-14 rounded-full"></div> */}
          </div>
        </div>
      </nav>
    </>
  );
};

export default UserNavbar;
