import { LucideIcon } from "lucide-react";
import { FieldErrors } from "react-hook-form";
interface InputProps {
  id: "name" | "email" | "password";
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  register?: unknown;
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
      <div className="w-[85%] relative">
        <input
          id={id}
          type={type}
          {...(register ?? {})}
          disabled={disabled}
          required={required}
          className="block py-[1.5rem] px-[1.75rem]  placeholder:pl-3 w-full text-sm text-white bg-[#323644] rounded-lg   focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
        />
        <label
          htmlFor={id}
          className="absolute text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0]  px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:bg-gray-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
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
