import React, { useState, useEffect, useContext } from "react";
import styles from "./kitchen.module.css";
// import imgRestaurant from "../../img/imgRestaurant.png";
import backIcon from "../../img/backIcon.png";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../database/UserProvider";
import logOutIcon from "../../img/logOutIcon.png";
import imgHeaderInto from "../../img/imgHeaderInto.png";
// import Chronometer from "../chronometer/Chronometer";

const Kitchen = () => {
  const navigate = useNavigate();
  const [chosenProduct, setChosenProduct] = useState([]);
  const [check, setCheck] = useState(false);
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
      .then((chosenProduct) => {
        setChosenProduct(chosenProduct);
        let checkStates = chosenProduct.map((choseProd) => {
          if (choseProd.dateDone !== "") {
            return true;
          } else {
            return false;
          }
        });
        console.log(checkStates);
        setCheck(checkStates);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  const saveDate = (chosenProd) => {
    fetch(`http://localhost:3004/chosenProduct/${chosenProd.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ dateDone: new Date().toISOString() }),
    })
      .then((response) => {
        console.log(response.status);
        return response.json();
      })
      .then((data) => console.log(data));
  };

  const redirectHome = () => {
    navigate("/home");
  };

  const handleChange = (position, chosenProd) => async () => {
    saveDate(chosenProd);
    const updatedCheckedState = check.map((item, index) => {
      return index === position ? !item : item;
    });
    console.log(updatedCheckedState);
    setCheck(updatedCheckedState);
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
          <div className={styles.scrollKitchen}>
          {chosenProduct.map((chosenProd, index) => {
            return (
              <div key={chosenProd.id} className={styles.containerItems}>
                <div className={styles.itemAlignStart}>
                  {chosenProd.product}
                </div>
                <div className={styles.itemTable}>{chosenProd.qty}</div>
                <div className={styles.itemTable}>{chosenProd.table}</div>
                <div className={styles.itemTable}>{}</div>
                <div className={styles.itemTable}>
                  <input
                    type="checkbox"
                    value="check"
                    onChange={handleChange(index, chosenProd)}
                    checked={check[index]}
                    className={styles.checkbox}
                    disabled={check[index]}
                    //onClick={saveDate(chosenProd)}
                  />
                </div>
              </div>
            );
          })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Kitchen;
