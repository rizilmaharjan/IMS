import { TiTick } from "react-icons/ti";
import UploadWidget from "../upload/UploadWidget";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import Cookies from "js-cookie";

type props = {
  name?: string;
  email?: string;
  userRoles?: {
    name: string;
    _id: string;
  };
  profile?: string;
  closeAdminModal: (value: React.SetStateAction<boolean>) => void;
  setAdminProfilePicture: React.Dispatch<React.SetStateAction<string>>;
  adminProfilePicture: string;
};
const AdminModal = ({
  name,
  email,
  userRoles,
  profile,
  closeAdminModal,
  setAdminProfilePicture,
  adminProfilePicture,
}: props) => {
  const handleModalClose = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
  };

  const setProfileImage = (url: string) => {
    setAdminProfilePicture(url);
  };

  const handleProfilePicture = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${Cookies.get("authToken")}`,
      };
      const config = {
        headers: headers,
      };

      const res = await axios.patch(
        "http://localhost:8000/user/api/profile",
        { profile: adminProfilePicture },
        config
      );
      if (res.status === 200) {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <>
      <div
        onClick={() => closeAdminModal(false)}
        className="fixed top-0 z-20 cursor-pointer left-0 h-screen w-full flex items-center justify-center modal-background"
      >
        <div
          onClick={handleModalClose}
          className="w-[400px] h-[450px] flex flex-col items-center px-6 py-8 bg-white rounded-lg"
        >
          <div className="relative">
            <img
              className="rounded-full w-48 h-48 shadow-sm object-cover"
              src={adminProfilePicture ? adminProfilePicture : profile}
              alt={name}
            />
            <div className="absolute top-4 left-4 text-xl">
              <UploadWidget setProfileImage={setProfileImage} />
            </div>
            <div
              onClick={handleProfilePicture}
              className="absolute left-[50%] bottom-[-13px] translate-x-[-50%] h-6 w-6 rounded-full text-center bg-orange-700 text-white "
            >
              <span className="flex items-center justify-center top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] absolute">
                <TiTick />
              </span>
            </div>
          </div>
          <h1 className="text-xl font-semibold uppercase mt-12">{name}</h1>
          <p className="text-sm text-gray-400 font-semibold lowercase mt-1">
            {userRoles?.name}
          </p>
          <p className="text-gray-600 font-semibold mt-1">{email}</p>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default AdminModal;
