import React, { useState, useEffect } from "react";

const Menu = () => {
  const [products, setProducts] = useState([]);
  const [breakfastMenu, setBreakfastMenu] = useState([]);
  const [lunchMenu, setLunchMenu] = useState([]);

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
    console.log(menuBreakfast);
  };

  const lunchDinner = () => {
    let menuLunch = products.filter((menu) => menu.category === "Lunch/Dinner");
    setLunchMenu(menuLunch);
    console.log(menuLunch);
  };

  return (
    <>
      <h1>Menu</h1>
      <button onClick={() => breakfast(setLunchMenu([]))}>Breakfast</button>
      <button onClick={() => lunchDinner(setBreakfastMenu([]))}>
        Lunch/Dinner
      </button>

      {breakfastMenu.map((product) => {
        return (
          <li key={product.id}>
            <button>
              {product.name} <br /> {product.price}
            </button>
          </li>
        );
      })}

      {lunchMenu.map((product) => {
        return (
          <li key={product.id}>
            <button>
              {product.name} <br /> {product.price}
            </button>
          </li>
        );
      })}
    </>
  );
};

export default Menu;
