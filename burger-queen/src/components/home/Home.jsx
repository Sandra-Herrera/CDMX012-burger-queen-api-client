import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../database/UserProvider";
import styles from "./home.module.css";
import imgHeaderInto from "../../img/imgHeaderInto.png";
import chefIcon from "../../img/chefIcon.png";
import orderIcon from "../../img/orderIcon.png";
import productsIcon from "../../img/productsIcon.png";
import teamIcon from "../../img/teamIcon.png";
import logOutIcon from "../../img/logOutIcon.png";
import headerMediaQ from "../../img/headerMediaQ.jpg";

const Home = () => {
  const { logOut } = useContext(UserContext);
  const navigate = useNavigate();

  // fetch("http://localhost:3004/ComidaCena")
  //   .then((response) => response.json())
  //   .then((data) => console.log(data));

  const handleClickLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const redirectKitchen = () => {
    navigate("/kitchen");
  };

  const redirectProduct = () => {
    navigate("/products");
  };

  const redirectTeam = () => {
    navigate("/team");
  };

  const redirectOrder = () => {
    navigate("/order");
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
        <button className={styles.logOutButton} onClick={handleClickLogout}>
          <img
            alt="imageLogOut"
            className={styles.iconLogOut}
            src={logOutIcon}
          />
        </button>
      </div>
      <section className={styles.welcomeContainer}>
        <section className={styles.welcomeSection}>
          <section className={styles.buttonsArea}>
            <button className={styles.welcomeButtons} onClick={redirectKitchen}>
              Kitchen
              <img
                alt="imageChef"
                className={styles.iconsButtons}
                src={chefIcon}
              />
            </button>
            <button className={styles.welcomeButtons} onClick={redirectOrder}>
              Order
              <img
                alt="imageOrder"
                className={styles.iconsButtons}
                src={orderIcon}
              />
            </button>
            <button className={styles.welcomeButtons} onClick={redirectProduct}>
              Product
              <img
                alt="imageProduct"
                className={styles.iconsButtons}
                src={productsIcon}
              />
            </button>
            <button className={styles.welcomeButtons} onClick={redirectTeam}>
              Team
              <img
                alt="imageTeam"
                className={styles.iconsButtons}
                src={teamIcon}
              />
            </button>
          </section>
        </section>
      </section>
    </>
  );
};

export default Home;
