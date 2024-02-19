import {
  NotificationsNoneOutlinedIcon,
} from "../../utils/ReactIcons";
import { useCustomContext } from "../../context/Context";
import { useEffect, useState } from "react";
import AdminModal from "../modal/AdminModal";
import { useNavigate } from "react-router-dom";
import { User } from "../../context/context.types";
const Navbar = () => {
  const { userData } = useCustomContext();
  const [adminInfo, setAdminInfo] = useState<User | null>(null);
  const [isToolTipVisible, setIsToolTipVisible] = useState<boolean>(false);
  const [adminModal, setAdminModal] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedRole = localStorage.getItem("userRole");
    const loggedInAdmin = userData?.find((item:User) => item.role === storedRole);
    setAdminInfo(loggedInAdmin);
  }, [userData]);

  const handleMouseEnter = () => {
    setIsToolTipVisible(true);
  };
  const handleMouseLeave = () => {
    setIsToolTipVisible(false);
  };

  const handleAdminProfile = () => {
    setAdminModal(true);
  };

  return (
    <>
      {adminModal && (
        <AdminModal
          {...adminInfo}
          closeAdminModal={(value) => setAdminModal(value)}
        />
      )}
      <div
        className="flex gap-6 items-center justify-end py-3 pr-7 cursor-pointer"
      >
        {/* <div>
          <NotificationsNoneOutlinedIcon onClick={()=>navigate("/notification")} />
        </div> */}
        <div className="relative inline-block">
          <img
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="rounded-full w-12 h-12"
            src={adminInfo?.profile}
            alt={adminInfo?.username}
            onClick={handleAdminProfile}
          />
          {isToolTipVisible && (
            <div className="absolute top-10 right-10 py-1 w-24 text-center bg-gray-800 text-white text-xs">
              View Profile
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
