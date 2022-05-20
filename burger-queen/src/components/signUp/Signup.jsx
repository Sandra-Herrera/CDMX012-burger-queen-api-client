import React from "react";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { UserContext } from "../../database/UserProvider";
import { updateProfile } from "firebase/auth";
import { auth } from "../../database/firebase-config";

const Signup = () => {
  const { createUser } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
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

  return (
    <React.Fragment>
      <h1>Crear usuario</h1>
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
        <input
          type={"password"}
          placeholder="Validate password"
          className="inputLogin"
          id="inputPasswordTwo"
          {...register("passwordAgain", {
            validate: {
              equals: (v) =>
                v === getValues("password") || "Passwords do not match",
            },
          })}
        />
        {errors.passwordAgain && <p>{errors.passwordAgain.message}</p>}
        <br />
        <input
          type={"text"}
          placeholder="Username"
          className="inputLogin"
          id="inputUsername"
          {...register("username", {
            required: { value: true, message: "This field is required" },
            validate: {
              trim: (v) => {
                if (!v.trim()) return "Enter letters, characters or numbers";
                return true;
              },
            },
          })}
        />
        {errors.username && <p>{errors.username.message}</p>}
        <br />
        <select
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
        <button type="submit" id="buttonContinue">
          Ingresar
        </button>
      </form>
    </React.Fragment>
  );
};

export default Signup;
