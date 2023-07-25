import { useForm, SubmitHandler } from "react-hook-form";
import { Mail, KeyRound, User } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import toast from "react-hot-toast";
import { ThreeDots } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";

import classes from "./SignUp.module.css";
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
      <div className={classes.formContainer}>
        <p className={classes.createAccountText}>
          Create new account <span>.</span>
        </p>
        <div className={classes.flexContainer}>
          <p className={classes.alreadyMemberText}>Already A Member?</p>
          <Link to="/login" className={classes.loginText}>
            Log In
          </Link>
        </div>
        <div className={classes.inputContainer}>
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
            "Create account"
          )}
        </button>
      </div>
    </RegisterLayout>
  );
};

export default SignUp;
