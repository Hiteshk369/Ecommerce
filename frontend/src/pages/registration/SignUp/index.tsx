import { useForm, SubmitHandler } from "react-hook-form";
import { Mail, KeyRound, User } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { ThreeDots } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";

import RegisterLayout from "../../../components/RegisterLayout";
import Input from "../../../components/Input";
import { fetcher } from "../../../libs/fetcher";

const SignUp = () => {
  const navigate = useNavigate();

  const SignupFormSchema = z.object({
    name: z
      .string()
      .min(3, { message: "Name cannot be less than 3 characters" })
      .max(36),
    email: z
      .string()
      .email({ message: "Invalid email address" })
      .min(1, { message: "Email is required" }),
    password: z
      .string()
      .min(1, { message: "Password is required" })
      .min(8, { message: "Must be 8 or more characters long" }),
  });

  type formSchemaType = z.infer<typeof SignupFormSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<formSchemaType>({
    resolver: zodResolver(SignupFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const submitFormData: SubmitHandler<formSchemaType> = async (data) => {
    const response = await fetcher(
      "http://localhost:5000/api/auth/signup",
      data
    );
    const result = await response.json();
    if (response.status === 400 || !result) {
      toast.error("Registration failed");
    } else {
      toast.success("User created");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }
  };

  return (
    <RegisterLayout>
      <div className="flex flex-col h-auto">
        <p className="text-[2.5rem] font-semibold text-white pb-[0.75%]">
          Create new account <span className="text-darkBlue">.</span>
        </p>
        <div className="flex gap-2">
          <p className="text-[#798290] font-normal text-base">
            Already A Member?
          </p>
          <Link to="/login" className="text-darkBlue font-normal">
            Log In
          </Link>
        </div>
        <div className="flex flex-col gap-3 mt-[3%]">
          <Input
            id="name"
            label="Name"
            type="text"
            register={register("name")}
            errors={errors}
            icon={User}
            disabled={isSubmitting}
          />
          <Input
            id="email"
            label="Email"
            type="email"
            register={register("email")}
            errors={errors}
            icon={Mail}
            disabled={isSubmitting}
          />
          <Input
            id="password"
            label="Password"
            type="password"
            register={register("password")}
            errors={errors}
            icon={KeyRound}
            disabled={isSubmitting}
          />
        </div>
        <button
          onClick={handleSubmit(submitFormData)}
          className="w-[85%] bg-darkBlue text-white text-base font-medium cursor-pointer transition-[0.2s] duration-[ease-in] mt-[3%] px-7 py-5 rounded-[1.15rem] border-[none] hover:opacity-80 disabled:opacity-60"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <div className="w-full flex items-center justify-center">
              <ThreeDots
                height="30"
                width="50"
                color="#ffffff"
                visible={true}
              />
            </div>
          ) : (
            "Create account"
          )}
        </button>
      </div>
    </RegisterLayout>
  );
};

export default SignUp;
