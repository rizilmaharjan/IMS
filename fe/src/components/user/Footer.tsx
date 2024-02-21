import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";
import { CiCreditCard1 } from "react-icons/ci";
export default function Footer() {
  return (
    <footer className="grid grid-cols-3 mt-32 bg-[#232323] py-6">
      <div className="text-blue-800 justify-self-center">
      <CiCreditCard1 className="text-6xl" />

      </div>
      <div className="text-white">
        &copy; {new Date().getFullYear()} Gadgetify. All rights reserved.
        <br />
        Powered By Gadgetify Platform.
      </div>
      <div className="flex items-center gap-5">
        <div className="bg-white rounded-full w-12 h-12 relative">

        <FaFacebookF className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]" />
        </div>

        <div className="bg-white rounded-full w-12 h-12 relative">
            <FaTwitter className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]" />
        </div>
        <div className="bg-white rounded-full w-12 h-12 relative">
            <FaYoutube className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]" />
        </div>
        <div className="bg-white rounded-full w-12 h-12 relative">
            <FaInstagram className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]" />
        </div>
      </div>
    </footer>
  );
}
