import React, { useContext, useState } from "react";
import { UserContext } from "../../database/UserProvider";
import { useNavigate } from "react-router-dom";
import styles from "./login.module.css";
import imgRestaurant from "../../img/imgRestaurant.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  const { loginUser } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let dataLoginUser = await loginUser(email, password, username);
      console.log(dataLoginUser.user.email);
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    <div className={styles.headerImg}>
        <img alt="imagen header" className={styles.imgRest} src={imgRestaurant} />
    </div>
    <section className={styles.containerLoginArea}>
      <section className={styles.loginArea}>
        <h1 className={styles.loginTitle}>Iniciar sesión</h1>
        <br />
        <form onSubmit={handleSubmit}>
          <input
            type={"email"}
            placeholder="Ingresa tu correo"
            className={styles.inputLogin}
            id="inputEmail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br/>
          <br/>
          <input
            type={"password"}
            placeholder="Ingresa tu contraseña"
            className={styles.inputLogin}
            id="inputPassword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br/>
          <br />
          <button type="submit" className={styles.loginButton} id="buttonContinue">
            Ingresar
          </button>
        </form>
      </section>
    </section>
    </>
  );
};

export default Login;
