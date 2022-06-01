import React from "react";
import { useNavigate } from "react-router-dom";
import Menu from "./Menu";

const ViewMenuNewOrder = () => {
  const navigate = useNavigate();

  const redirectHome = () => {
    navigate("/home");
  };

  return (
    <>
    {/* <div className={styles.headerImg}>
        <img alt="imagen header" className={styles.imgRest} src={imgRestaurant}/>
        <button className={styles.logOutButton} onClick={handleClickLogout}>
          Log Out
          <img alt="imageLogOut" className={styles.iconLogOut} src={logOutIcon}/>
        </button>
      </div> */}
      <button onClick={redirectHome}>Back</button>
      <Menu />
    </>
  );
};

export default ViewMenuNewOrder;
