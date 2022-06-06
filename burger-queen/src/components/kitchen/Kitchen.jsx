import React, { useState, useEffect, useContext } from "react";
import styles from "./kitchen.module.css";
import imgRestaurant from "../../img/imgRestaurant.png";
import backIcon from "../../img/backIcon.png";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../database/UserProvider";
import logOutIcon from "../../img/logOutIcon.png";
// import Chronometer from "../chronometer/Chronometer";

const Kitchen = () => {
  const navigate = useNavigate();
  const [chosenProduct, setChosenProduct] = useState([]);
  // const [timer, setTimer] = useState();
  const { logOut } = useContext(UserContext);

  const handleClickLogout = async () => {
    try {
      await logOut();
      console.log("cerró sesión");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const getAllProduct = () => {
    fetch("http://localhost:3004/chosenProduct")
      .then((response) => response.json())
      .then((chosenProduct) => setChosenProduct(chosenProduct));
      // console.log(chosenProduct.dateCreated.getUTCMinutes());
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  const redirectHome = () => {
    navigate("/home");
  };

  return (
    <>
      <div className={styles.headerImg}>
        <img
          alt="imagen header"
          className={styles.imgRest}
          src={imgRestaurant}
        />
        <button className={styles.backButton} onClick={redirectHome}>
          <img alt="iconBack" className={styles.imgBack} src={backIcon} />
        </button>
        <button className={styles.logOutButton} onClick={handleClickLogout}>
          <img
            alt="imageLogOut"
            className={styles.iconLogOut}
            src={logOutIcon}
          />
        </button>
      </div>

      {/* <section><Chronometer  setTimer={setTimer}/></section>
      {console.log(timer)} */}

      <section>
        <div className={styles.productsTable}>
          <div>
            <div className={styles.titleTable}>NEW ORDERS</div>
          </div>
          <div className={styles.mainHeaderTable}>
            <div className={styles.headerTable}>Product</div>
            <div className={styles.headerTable}>Quantity</div>
            <div className={styles.headerTable}>Table</div>
            <div className={styles.headerTable}>Timer</div>
            <div className={styles.headerTable}>Order check</div>
          </div>
          {chosenProduct.map((product) => {
            return (
              <div key={product.id} className={styles.containerItems}>
                <div className={styles.itemAlignStart}>{product.product}</div>
                <div className={styles.itemTable}>{product.qty}</div>
                <div className={styles.itemTable}>{product.table}</div>
                <div className={styles.itemTable}>{product.dateCreated}</div>
                <div className={styles.itemTable}>
                  <button>x</button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default Kitchen;
