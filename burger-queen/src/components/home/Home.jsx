import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../database/UserProvider";
import "./Home.css";
import imgRestaurant from "../../img/imgRestaurant.jpg";
import chefIcon from "../../img/chefIcon.png";
import orderIcon from "../../img/orderIcon.png";
import productsIcon from "../../img/productsIcon.png";
import teamIcon from "../../img/teamIcon.png";
import logOutIcon from "../../img/logOutIcon.png";

const Home = () => {
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

  return (
    <>
      <div className="headerImg">
        <img alt="imagen header" className="imgRest" src={imgRestaurant} />
      </div>
      <button className="logOutButton" onClick={handleClickLogout}>
        <img alt="imageLogOut" className="iconLogOut" src={logOutIcon} />
      </button>
      <section className="welcomeContainer">
        <section className="welcomeSection">
          <h1 className="welcomeTitle">Welcome</h1>
          <section className="buttonsArea">
            <button className="welcomeButtons">
              Kitchen
              <img alt="imageChef" className="iconsButtons" src={chefIcon} />
            </button>
            <button className="welcomeButtons">
              Order
              <img alt="imageOrder" className="iconsButtons" src={orderIcon} />
            </button>
            <button className="welcomeButtons">
              Product
              <img alt="imageProduct" className="iconsButtons" src={productsIcon} />
            </button>
            <button className="welcomeButtons">
              Team
              <img alt="imageTeam" className="iconsButtons" src={teamIcon} />
            </button>
          </section>
        </section>
      </section>
    </>
  );
};

export default Home;
