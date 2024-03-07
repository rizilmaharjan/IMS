import AdminModal from "../modal/AdminModal";
import { useGet } from "../../hooks/get/useGet";
import { useEffect, useState } from "react";
const Navbar = () => {
  const [isToolTipVisible, setIsToolTipVisible] = useState<boolean>(false);
  const [adminModal, setAdminModal] = useState<boolean>(false);
  const { response } = useGet("http://localhost:8000/user/api/profile");

  const [adminProfilePicture, setAdminProfilePicture] = useState("");

  const handleMouseEnter = () => {
    setIsToolTipVisible(true);
  };
  const handleMouseLeave = () => {
    setIsToolTipVisible(false);
  };

  const handleAdminProfile = () => {
    setAdminModal(true);
  };

  useEffect(() => {
    setAdminProfilePicture(response?.data.profile);
  }, [response]);

  return (
    <>
      {adminModal && (
        <AdminModal
          {...response?.data}
          closeAdminModal={(value) => setAdminModal(value)}
          setAdminProfilePicture={(value) => setAdminProfilePicture(value)}
          adminProfilePicture={adminProfilePicture}
        />
      )}
      <div className="flex gap-6 items-center justify-end py-3 pr-7 cursor-pointer">
        <div className="relative inline-block">
          <img
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="rounded-full object-cover w-12 h-12"
            src={adminProfilePicture}
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
