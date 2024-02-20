import inventory from "../../assets/images/inventory.png";
import { useNavigate } from "react-router-dom";
import UserNavbar from "../../components/navbar/UserNavbar";
import Arrivals from "../../components/user/Arrivals";
import About from "../../components/user/About";
export const UserHome = () => {
  const navigate = useNavigate();
  return (
    <>


      <div className="grid grid-cols-2 min-h-screen pt-28">
        {/* hero section */}
        <div className="mx-auto">
          <h1 className="text-5xl md:text-4xl  font-bold uppercase font-lato tracking-wider">
            Tech Your Life to the Next Level
          </h1>
          {/* <h1 className="text-5xl  md:text-6xl text-[#403c57] font-bold uppercase mt-4">management</h1> */}
          <p className="mt-4 text-lg text-gray-700">
            Elevate your tech experience with the latest gadgets from TechVibe.
            Explore a world of innovation and convenience to enhance every
            aspect of your life.
          </p>
          <div>
            <button
              onClick={() => navigate("/products")}
              className="uppercase bg-[#F7CC49] mt-8 w-36 py-3 rounded-full text-sm font-semibold"
            >
              Explore
            </button>
          </div>
        </div>
        <div className="hidden md:block">
          <img src={inventory} alt="inventory" />
        </div>
      </div>
      {/* about */}
      {/* <About /> */}
      {/* arrivals */}
      <Arrivals />


    </>
  );
};
