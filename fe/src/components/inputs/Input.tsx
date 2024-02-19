import { IRegister } from "./input.types";
const Input = ({ val, type, reg, msg, errors,regex}:IRegister) => {
  return (
    <>
      <div className="flex flex-col md:w-2/3 my-2 leading-1">
        <label className="font-bold">{val}</label>
        <input className={`py-1 border-b border-b-black outline-none ${errors && "border-b-red-500"}`} type={type} {...reg(val,{
            pattern:{
              value:regex,
              message: "invalid pattern"
            },
            required: msg
        })} autoComplete="off" />
        <p className="text-red-600 font-semibold">{errors[val]?.message && String(errors[val]?.message)}</p>
      </div>
    </>
  );
};

export default Input;
