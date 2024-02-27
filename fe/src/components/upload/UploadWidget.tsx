import { useEffect, useRef } from "react";
import { FaCamera } from "react-icons/fa";
type TProps = {
  setProfileImage: (url: string) => void;
};
declare global {
  interface Window {
    cloudinary: any;
  }
}

// type props={
//     profileImage: (value: React.SetStateAction<string>) => void
// }

const UploadWidget = ({ setProfileImage }: TProps) => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    if (cloudinaryRef.current) {
      widgetRef.current = (cloudinaryRef.current as any).createUploadWidget(
        {
          cloudName: import.meta.env.VITE_CLOUD_NAME,
          uploadPreset: import.meta.env.VITE_PRESET_NAME,
        },
        function (error: any, result: any) {
          if (result && result.event === "success") {
            console.log("secure url", result.info.secure_url);
            setProfileImage(result.info.secure_url);
            // profileImage(result.info.secure_url)
            // dispatch(setProfilePicture(result.info.secure_url))
          }
        }
      );
    }
  }, []);

  return (
    <button
      type="button"
      // className="border bg-black text-white"
      className="absolute top-4 left-4 text-xl"
      onClick={() => widgetRef.current && (widgetRef.current as any).open()}
    >
      <FaCamera />
    </button>
  );
};

export default UploadWidget;