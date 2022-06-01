import React, { useState, useEffect, useContext } from "react";
import styles from "./menu.module.css";
import line from "../../img/line.png";
import OrderContext from "../context/OrderContext";

const Menu = () => {
  const [products, setProducts] = useState([]);
  const [breakfastMenu, setBreakfastMenu] = useState([]);
  const [lunchMenu, setLunchMenu] = useState([]);

  const { sendContextOrder } = useContext(OrderContext);

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

  // let order = [];
  // const addProducts = (product) => {
  //   order.push(product);
  //   console.log(product);
  // }

  const addProducts = (product) => {
    sendContextOrder(product);
  };

  return (
    <section className={styles.menuContainerDad}>
      <section className={styles.menuContainer}>
        <h1 className={styles.textMenu}>Menu</h1>
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
        <section className={styles.line}>
          <img alt="line" className={styles.imgLine} src={line} />
        </section>

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
                <button className={styles.buttonLunch}>
                  {product.name} <br /> {product.price}
                </button>
              </li>
            );
          })}
        </section>
      </section>
    </section>
  );
};

export default Menu;
