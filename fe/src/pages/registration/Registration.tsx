import registerPhoto from "../../assets/images/registration.jpg";
import { useForm } from "react-hook-form";
import Input from "../../components/inputs/Input";
import { inputDatas } from "../../data/inputDatas/inputAttributes";
import { IRegistrationUser } from "./registration.types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useAxios } from "../../hooks/post/usePost";
import { useEffect } from "react";
const Registration = () => {
  const navigate = useNavigate();
  const { datas, fetchError, fetchData, setFetchError, setData } = useAxios();
  const { handleSubmit, register, formState, reset } =
    useForm<IRegistrationUser>();
  const { errors } = formState;

  const onSubmit = (data: IRegistrationUser) => {
    fetchData("http://localhost:8000/user/api/register", data);
  };

  useEffect(() => {
    if (fetchError?.status === 409) {
      toast.error(fetchError.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setFetchError(null);
    }
    if (datas?.status === 200) {
      toast.success(datas.message);
      setData(null);
      navigate("/");
      reset();
    }
  }, [fetchError, datas]);

  return (
    <>
      <div className="flex items-center h-screen">
        <div className="flex-[1] hidden md:flex justify-end">
          <img src={registerPhoto} alt="registration" />
        </div>
        <div className="flex-[1] mt-8">
          <div className="w-9/12 mx-auto">
            <div>
              <h1 className="text-2xl font-bold">Create an account</h1>
              <p className="text-sm text-gray-400">
                Let's get started with your 30 days free trial
              </p>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col mt-1"
            >
              {inputDatas.map((input, ind) => (
                <Input {...input} key={ind} reg={register} errors={errors} />
              ))}
              <button className="bg-black text-white md:w-2/3 py-2 mt-6 rounded-2xl">
                Create Account
              </button>
            </form>
            <div className="md:w-2/3 mt-5">
              <p className="w-fit mx-auto">
                Already have an account?
                <span
                  onClick={() => navigate("/")}
                  className="text-blue-500 cursor-pointer pl-1"
                >
                  Sign in
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Registration;
