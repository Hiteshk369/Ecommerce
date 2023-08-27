import { useForm, SubmitHandler } from "react-hook-form";
import { Mail, KeyRound } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { ThreeDots } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { SET_USER } from "../../../redux/reducers/userSlice";

import RegisterLayout from "../../../components/RegisterLayout";
import Input from "../../../components/Input";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginFormSchema = z.object({
    email: z
      .string()
      .email({ message: "Invalid email address" })
      .min(1, { message: "Email is required" }),
    password: z
      .string()
      .min(1, { message: "Password is required" })
      .min(8, { message: "Must be 8 or more characters long" }),
  });

  type formSchemaType = z.infer<typeof loginFormSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<formSchemaType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const submitFormData: SubmitHandler<formSchemaType> = async (data) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      localStorage.setItem("accessToken", result.accessToken);
      localStorage.setItem("userId", result.id);
      dispatch(
        SET_USER({
          token: result.accessToken,
          id: result.id,
        })
      );
      toast.success("Login successful");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      toast.error("Invalid credentials");
    }
  };

  return (
    <RegisterLayout>
      <div className="flex flex-col h-auto">
        <p className="text-[2.5rem] font-semibold text-white pb-[0.75%]">
          Login to continue <span className="text-darkBlue">.</span>
        </p>
        <div className="flex items-center gap-2">
          <p className="text-[#798290] font-normal text-base">
            New to eCommerce?
          </p>
          <Link to="/register" className="text-darkBlue font-normal">
            Register
          </Link>
        </div>
        <div className="flex flex-col gap-6 mt-[4%]">
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
          className="w-[85%] bg-darkBlue text-white text-base font-medium cursor-pointer transition-[0.2s] duration-[ease-in] mt-[5%] px-7 py-5 rounded-[1.15rem] border-[none] hover:opacity-80 disabled:opacity-60"
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
            "Login"
          )}
        </button>
      </div>
    </RegisterLayout>
  );
};

export default Login;
