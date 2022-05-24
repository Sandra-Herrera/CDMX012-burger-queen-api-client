import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../database/UserProvider";
import styles from "./home.module.css";
import imgRestaurant from "../../img/imgRestaurant.png";
import chefIcon from "../../img/chefIcon.png";
import orderIcon from "../../img/orderIcon.png";
import productsIcon from "../../img/productsIcon.png";
import teamIcon from "../../img/teamIcon.png";
import logOutIcon from "../../img/logOutIcon.png";

const Home = () => {
  const { logOut } = useContext(UserContext);
  const navigate = useNavigate();

  fetch('http://localhost:3004/ComidaCena')
  .then(response => response.json())
  .then(data => console.log(data));


  const handleClickLogout = async () => {
    try {
      await logOut();
      console.log('cerró sesión');
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <>
      <div className={styles.headerImg}>
        <img alt="imagen header" className={styles.imgRest} src={imgRestaurant} />
        <button className={styles.logOutButton} onClick={handleClickLogout}>Log Out
        <img alt="imageLogOut" className={styles.iconLogOut} src={logOutIcon} />
      </button>
      </div>
      <section className={styles.welcomeContainer}>
        <section className={styles.welcomeSection}>
          {/* <h1 className={styles.welcomeTitle}>Welcome</h1> */}
          <section className={styles.buttonsArea}>
            <button className={styles.welcomeButtons}>
              Kitchen
              <img alt="imageChef" className={styles.iconsButtons} src={chefIcon} />
            </button>
            <button className={styles.welcomeButtons}>
              Order
              <img alt="imageOrder" className={styles.iconsButtons} src={orderIcon} />
            </button>
            <button className={styles.welcomeButtons}>
              Product
              <img alt="imageProduct" className={styles.iconsButtons} src={productsIcon} />
            </button>
            <button className={styles.welcomeButtons}>
              Team
              <img alt="imageTeam" className={styles.iconsButtons} src={teamIcon} />
            </button>
          </section>
        </section>
      </section>
    </>
  );
};

export default Home;
