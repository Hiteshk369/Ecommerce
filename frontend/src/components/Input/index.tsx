import { LucideIcon } from "lucide-react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { SignupFormSchema, loginFormSchema } from "../../utils/Schema";
import { z } from "zod";

import classes from "./input.module.css";

type formSchemaType = z.infer<typeof SignupFormSchema>;
type loginSchemaType = z.infer<typeof loginFormSchema>;

interface InputProps {
  id: "name" | "email" | "password";
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  register:
    | UseFormRegister<formSchemaType>
    | UseFormRegister<loginSchemaType>
    | any;
  errors: FieldErrors;
  icon: LucideIcon;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type = "text",
  disabled,
  required,
  register,
  errors,
  icon: Icon,
}) => {
  return (
    <div className="w-full relative">
      <div className="w-[95%] flex relative mb-[0.8rem]">
        <input
          className={`${
            errors[id]
              ? "border-[none] outline-1 outline-red-500"
              : "border-none outline-none w-[90%] h-[2%] relative bg-[#323644] text-white text-base px-7 py-5 rounded-[1.15rem] focus:bg-[#3d404b] disabled:cursor-not-allowed disabled:opacity-60"
          }`}
          id={id}
          type={type}
          disabled={disabled}
          {...register(id, { required })}
          placeholder=" "
        />

        <label
          htmlFor={id}
          className="absolute translate-y-[18px] origin-top-left transition-all duration-[0.1s] ease-[ease-in-out] text-[#798290] scale-100 left-[5%]"
        >
          {label}
        </label>
      </div>
      <Icon
        strokeWidth="1.5px"
        className="absolute text-white text-base right-28 top-5"
      />
    </div>
  );
};

export default Input;
