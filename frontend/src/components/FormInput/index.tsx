import { LucideIcon } from "lucide-react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { SignupFormSchema, loginFormSchema } from "../../utils/Schema";
import { z } from "zod";

import classes from "./input.module.css";

type formSchemaType = z.infer<typeof SignupFormSchema>;
type loginSchemaType = z.infer<typeof loginFormSchema>;

interface FormInputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  placeholderText?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  id,
  label,
  type = "text",
  disabled,
  required,
  placeholderText,
}) => {
  return (
    <div className="w-full space-y-1">
      <label className="capitalize text-sm text-neutral-700" htmlFor={id}>
        {label}
      </label>
      <input
        className="w-full px-2 py-2 border-lightGray border rounded-md text-sm"
        id={id}
        type={type}
        required
        disabled={disabled}
        placeholder={placeholderText}
      />
    </div>
  );
};

export default FormInput;
