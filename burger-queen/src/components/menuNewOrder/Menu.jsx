import React, { useState, useEffect } from "react";

const Menu = () => {
  const [products, setProducts] = useState([]);

  const getAllProduct = () => {
    fetch("http://localhost:3004/Products")
      .then((response) => response.json())
      .then((products) => setProducts(products));
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  const breakfast = () => {
    let menuBreakfast = (products.filter(menu => menu.category ===  "Breakfast"));
        setProducts(menuBreakfast);
      console.log(menuBreakfast)
  }

  const lunchDinner = () => {
    let menuLunch = (products.filter(menu => menu.category ===  "Lunch/Dinner"));
        setProducts(menuLunch);
      console.log(menuLunch)
  }

  return (
    <>
      <h1>Menu</h1>
        <button onClick={breakfast}>Breakfast</button>
        <button onClick={lunchDinner}>Lunch/Dinner</button>

       {products.map((product) => {
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
