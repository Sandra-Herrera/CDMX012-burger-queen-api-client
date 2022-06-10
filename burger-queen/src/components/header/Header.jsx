import React from "react";
import styles from "./header.module.css";
import backIcon from "../../img/backIcon.png";
import { useNavigate } from "react-router-dom";
import imgHeaderInto from "../../img/imgHeaderInto.png";

const Header = () => {
  const navigate = useNavigate();

  const redirectHome = () => {
    navigate("/home");
  };

  return (
    <>
      <div className={styles.headerImg}>
        <img
          alt="imagen header"
          className={styles.imgRest}
          src={imgHeaderInto}
        />
        <button className={styles.backButton} onClick={redirectHome}>
          <img alt="iconBack" className={styles.imgBack} src={backIcon} />
        </button>
      </div>
    </>
  );
};

export default Header;
