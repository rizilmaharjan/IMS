import { useEffect, useState } from "react";
import loginPhoto from "../assets/images/login.jpg";
import { useNavigate } from "react-router-dom";
import { useAxios } from "../hooks/post/usePost";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import Modal from "../components/modal/Modal";
import { useCustomContext } from "../context/Context";

const Login = () => {
  // useAxios custom hook
  const { datas, fetchError, fetchData } = useAxios();

  const { setLoggedInUser } = useCustomContext();

  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // modal
  const [openModal, setOpenModal] = useState<boolean>(false);

  //handlechange function
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  // login button
  const handleClick = () => {
    fetchData("http://localhost:8000/user/api/login", loginData);
  };

  useEffect(() => {
    // console.log(fetchError)
    if (datas?.status === 200 && datas.token) {
      Cookies.set("authToken", datas.token, {
        expires: 2,
        sameSite: "strict",
      });
      setLoginData((prev) => ({
        ...prev,
        Email: "",
        Password: "",
      }));

      localStorage.setItem("userRole", datas.data.userRoles.name);
      localStorage.setItem("userId", datas.data._id);
      // localStorage.setItem("userId", loggedInUser._id);

      navigate("/dashboard");
    }

    if (fetchError?.status === 401 || fetchError?.status === 404) {
      toast.error(fetchError?.message);
      // setFetchError(null)
    }
  }, [fetchError, datas]);

  const handleForgetPsw = () => {
    setOpenModal(true);
  };

  return (
    <>
      {openModal && <Modal openmodal={(val) => setOpenModal(val)} />}
      <div className="flex justify-center items-center h-screen">
        <div className="flex justify-around  shadow-2xl py-8 md:p-4 w-[80%] md:w-[54%] rounded-xl md:h-2/3">
          <div className="w-1/2 hidden md:block">
            <img
              className="h-full w-full object-cover"
              src={loginPhoto}
              alt="login"
            />
          </div>
          <div className="w-full md:w-4/12 md:mt-20">
            <div className="w-11/12 ml-5">
              <div>
                <h1 className="capitalize md:text-center font-bold text-3xl">
                  Sign in
                </h1>
              </div>
              <div className="mt-6">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={loginData.email}
                  onChange={handleChange}
                  className="bg-gray-200 w-10/12 md:w-11/12 font-semibold text-md outline-none px-2 py-1 rounded-lg"
                />
              </div>
              <div className="my-4">
                <input
                  type="password"
                  name="password"
                  placeholder="*****"
                  value={loginData.password}
                  onChange={handleChange}
                  className="bg-gray-200 w-10/12 md:w-11/12 font-semibold text-md px-2 py-1 outline-none rounded-lg"
                />
              </div>
              <button
                onClick={handleClick}
                type="submit"
                className="bg-green-500 w-10/12 md:w-11/12 text-white py-2 rounded-2xl font-bold"
              >
                Login
              </button>
              <p className="mt-4">
                Don't have an account?
                <span
                  onClick={() => navigate("/register")}
                  className="text-blue-500 cursor-pointer"
                >
                  Sign up
                </span>
              </p>
              <p
                onClick={handleForgetPsw}
                className="text-blue-500 hover:underline cursor-pointer"
              >
                Forget password?
              </p>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Login;
