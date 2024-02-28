import { useCustomContext } from "../../context/Context";
import { useEffect, useState } from "react";
import AdminModal from "../modal/AdminModal";
import { useNavigate } from "react-router-dom";
import { User } from "../../context/context.types";
import { useGet } from "../../hooks/get/useGet";
const Navbar = () => {
  const [isToolTipVisible, setIsToolTipVisible] = useState<boolean>(false);
  const [adminModal, setAdminModal] = useState<boolean>(false);
  const { response, isLoading } = useGet(
    "http://localhost:8000/user/api/profile"
  );

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
          {...response?.data}
          closeAdminModal={(value) => setAdminModal(value)}
        />
      )}
      <div className="flex gap-6 items-center justify-end py-3 pr-7 cursor-pointer">
        <div className="relative inline-block">
          <img
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="rounded-full object-cover w-12 h-12"
            src={response?.data.profile}
            alt={response?.data.username}
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
