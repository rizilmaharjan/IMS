import { FaCamera } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import UserProfileInput from "../../components/input/UserProfileInput";
import { useEffect, useState } from "react";
import axios from "axios";
import { useGet } from "../../hooks/get/useGet";
import Loader from "../../components/loader/Loader";
import Cookies from "js-cookie";
import UploadWidget from "../../components/upload/UploadWidget";
import { useCustomContext } from "../../context/Context";

type TUserResponse = {
  _id: string;
  name: string;
  email: string;
  role: string;
  profile: string;
  username: string;
};

type TUserInput = {
  username: string;
  name: string;
  email: string;
  profile: string;
};

export default function UserProfile() {
  const { setLoggedInUser } = useCustomContext();
  const { response, isLoading } = useGet(
    "http://localhost:8000/user/api/profile"
  );

  const [userProfileInfo, setUserProfileInfo] = useState<TUserResponse | null>(
    null
  );
  const [isEditActive, setIsEditActive] = useState(false);

  const [userInfo, setUserInfo] = useState<TUserInput>({
    username: "",
    name: "",
    email: "",
    profile: "",
  });

  const handleInputChange = (name: string, value: string) => {
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const setProfileImage = (url: string) => {
    setUserInfo((prev) => {
      if (prev) {
        return {
          ...prev,
          profile: url,
        };
      } else {
        return null;
      }
    });
  };

  useEffect(() => {
    if (response?.data) {
      setUserProfileInfo(response.data);
      setUserInfo({
        username: response.data.username,
        name: response.data.name,
        email: response.data.email,
        profile: response.data.profile,
      });
    }
  }, [response]);

  const handleEditClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsEditActive(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
    try {
      const headers = {
        Authorization: `Bearer ${Cookies.get("authToken")}`,
      };
      const config = {
        headers: headers,
      };
      const res = await axios.patch(
        "http://localhost:8000/user/api/profile",
        userInfo,
        config
      );

      setLoggedInUser(res.data.data);
      // console.log("user update response", res);
      setIsEditActive(false);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    // console.log("userprofileinfo", response);
    setUserProfileInfo(response?.data);
  }, [response]);

  return (
    <>
      {isLoading && <Loader />}

      {/* user proifle */}

      <div className="bg-gray-100 py-8 h-full">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4">
            <FaCamera />
            <h1 className="text-xl font-semibold">Profile</h1>
          </div>
          {/* user information */}
          <div className="bg-white mt-6 w-full px-14 py-8 flex gap-10">
            {/* profile picture */}
            <div className="w-1/2 h-96 relative">
              <img
                className="object-cover w-full h-full"
                src={userInfo.profile}
                alt="person"
              />
              <div className="top-4 left-4 text-xl">
                <UploadWidget
                  isEditActive={isEditActive}
                  setProfileImage={setProfileImage}
                />
              </div>
            </div>
            {/* user details */}
            <form onSubmit={handleSubmit} className="w-1/2">
              {userProfileInfo && (
                <>
                  <UserProfileInput
                    label="Username"
                    inputType="text"
                    initialValue={userInfo.username}
                    isEditActive={isEditActive}
                    name="username"
                    onInputChange={handleInputChange}
                  />
                  <UserProfileInput
                    label="Name"
                    inputType="text"
                    initialValue={userInfo.name}
                    isEditActive={isEditActive}
                    name="name"
                    onInputChange={handleInputChange}
                  />
                  <UserProfileInput
                    label="Email"
                    inputType="email"
                    initialValue={userInfo.email}
                    isEditActive={isEditActive}
                    name="email"
                    onInputChange={handleInputChange}
                  />
                </>
              )}

              {/* button */}

              {isEditActive ? (
                <button
                  type="submit"
                  className="border border-blue-900 text-blue-900 flex items-center justify-center mt-6 gap-3 px-2 py-2 w-48 rounded-lg"
                >
                  <MdEdit />
                  <span>Submit</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleEditClick}
                  className="border border-blue-900 text-blue-900 flex items-center justify-center mt-6 gap-3 px-2 py-2 w-48 rounded-lg"
                >
                  <MdEdit />
                  <span>EDIT PROFILE</span>
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
