import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../../database/UserProvider";
import { updateProfile } from "firebase/auth";
import { auth } from "../../database/firebase-config";
import { useNavigate } from "react-router-dom";
import styles from "./signup.module.css";
import imgHeaderInto from "../../img/imgHeaderInto.png";
import headerMediaQ from "../../img/headerMediaQ.jpg";
import backIcon from "../../img/backIcon.png";
import Swal from "sweetalert2";

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

  const redirectTeam = () => {
    navigate("/team");
  };

  const onSubmit = async (data) => {
    try {
      await createUser(data.email, data.password, data.username, data.rol);

      updateProfile(auth.currentUser, {
        displayName: data.username,
        photoURL: data.rol,
      });
      let employee = Object.assign(
        {},
        {
          email: data.email,
          name: data.username,
          role: data.rol,
          password: data.password,
        }
      );

      fetch("http://localhost:3004/team", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(employee),
      })
        .then((response) => response.json())
        .then((addedEmployee) => {
          console.log(addedEmployee);
        });
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Added employee",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/team");
    } catch (error) {
      switch (error.code) {
        case "auth/email-already-in-use":
          setError("email", {
            message: "email already in use",
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
        <button className={styles.backButton} onClick={redirectTeam}>
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
            <div>
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
              {errors.email && (
                <p className={styles.errorMessage}>{errors.email.message}</p>
              )}
            </div>
            <div>
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
              {errors.username && (
                <p className={styles.errorMessage}>{errors.username.message}</p>
              )}
            </div>
            <div>
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
              {errors.password && (
                <p className={styles.errorMessage}>{errors.password.message}</p>
              )}
            </div>
            <div className={styles.errorMessage}>
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
              {errors.passwordAgain && (
                <p className={styles.errorMessage}>
                  {errors.passwordAgain.message}
                </p>
              )}
            </div>
          </section>
          <div>
            <select
              className={styles.rol}
              {...register("rol", {
                required: { value: true, message: "This field is required" },
              })}
            >
              <option value="">Choose a role</option>
              <option value="waiter">Waiter</option>
              <option value="kitchen">Kitchen</option>
              <option value="administrator">Administrator</option>
            </select>
            {errors.rol && (
              <p className={styles.errorMessage}>{errors.rol.message}</p>
            )}
          </div>
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
