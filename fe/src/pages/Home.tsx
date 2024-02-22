import { useEffect } from "react";
import Welcome from "../components/welcome/Welcome";
import { useGet } from "../hooks/get/useGet";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const naviagate = useNavigate();
  const { response, fetchError } = useGet(
    "http://localhost:8000/user/api/profile"
  );
  //   const { response, fetchDatas, fetchError } = useGet();
  //   useEffect(() => {
  //     fetchDatas("http://localhost:8000/user/api/profile");
  //   }, []);

  return (
    <>
      {response?.status === 200 && <Welcome />}

      {fetchError?.status === 403 && naviagate("/")}
    </>
  );
};

export default Home;
