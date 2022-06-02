import React from "react";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { UserContext } from "../../database/UserProvider";
import { updateProfile } from "firebase/auth";
import { auth } from "../../database/firebase-config";
import { useNavigate } from "react-router-dom";
import styles from "./signup.module.css";
import imgRestaurant from "../../img/imgRestaurant.png";
import backIcon from "../../img/backIcon.png";

const Signup = () => {
  const { createUser } = useContext(UserContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await createUser(data.email, data.password, data.username, data.rol);

      updateProfile(auth.currentUser, {
        displayName: data.username,
        photoURL: data.rol,
      });
    } catch (error) {
      console.log(error.code);
      switch (error.code) {
        case "auth/email-already-in-use":
          setError("email", {
            message: "email already in use",
          });
          break;
        default:
          console.log("Ocurrió un error");
      }
    }
  };

  const redirectHome = () => {
    navigate("/home");
  };

  return (
    <>
      <div className={styles.headerImg}>
        <img
          alt="imagen header"
          className={styles.imgRest}
          src={imgRestaurant}
        />
        <button className={styles.backButton} onClick={redirectHome}>
          <img alt="iconBack" className={styles.imgBack} src={backIcon} />
        </button>
      </div>
      <section className={styles.containerSignUpArea}>
        <form
          className={styles.formContainer}
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className={styles.signUpTitle}>Register a new user here</h1>
          <br />
          <section className={styles.inputContainer}>
            <input
              type={"email"}
              placeholder="E-mail"
              className={styles.inputSignUp}
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
            <input
              type={"text"}
              placeholder="Username"
              className={styles.inputSignUp}
              id="inputUsername"
              {...register("username", {
                required: { value: true, message: "This field is required" },
                validate: {
                  trim: (v) => {
                    if (!v.trim())
                      return "Enter letters, characters or numbers";
                    return true;
                  },
                },
              })}
            />
            {errors.username && <p>{errors.username.message}</p>}
            <input
              type={"password"}
              placeholder="Password"
              className={styles.inputSignUp}
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
            {errors.password && <p>{errors.password.message}</p>}
            <input
              type={"password"}
              placeholder="Validate password"
              className={styles.inputSignUp}
              id="inputPasswordTwo"
              {...register("passwordAgain", {
                validate: {
                  equals: (v) =>
                    v === getValues("password") || "Passwords do not match",
                },
              })}
            />
            {errors.passwordAgain && <p>{errors.passwordAgain.message}</p>}
          </section>
          <select
            className={styles.rol}
            {...register("rol", {
              required: { value: true, message: "This field is required" },
            })}
          >
            <option value="">Choose a role</option>
            <option value="mesero">Mesero</option>
            <option value="cocina">Cocina</option>
            <option value="administrador">Administrador</option>
          </select>
          {errors.rol && <p>{errors.rol.message}</p>}
          <br />
          <button
            type="submit"
            id="buttonContinue"
            className={styles.continueBtn}
          >
            Continue
          </button>
        </form>
      </section>
    </>
  );
};

export default Signup;
