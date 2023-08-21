import { FieldErrors } from "react-hook-form";

interface FormInputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  placeholderText?: string;
  register?: object;
  errors: FieldErrors;
}

const FormInput: React.FC<FormInputProps> = ({
  id,
  label,
  type = "text",
  disabled,
  required,
  register,
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
        required={required}
        disabled={disabled}
        placeholder={placeholderText}
        {...(register ?? {})}
      />
    </div>
  );
};

export default FormInput;
