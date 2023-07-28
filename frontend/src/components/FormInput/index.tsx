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
