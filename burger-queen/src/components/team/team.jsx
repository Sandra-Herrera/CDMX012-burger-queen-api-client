import React, {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import styles from "./team.module.css";
import Header from '../header/Header'
import addIcon from "../../img/addIcon.png";
import imgEdit from "../../img/imgEdit.png";
import imgDelete from "../../img/imgDelete.png";

const Team = () => {
  const navigate = useNavigate();
  const [team, setTeam] = useState([]);

  const redirecSignup = () => {
    navigate("/signup");
  };

  const getAllTeam = () => {
    fetch("http://localhost:3004/team")
      .then((response) => response.json())
      .then((employees) => setTeam(employees));
  };

  useEffect(() => {
    getAllTeam();
  }, []);

  return (
    <>
    <Header/>

    <section>
        <div className={styles.productsTable}>
          <div>
            <div className={styles.titleTable}>
              TEAM
              <button className={styles.addButton} onClick={redirecSignup}>
                <img
                  alt="imageAddButton"
                  className={styles.iconAdd}
                  src={addIcon}
                />
              </button>
            </div>
          </div>
          <div className={styles.mainHeaderTable}>
            <div className={styles.headerTable}>E-mail</div>
            <div className={styles.headerTable}>Full name</div>
            <div className={styles.headerTable}>Role</div>
            <div className={styles.headerTable}>Password</div>
            <div className={styles.headerTable}>Edit</div>
            <div className={styles.headerTable}>Delete</div>
          </div>
          <div className={styles.scrollProduct}>
            {team.map((employee) => {
              return (
                <div key={employee.id} className={styles.containerItems}>
                  <div className={styles.itemAlignStart}> <p className={styles.text}>{employee.email}</p> </div>
                  <div className={styles.itemTable}> <p className={styles.text}>{employee.name}</p> </div>
                  <div className={styles.itemTable}> <p>{employee.role}</p> </div>
                  <div className={styles.itemTable}> <p className={styles.text}>{employee.password}</p> </div>
                  <div className={styles.itemTable}>
                    <button className={styles.btnEditAndDelete}>
                      <img
                        alt="imgEdit"
                        className={styles.imgEdit}
                        src={imgEdit}
                        // onClick={() => editProducts(product)}
                      ></img>
                    </button>
                  </div>
                  <div className={styles.itemTable}>
                    <button
                      className={styles.btnEditAndDelete}
                      // onClick={() => deleteMeal(product)}
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
        </div>
      </section>
    </>
  )
}

export default Team