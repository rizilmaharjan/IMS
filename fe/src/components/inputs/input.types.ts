import { UseFormRegister, FieldErrors, FieldValues } from "react-hook-form";
import { IRegistrationUser } from "../../pages/registration/registration.types";
export interface IRegister {
  val: string;
  type: string;
  reg: UseFormRegister<IRegistrationUser>;
  msg: string;
  errors: FieldErrors<FieldValues>;
  regex?: RegExp;
}
