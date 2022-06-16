import React, { useState, useEffect, useContext } from "react";
import styles from "./menu.module.css";
import OrderContext from "../context/OrderContext";

const Menu = () => {
  const [products, setProducts] = useState([]);
  const [breakfastMenu, setBreakfastMenu] = useState([]);
  const [lunchMenu, setLunchMenu] = useState([]);

  const { order, sendContextOrder, amount, sendContextAmount } =
    useContext(OrderContext);

  const getAllProduct = () => {
    fetch("http://localhost:3004/Products")
      .then((response) => response.json())
      .then((products) => setProducts(products));
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  const breakfast = () => {
    let menuBreakfast = products.filter(
      (menu) => menu.category === "Breakfast"
    );
    setBreakfastMenu(menuBreakfast);
  };

  const lunchDinner = () => {
    let menuLunch = products.filter((menu) => menu.category === "Lunch/Dinner");
    setLunchMenu(menuLunch);
  };

  const addProducts = (product) => {
    product["qty"] = 1;
    let productExist = order.find((itemOrder) => {
      return itemOrder.id === product.id;
    });
    sendContextAmount(parseFloat(amount) + parseFloat(product.price));
    if (productExist) {
      product = { ...productExist, qty: productExist.qty + 1 };
      sendContextOrder(
        order.map((item) =>
          item.id === product.id ? { ...item, qty: product.qty } : item
        )
      );
    } else {
      sendContextOrder([...order, product]);
    }
  };

  return (
    <section className={styles.menuContainerDad}>
      <section className={styles.menuContainer}>
        <h1 className={styles.textMenu}>MENU</h1>
        <section className={styles.buttonsMenu}>
          <button
            className={styles.menuOne}
            onClick={() => breakfast(setLunchMenu([]))}
          >
            Breakfast
          </button>
          <button
            className={styles.menuTwo}
            onClick={() => lunchDinner(setBreakfastMenu([]))}
          >
            Lunch/Dinner
          </button>
        </section>
        <hr></hr>
        <section className={styles.scrollMenu}>
          <section className={styles.allMenu}>
            {breakfastMenu.map((product) => {
              return (
                <li className={styles.breakfastAndLunch} key={product.id}>
                  <button
                    className={styles.buttonBreakfast}
                    onClick={() => addProducts(product)}
                  >
                    {product.name} <br /> {product.price}
                  </button>
                </li>
              );
            })}
          </section>

          <section className={styles.allMenu}>
            {lunchMenu.map((product) => {
              return (
                <li className={styles.breakfastAndLunch} key={product.id}>
                  <button
                    className={styles.buttonLunch}
                    onClick={() => addProducts(product)}
                  >
                    {product.name} <br /> {product.price}
                  </button>
                </li>
              );
            })}
          </section>
        </section>
      </section>
    </section>
  );
};

export default Menu;
