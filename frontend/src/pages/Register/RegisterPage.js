import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import classes from "./registerPage.module.css";
import Title from "../../components/Title/Title";
import { Link } from "react-router-dom";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../hook/useAuth";

export default function RegisterPage() {
  const auth = useAuth();
  const { user } = auth;
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const returnUrl = params.get("returnUrl");

  useEffect(() => {
    if (!user) return;
    returnUrl ? navigate(returnUrl) : navigate("/");
  }, [user]);

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();
  const submit = async (data) => {
    await auth.register(data);
  };

  return (
    <div className={classes.container}>
      <div className="{classes.details}">
        <Title title="Register" />
        <form onSubmit={handleSubmit(submit)} noValidate>
          <Input
            type="text"
            label="Name"
            {...register("name", {
              required: true,
              minLength: 2,
              maxLength: 50,
            })}
            error={errors.name}
          />

          <Input
            type="email"
            label="Email"
            {...register("email", {
              required: true,
              pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,63}$/i,
              message: "Email is not valid",
            })}
            error={errors.email}
          />

          <Input
            type="password"
            label="Password"
            {...register("password", {
              required: true,
              minLength: 6,
              maxLength: 20,
            })}
            error={errors.password}
          />

          <Input
            type="password"
            label="Confirm Password"
            {...register("confirmPassword", {
              required: true,
              validate: (value) =>
                value === getValues("password")
                  ? true
                  : "Passwords do not match",
            })}
            error={errors.confirmPassword}
          />
          <Input
            type="text"
            label="Address"
            {...register("address", {
              required: true,
              minLength: 10,
            })}
            error={errors.address}
          />

          <Button type="submit" text="Register" />
        </form>
        <div className={classes.login}>
          Already have an account? &nbsp;
          <Link to={`/login${returnUrl ? "?returnUrl=" + returnUrl : ""}`}>
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
}
