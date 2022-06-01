import React from 'react';
import { useNavigate } from "react-router-dom";
import styles from "./error.module.css";
import appleSad from "../../img/appleSad.png";

function Error(){
    const navigate = useNavigate();

    const redirectHome = () => {
        navigate("/home");
      };

    return(
        <React.Fragment>
            <section className={styles.errorMessage}>
            <h2>Error 404, you are not authorized to access this page</h2>
            <img alt="appleSad" className={styles.apple} src={appleSad}></img>
            <button className={styles.redirect} onClick={redirectHome}>Back to home</button>
            </section>
        </React.Fragment>
    );
}
export default Error;
