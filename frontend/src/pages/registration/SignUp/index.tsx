import { useForm, SubmitHandler } from "react-hook-form";
import { Mail, KeyRound, User } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import toast from "react-hot-toast";
import { ThreeDots } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";

import RegisterLayout from "../../../components/RegisterLayout";
import Input from "../../../components/Input";
import { SignupFormSchema } from "../../../utils/Schema";

const SignUp = () => {
  const navigate = useNavigate();

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

  const submitFormData: SubmitHandler<formSchemaType> = (data) => {
    axios
      .post("http://localhost:5000/api/auth/signup", data)
      .then((data) => {
        console.log(data);
        toast.success("User registered");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      })
      .catch((error) => {
        toast.error("User registration failed");
      });
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
        <div className="flex flex-col mt-[3%]">
          <Input
            id="name"
            label="Name"
            type="text"
            register={register}
            errors={errors}
            icon={User}
            disabled={isSubmitting}
          />
          <Input
            id="email"
            label="Email"
            type="email"
            register={register}
            errors={errors}
            icon={Mail}
            disabled={isSubmitting}
          />
          <Input
            id="password"
            label="Password"
            type="password"
            register={register}
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
