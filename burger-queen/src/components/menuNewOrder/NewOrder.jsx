import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import styles from "./newOrder.module.css";
import imgDelete from "../../img/imgDelete.png";
import imgMinus from "../../img/imgMinus.png";
import imgPlus from "../../img/imgPlus.png";
import OrderContext from "../context/OrderContext";
import Swal from "sweetalert2";

const NewOrder = () => {
  const { order, sendContextOrder, amount, sendContextAmount } =
    useContext(OrderContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const minusProducts = (product) => (e) => {
    e.preventDefault();
    let productExist = order.find((itemOrder) => {
      return itemOrder.id === product.id;
    });
    if (productExist) {
      sendContextAmount(parseFloat(amount) - parseFloat(product.price));
      product = { ...productExist, qty: productExist.qty - 1 };
      if (product.qty <= 0) {
        sendContextOrder(order.filter((item) => item.id !== product.id));
      } else {
        sendContextOrder(
          order.map((item) =>
            item.id === product.id ? { ...item, qty: product.qty } : item
          )
        );
      }
    }
  };

  const plusProducts = (product) => (e) => {
    e.preventDefault();
    let productExist = order.find((itemOrder) => {
      return itemOrder.id === product.id;
    });

    if (productExist) {
      sendContextAmount(parseFloat(amount) + parseFloat(product.price));
      product = { ...productExist, qty: productExist.qty + 1 };
      sendContextOrder(
        order.map((item) =>
          item.id === product.id ? { ...item, qty: product.qty } : item
        )
      );
    }
  };

  const deleteProducts = (product) => (e) => {
    e.preventDefault();
    //preguntar si desea eliminar
    if (product.qty > 0) {
      sendContextAmount(
        parseFloat(amount) - parseFloat(product.price) * parseInt(product.qty)
      );
    }
    sendContextOrder(order.filter((item) => item.id !== product.id));
  };

  const onInputTableChange = (e) => {
    let { value } = e.target;
    sendContextOrder(
      order.map((itemOrder) =>
        Object.assign({}, { ...itemOrder, table: value })
      )
    );
  };

  const sendToKitchen = (data) => {
    sendContextOrder(
      order.map((itemOrder) =>
        Object.assign({}, { ...itemOrder, table: data.table })
      )
    );

    let sendChosenProduct = order.map((itemOrder) =>
      Object.assign(
        {},
        {
          product: itemOrder.name,
          qty: itemOrder.qty,
          table: data.table,
          dateCreated: new Date().toISOString(),
          dateDone: "",
        }
      )
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
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Order send",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <>
      <section className={styles.containerNewOrder}>
        <form
          className={styles.newOrderSection}
          onSubmit={handleSubmit(sendToKitchen)}
        >
          <div>
            <div className={styles.titleNewOrder}>NEW ORDER</div>
          </div>
          <div>
            <section className={styles.inputsOrder}>
              <p className={styles.titleTable}>
                Table number
                <select
                  id="inputNumberTable"
                  onChange={onInputTableChange}
                  className={styles.numTable}
                  {...register("table", {
                    required: {
                      value: true,
                      message: "Required",
                    },
                  })}
                >
                  <option value=""></option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
                {errors.table && (
                  <p className={styles.errorMessage}>{errors.table.message}</p>
                )}
              </p>
              <p className={styles.titleAccount}>
                Account total $
                <input
                  id="inputAccount"
                  className={styles.account}
                  value={amount}
                  disabled
                ></input>
              </p>
            </section>
            <hr></hr>
          </div>
          {/* {status === 0 ? ( */}
          <section className={styles.containerOrder}>
            {order.map((product) => {
              return (
                <div key={product.id} className={styles.productRow}>
                  <div className={styles.itemAlignStart}>{product.name}</div>
                  <div className={styles.itemTable}>
                    <button
                      className={styles.btnIcons}
                      onClick={minusProducts(product)}
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
                      onClick={plusProducts(product)}
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
                      onClick={deleteProducts(product)}
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
          {/* ) : (
            ""
         )} */}
          <section className={styles.bottonAreabtn}>
            <button className={styles.bottonButtons}>Orders ready</button>
            <button type="submit" className={styles.bottonButtons}>
              Send to kitchen
            </button>
          </section>
        </form>
      </section>
    </>
  );
};

export default NewOrder;
