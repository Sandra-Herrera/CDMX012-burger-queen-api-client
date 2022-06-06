import React, { useContext } from "react";
import styles from "./newOrder.module.css";
import imgDelete from "../../img/imgDelete.png";
import imgMinus from "../../img/imgMinus.png";
import imgPlus from "../../img/imgPlus.png";
import OrderContext from "../context/OrderContext";

const NewOrder = () => {
  const { order, sendContextOrder } = useContext(OrderContext);

  const minusProducts = (product) => {
    let productExist = order.find((itemOrder) => {
      return itemOrder.id === product.id;
    });
    if (productExist) {
      product = { ...productExist, qty: productExist.qty - 1 };
      if (product.qty <= 0) {
        deleteProducts(product);
      } else {
        sendContextOrder(
          order.map((item) =>
            item.id === product.id ? { ...item, qty: product.qty } : item
          )
        );
      }
    }
  };

  const plusProducts = (product) => {
    let productExist = order.find((itemOrder) => {
      return itemOrder.id === product.id;
    });
    if (productExist) {
      product = { ...productExist, qty: productExist.qty + 1 };
      sendContextOrder(
        order.map((item) =>
          item.id === product.id ? { ...item, qty: product.qty } : item
        )
      );
    }
  };

  const deleteProducts = (product) => {
    //preguntar si desea eliminar
    sendContextOrder(order.filter((item) => item.id !== product.id));
  };

  
  const onInputTableChange = (e) =>{
    let { value } = e.target;
    sendContextOrder(order.map(itemOrder => Object.assign({}, {...itemOrder, table: value} )));
  }

  const sendToKitchen = () => async (e) => {
    e.preventDefault();
    let tableNumber = document.getElementById('inputNumberTable').value;
    sendContextOrder(order.map(itemOrder => Object.assign({}, {...itemOrder, table: tableNumber} )));

    let sendChosenProduct = order.map(itemOrder => 
      Object.assign({}, {product:itemOrder.name, qty:itemOrder.qty, table:itemOrder.table,dateCreated:new Date().toISOString(),dateDone:""})
    );
    sendChosenProduct.forEach((ChosenProduct) => {
      fetch("http://localhost:3004/chosenProduct", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(ChosenProduct),
      })
        .then((response) => response.json())
        .then((addedProduct) => {
          console.log(addedProduct);
        });
    });
  };

  return (
    <>
      <section className={styles.containerNewOrder}>
        <div className={styles.newOrderSection}>
          <div>
            <div className={styles.titleNewOrder}>NEW ORDER</div>
          </div>
          <div className={styles.inputsOrder}>
            <p className={styles.titleTable}>
              Table number<input id="inputNumberTable" onChange={onInputTableChange} className={styles.numTable}></input>
            </p>
            <hr></hr>
          </div>
          <section className={styles.containerOrder}>
            {order.map((product) => {
              return (
                <div key={product.id} className={styles.productRow}>
                  <div className={styles.itemAlignStart}>{product.name}</div>
                  <div className={styles.itemTable}>
                    <button
                      className={styles.btnIcons}
                      onClick={() => minusProducts(product)}
                    >
                      <img
                        alt="iconMinus"
                        className={styles.imgIcon}
                        src={imgMinus}
                      ></img>
                    </button>
                  </div>
                  <div className={styles.itemTable}>
                    <input
                      className={styles.inputCounter}
                      type="text"
                      value={product.qty}
                      disabled
                    />
                  </div>
                  <div className={styles.itemTable}>
                    <button
                      className={styles.btnIcons}
                      onClick={() => plusProducts(product)}
                    >
                      <img
                        alt="iconPlus"
                        className={styles.imgIcon}
                        src={imgPlus}
                      ></img>
                    </button>
                  </div>
                  <div className={styles.itemTable}>
                    <button
                      className={styles.btnIcons}
                      onClick={() => deleteProducts(product)}
                    >
                      <img
                        alt="iconDelete"
                        className={styles.imgIcon}
                        src={imgDelete}
                      ></img>
                    </button>
                  </div>
                </div>
              );
            })}
          </section>
          <section className={styles.bottonAreabtn}>
            <button className={styles.bottonButtons}>Orders ready</button>
            <button onClick={sendToKitchen()} className={styles.bottonButtons}>
              Send to kitchen
            </button>
          </section>
        </div>
      </section>
    </>
  );
};

export default NewOrder;