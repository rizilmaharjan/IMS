import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
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
  // const storedLoggedInfo = localStorage.getItem("LoggedInUser");

  const [shadow, setShadow] = useState(false);

  // toDO remove code if needed
  // useEffect(() => {
  //   if (loggedInUser) {
  //     localStorage.setItem("LoggedInUser", loggedInUser.name);
  //     localStorage.setItem("LoggedInUserID", loggedInUser.username);
  //   }
  // }, [loggedInUser]);

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

  const navigateToProfile = () => {
    navigate("/profile");
  };

  return (
    <>
      <nav
        className={`bg-white sticky top-0 ${
          shadow ? "shadow-md" : ""
        } transition-all duration-300 ease-in-out z-30`}
      >
        <div className="flex justify-between items-center max-w-7xl mx-auto py-4 w-full">
          <div className="flex items-center gap-10">
            <GiHamburgerMenu
              onClick={function () {
                setOpenSideBar(true);
              }}
              size={30}
              className="cursor-pointer"
            />
            <h1
              onClick={() => navigate("/dashboard")}
              className="text-3xl hidden md:block cursor-pointer uppercase font-bold tracking-widest font-lato"
            >
              Gadgetify
            </h1>
          </div>
          <div className="flex items-center gap-5">
            <h1 className="font-semibold text-lg">{loggedInUser?.username}</h1>
            {loggedInUser && (
              <img
                onClick={navigateToProfile}
                className="w-14 h-14 object-cover rounded-full cursor-pointer"
                src={loggedInUser.profile}
                alt="profilepicture"
              />
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default UserNavbar;
