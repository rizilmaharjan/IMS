import { useEffect, useRef } from "react";
import { FaCamera } from "react-icons/fa";
import { useCustomContext } from "../../context/Context";
type TProps = {
  setProfileImage: (url: string) => void;
  isEditActive?: boolean;
};
declare global {
  interface Window {
    cloudinary: any;
  }
}

// type props={
//     profileImage: (value: React.SetStateAction<string>) => void
// }

const UploadWidget = ({ setProfileImage, isEditActive }: TProps) => {
  const { setUserProfilePicture } = useCustomContext();
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
            setProfileImage(result.info.secure_url);
            setUserProfilePicture(result.info.secure_url);
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
      disabled={!isEditActive}
      // className="border bg-black text-white"
      // className="absolute top-4 left-4 text-xl"
      onClick={() => widgetRef.current && (widgetRef.current as any).open()}
    >
      <FaCamera />
    </button>
  );
};

export default UploadWidget;
