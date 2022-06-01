import React from "react";
import { useNavigate } from "react-router-dom";
import Menu from "./Menu";
import styles from "./viewMenuNewOrder.module.css";
import imgRestaurant from "../../img/imgRestaurant.png";
import backIcon from "../../img/backIcon.png";
import {OrderContextProvider} from "../context/OrderContext";
import NewOrder from "./NewOrder"

const ViewMenuNewOrder = () => {
  const navigate = useNavigate();

  const redirectHome = () => {
    navigate("/home");
  };

  return (
    <>
      <div className={styles.headerOrder}>
        <img alt="imgHeader" className={styles.headerImg} src={imgRestaurant} />
        <button className={styles.backButton} onClick={redirectHome}>
          <img alt="iconBack" className={styles.imgBack} src={backIcon} />
        </button>
      </div>

      <OrderContextProvider>
        <section className={styles.containerViewMenuNewOrder}>
          <Menu />
          <NewOrder />
        </section>
      </OrderContextProvider>
    </>
  );
};

export default ViewMenuNewOrder;
