import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../database/UserProvider";
import styles from "./products.module.css";
import imgRestaurant from "../../img/imgRestaurant.png";
import logOutIcon from "../../img/logOutIcon.png";
import imgDelete from "../../img/imgDelete.png";
import imgEdit from "../../img/imgEdit.png";
import addIcon from "../../img/addIcon.png";
import { helpHttp } from "../../helpers/helpHttp";
import Loader from "./Loader";
import Message from "./Message";
import { useForm } from "react-hook-form";
import { Popup } from "../popup/Popup";

const Products = () => {
  const [products, setProducts] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [objPopup, setPopup] = useState({visibility:false});
  const { logOut } = useContext(UserContext);
  const navigate = useNavigate();

  const handleClickLogout = async () => {
    try {
      await logOut();
      console.log("cerró sesión");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  let api = helpHttp();
  let url = "http://localhost:3004/Products";

  useEffect(() => {
    setLoading(true);
    api.get(url).then((res) => {
      if (!res.err) {
        setProducts(res);
        setError(null);
      } else {
        setProducts(null);
        setError(res);
      }
      setLoading(false);
    });
  }, [url]);

  const { register, handleSubmit } = useForm();

  const onAdd  = () =>{
    setPopup({visibility:true});
}

  const createProducts = (data) => {
    data.id = Date.now();
    let options = {
      body: data,
      headers: { "content-type": "application/json" },
    };
    api.post(url, options).then((res) => {
      console.log(res);
      if (!res.err) {
        setProducts([...products, res]);
      } else {
        setError(res);
      }
    });
  };

  const onClickHide = ()=> {
    setPopup({visibility:false});
}

  const deleteProducts = (id) => {
    alert(id);
    // delete products.id
    // const productDelete = products.filter((item) => item.id !== id)
    // setProducts(productDelete)
  };

  const editProducts = (id) => {
    alert(id);
  };

  return (
    <>
      <Popup
        onClickCloseModal={onClickHide}
        visible={objPopup.visibility}
        attrProduct={objPopup.popupProduct}
      ></Popup>

      <div className={styles.headerImg}>
        <img
          alt="imagen header"
          className={styles.imgRest}
          src={imgRestaurant}
        />
        <button className={styles.logOutButton} onClick={handleClickLogout}>
          Log Out
          <img
            alt="imageLogOut"
            className={styles.iconLogOut}
            src={logOutIcon}
          />
        </button>
      </div>
      {loading && <Loader />}
      {error && (
        <Message
          msg={`Error ${error.status}: ${error.statusText}`}
          bgColor="#dc3545"
        />
      )}
      <form onSubmit={handleSubmit(createProducts)}>
        <input
          type="text"
          placeholder="name"
          {...register("name", { required: true })}
        />
        <input
          type="text"
          placeholder="cost"
          {...register("cost", { required: true })}
        />
        <input
          type="text"
          placeholder="category"
          {...register("category", { required: true })}
        />
        <button className={styles.addButton}>
          Add
          <img alt="imageAddButton" className={styles.iconAdd} src={addIcon} />
        </button>
      </form>
      {products && (
        <section>
          <div className={styles.productsTable}>
            <div>
              <div className={styles.titleTable}>
                PRODUCTS
<button className={styles.addButton} onClick={onAdd}>
              Add
              <img alt="imageAddButton" className={styles.iconAdd} src={addIcon} />
            </button>


              </div>
            </div>
            <div className={styles.mainHeaderTable}>
              <div className={styles.headerTable}>Name</div>
              <div className={styles.headerTable}>Cost</div>
              <div className={styles.headerTable}>Category</div>
            </div>

            {products.map((product) => {
              return (
                <div key={product.id} className={styles.containerItems}>
                  <div className={styles.itemAlignStart}>{product.name}</div>
                  <div className={styles.itemTable}>{product.cost}</div>
                  <div className={styles.itemTable}>{product.category}</div>
                  <div className={styles.itemTable}>
                    <button
                      className={styles.btnEditAndDelete}
                      onClick={() => editProducts(product.id)}
                    >
                      <img
                        alt="imgEdit"
                        className={styles.imgEdit}
                        src={imgEdit}
                      ></img>
                    </button>
                  </div>
                  <div className={styles.itemTable}>
                    <button
                      className={styles.btnEditAndDelete}
                      onClick={() => deleteProducts(product.id)}
                    >
                      <img
                        alt="imgDelete"
                        className={styles.imgDelete}
                        src={imgDelete}
                      ></img>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </>
  );
};

export default Products;
