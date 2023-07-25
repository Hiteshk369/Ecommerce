import { useForm, SubmitHandler } from "react-hook-form";
import { Mail, KeyRound } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { ThreeDots } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";

import RegisterLayout from "../../../components/RegisterLayout";
import Input from "../../../components/Input";
import { loginFormSchema } from "../../../utils/Schema";
import classes from "./login.module.css";
import { fetcher } from "../../../libs/fetcher";

const Login = () => {
  const navigate = useNavigate();

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
    const response = await fetcher(
      "http://localhost:5000/api/auth/login",
      data
    );
    const result = await response.json();
    if (response.status === 400 || !result) {
      toast.error("Invalid credentials");
    } else {
      toast.success("Login successful");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  };

  return (
    <RegisterLayout>
      <div className={classes.formContainer}>
        <p className={classes.createAccountText}>
          Login to continue <span>.</span>
        </p>
        <div className={classes.flexContainer}>
          <p className={classes.alreadyMemberText}>New to eCommerce?</p>
          <Link to="/signup" className={classes.loginText}>
            Register
          </Link>
        </div>
        <div className={classes.inputContainer}>
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
          className={classes.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <div className={classes.submittingDots}>
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
