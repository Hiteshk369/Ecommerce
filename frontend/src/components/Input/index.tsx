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
    <div className={classes.mainContainer}>
      <div className={classes.inputContainer}>
        <input
          className={`${errors[id] ? classes.errorField : classes.inputField}`}
          id={id}
          type={type}
          disabled={disabled}
          {...register(id, { required })}
          placeholder=" "
        />

        <label htmlFor={id} className={classes.label}>
          {label}
        </label>
      </div>
      <Icon strokeWidth="1.5px" className={classes.icon} />
    </div>
  );
};

export default Input;
