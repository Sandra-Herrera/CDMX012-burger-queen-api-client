import React, {  useContext } from "react";
import styles from "./newOrder.module.css";
import imgDelete from "../../img/imgDelete.png";
import imgMinus from "../../img/imgMinus.png";
import imgPlus from "../../img/imgPlus.png";
import OrderContext from "../context/OrderContext"

const NewOrder = () => {
  const { order } = useContext(OrderContext);


  const minusProducts = () => {

  }

  const plusProducts = () => {

  }

  const deleteProducts = (product) => {
    return product //quitarlo

  };

  return (
    <>
      <section className={styles.containerNewOrder}>
        <div className={styles.newOrderSection}>
          <div>
            <div className={styles.titleNewOrder}>
              NEW ORDER
            </div>
          </div>
          <div className={styles.inputsOrder}>
            <p className={styles.titleTable}>
              Table number<input className={styles.numTable}></input>
            </p>
            <hr></hr>
          </div>
          <section className={styles.containerOrder}>
            {order.map((product) => {
              return (
                <div key={product.id} className={styles.productRow}>
                  <div className={styles.itemAlignStart}>{product.name}</div>
                  <div className={styles.itemTable}>
                    <button className={styles.btnIcons} onClick={() => minusProducts(product)}>
                      <img alt="iconMinus" className={styles.imgIcon} src={imgMinus}></img>
                    </button>
                  </div>
                  <div className={styles.itemTable}>
                    <input className={styles.inputCounter} type= "text" />
                  </div>
                  <div className={styles.itemTable}>
                    <button className={styles.btnIcons} onClick={() => plusProducts(product)}>
                      <img alt="iconPlus" className={styles.imgIcon} src={imgPlus}></img>
                    </button>
                  </div>
                  <div className={styles.itemTable}>
                    <button className={styles.btnIcons} onClick={() => deleteProducts(product)}>
                      <img alt="iconDelete" className={styles.imgIcon} src={imgDelete}></img>
                    </button>
                  </div>
                </div>
              );
            })}
          </section>
          <section className={styles.bottonAreabtn}>
            <button className={styles.bottonButtons}>Orders</button>
            <button className={styles.bottonButtons}>Send</button>
          </section>
        </div>
       </section>

    </>
  );
};

export default NewOrder;