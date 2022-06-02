import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./error.module.css";
import coffeeCup from "../../img/coffeeCup.png";

function Error() {
  const navigate = useNavigate();

  const redirectHome = () => {
    navigate("/home");
  };

  return (
    <React.Fragment>
      <section className={styles.errorMessage}>
        <h1>Error 404</h1>
        <h2>Oops!… you are not authorized to access this page</h2>
        <img alt="cupCoffee" className={styles.cupCoffee} src={coffeeCup}></img>
        <button className={styles.redirect} onClick={redirectHome}>
          Back to home
        </button>
      </section>
    </React.Fragment>
  );
}
export default Error;
