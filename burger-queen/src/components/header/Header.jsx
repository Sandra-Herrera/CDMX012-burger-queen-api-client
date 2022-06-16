import React from "react";
import styles from "./header.module.css";
import backIcon from "../../img/backIcon.png";
import { useNavigate } from "react-router-dom";
import imgHeaderInto from "../../img/imgHeaderInto.png";
import headerMediaQ from "../../img/headerMediaQ.jpg";

const Header = () => {
  const navigate = useNavigate();

  const redirectHome = () => {
    navigate("/home");
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
        <button className={styles.backButton} onClick={redirectHome}>
          <img alt="iconBack" className={styles.imgBack} src={backIcon} />
        </button>
      </div>
    </>
  );
};

export default Header;
