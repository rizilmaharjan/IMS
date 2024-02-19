import { UseFormRegister, FieldErrors, FieldValues } from "react-hook-form";
import { IRegistrationUser } from "../../pages/registration/registration.types";
export interface IRegister{
     val: "name" | "email" | "role" | "password" | "username" | "confirmpassword";
    type:string;
    reg: UseFormRegister<IRegistrationUser>;
    msg: string;
    errors:  FieldErrors<FieldValues>;
    regex: RegExp;
}