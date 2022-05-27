import React from 'react';
import styles from "./error.module.css";
import appleSad from "../../img/appleSad.png";

function Error(){
    return(
        <React.Fragment>
            <section className={styles.errorMessage}>
            <h2>Error 404, you are not authorized to access this page</h2>
            <img alt="appleSad" className={styles.apple} src={appleSad}></img>
            </section>
        </React.Fragment>
    );
}
export default Error;
