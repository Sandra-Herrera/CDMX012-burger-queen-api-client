import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../database/UserProvider";
import styles from "./products.module.css";
import imgRestaurant from "../../img/imgRestaurant.png";
import logOutIcon from "../../img/logOutIcon.png";


const Products = () => {
    const { logOut } = useContext(UserContext);
    const navigate = useNavigate();

    const handleClickLogout = async () => {
        try {
          await logOut();
          console.log('cerró sesión');
          navigate("/");
        } catch (error) {
          console.log(error);
        }
      };

      fetch('http://localhost:3004/ComidaCena')
      .then(response => response.json())
      .then(data => console.log(data));

      return (
        <>
          <div className={styles.headerImg}>
            <img alt="imagen header" className={styles.imgRest} src={imgRestaurant} />
            <button className={styles.logOutButton} onClick={handleClickLogout}>Log Out 
            <img alt="imageLogOut" className={styles.iconLogOut} src={logOutIcon} />
            </button>
          </div>
          <section>
            <div className={styles.productsTable}>
              <div className={styles.titleTable}>PRODUCTS</div>
              <div className={styles.headerTable}>2</div>
              <div className={styles.headerTable}>3</div>
              <div className={styles.headerTable}>4</div>
              <div className={styles.headerTable}>5</div>
              <div className={styles.headerTable}>6</div>
              <div className={styles.itemTable}>7</div>
              <div className={styles.itemTable}>8</div>
              <div className={styles.itemTable}>9</div>
              <div className={styles.itemTable}>10</div>
              <div className={styles.itemTable}>11</div>
              <div className={styles.itemTable}>12</div>
              <div className={styles.itemTable}>13</div>
              <div className={styles.itemTable}>14</div>
              <div className={styles.itemTable}>15</div>
              <div className={styles.itemTable}>16</div>
              <div className={styles.itemTable}>17</div>
              <div className={styles.itemTable}>18</div>
            </div>
           </section>
          
        </>
      );
    };
    
    export default Products;