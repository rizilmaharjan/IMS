import { useState } from "react";

type TProps = {
  label: string;
  inputType: string;
  initialValue?: string;
  isEditActive: boolean;
  name: string;
  onInputChange: (name: string, value: string) => void;
};

type TUserInput = {
  username: string;
  name: string;
  email: string;
};

export default function UserProfileInput({
  label,
  inputType,
  isEditActive,
  initialValue,
  name,
  onInputChange,
}: TProps) {
  const [value, setValue] = useState(initialValue);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onInputChange(name, newValue);
  };
  return (
    <>
      <div className="mt-4">
        <label className="font-bold">{label}:</label>
        <br />
        <input
          onChange={handleChange}
          disabled={!isEditActive}
          value={value}
          name={name}
          className={`border ${
            !isEditActive ? "text-gray-400 font-semibold" : "text-black"
          }  border-gray-400 outline-none p-3 mt-2 w-2/3`}
          type={inputType}
        />
      </div>
    </>
  );
}
