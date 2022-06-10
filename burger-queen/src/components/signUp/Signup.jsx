import React, { useContext } from "react";
import { useForm } from "react-hook-form";
// import { useContext } from "react";
import { UserContext } from "../../database/UserProvider";
import { updateProfile } from "firebase/auth";
import { auth } from "../../database/firebase-config";
import { useNavigate } from "react-router-dom";
import styles from "./signup.module.css";
import imgHeaderInto from "../../img/imgHeaderInto.png";
import backIcon from "../../img/backIcon.png";

const Signup = () => {
  // const [team, setTeam] = useState({});
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
    // setTeam(data)
    try {
      await createUser(data.email, data.password, data.username, data.rol);

      updateProfile(auth.currentUser, {
        displayName: data.username,
        photoURL: data.rol,
      });
      saveEmployee(data)
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
  // console.log(team)

  const redirectTeam = () => {
    navigate("/team");
  };



  // const [employees, setEmployee] = useState([]);

  // const getAllTeam = () => {
  //   fetch("http://localhost:3004/team")
  //     .then((response) => response.json())
  //     .then((employee) => setEmployee(employee));
  // };

  // useEffect(() => {
  //   getAllTeam();
  // }, []);

  const saveEmployee = (dataTeam) => {
    // let sendEmployee = employees.map(() =>
     let employee =  Object.assign(
        {},
        {
          email: dataTeam.email,
          name: dataTeam.username,
          role: dataTeam.rol,
          password: dataTeam.password,
        }
      )
    // );
    // sendEmployee.forEach((employee) => {
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
    // });
  };

  return (
    <>
      <div className={styles.headerImg}>
        <img
          alt="imagen header"
          className={styles.imgRest}
          src={imgHeaderInto}
        />
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
            {errors.email && <p className={styles.errorMessage}>{errors.email.message}</p>}
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
            {errors.username && <p className={styles.errorMessage}>{errors.username.message}</p>}
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
            {errors.password && <p className={styles.errorMessage}>{errors.password.message}</p>}
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
            {errors.passwordAgain && <p className={styles.errorMessage}>{errors.passwordAgain.message}</p>}
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
            <option value="Waiter">Waiter</option>
            <option value="Kitchen">Kitchen</option>
            <option value="Administrator">Administrator</option>
          </select>
          {errors.rol && <p className={styles.errorMessage}>{errors.rol.message}</p>}
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
