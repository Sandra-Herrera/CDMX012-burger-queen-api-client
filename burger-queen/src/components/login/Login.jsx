import React, { useContext } from "react";
import { UserContext } from "../../database/UserProvider";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const navigate = useNavigate();

  const { loginUser } = useContext(UserContext);

  const onSubmit = async (data) => {
    console.log(data);
    try {
      await loginUser(data.email, data.password);
      navigate("/home");
    } catch (error) {
      console.log(error.code);
      switch (error.code) {
        case "auth/user-not-found":
          setError("email", {
            message: "User not found",
          });
          break;
        default:
          console.log("Ocurrió un error");
      }
    }
  };

  return (
    <React.Fragment>
      <h1>Iniciar sesión</h1>
      <br />
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type={"email"}
          placeholder="E-mail"
          className="inputLogin"
          id="inputEmail"
          {...register("email", {
            required: { value: true, message: "This field is required" },
            pattern: {
              value:
                /[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/,
              message: "Wrong email format",
            },
          })}
        />
        {errors.email && <p>{errors.email.message}</p>}
        <br />
        <input
          type={"password"}
          placeholder="Password"
          className="inputLogin"
          id="inputPassword"
          {...register("password", {
            setValueAs: (v) => v.trim(),
            minLength: {
              value: 6,
              message: "Min 6 characters",
            },
            validate: {
              trim: (v) => {
                if (!v.trim()) return "Enter letters, characters or numbers";
                return true;
              },
            },
          })}
        />
        {errors.password && <p>{errors.password.message}</p>}
        <br />
        <button type="submit" id="buttonContinue">
          Login
        </button>
      </form>
    </React.Fragment>
  );
};

export default Login;
