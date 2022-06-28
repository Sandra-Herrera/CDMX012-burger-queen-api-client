import React, { useContext } from "react";
import { UserContext } from "../../database/UserProvider";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import styles from "./login.module.css";
import imgHeaderInto from "../../img/imgHeaderInto.png";
import headerMediaQ from "../../img/headerMediaQ.jpg";

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
    try {
      await loginUser(data.email, data.password);
      navigate("/home");
    } catch (error) {
      switch (error.code) {
        case "auth/user-not-found":
          setError("email", {
            message: "User not found",
          });
          break;
        default:
      }
    }
  };

  return (
    <>
      <div className={styles.headerImg}>
        <picture>
          <source
            className={styles.imgRest}
            srcSet={imgHeaderInto}
            media="(min-width: 415px)"
            alt="imagen header"
          />
          <img
            className={styles.imgRest}
            src={headerMediaQ}
            alt="imagen header"
          />
        </picture>
      </div>
      <section className={styles.containerLoginArea}>
        <form
          className={styles.formContainer}
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className={styles.loginTitle}>Login</h1>
          <div>
            <input
              type={"email"}
              placeholder="E-mail"
              className={styles.inputLogin}
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
            {errors.email && (
              <p className={styles.errorMessage}>{errors.email.message}</p>
            )}
          </div>
          <div>
            <input
              type={"password"}
              placeholder="Password"
              className={styles.inputLogin}
              id="inputPassword"
              {...register("password", {
                setValueAs: (v) => v.trim(),
                minLength: {
                  value: 6,
                  message: "Min 6 characters",
                },
                validate: {
                  trim: (v) => {
                    if (!v.trim())
                      return "Enter letters, characters or numbers";
                    return true;
                  },
                },
              })}
            />
            {errors.password && (
              <p className={styles.errorMessage}>{errors.password.message}</p>
            )}
          </div>
          <button
            type="submit"
            className={styles.loginButton}
            id="buttonContinue"
          >
            Login
          </button>
        </form>
      </section>
    </>
  );
};

export default Login;
