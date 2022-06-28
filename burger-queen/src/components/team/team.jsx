import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./team.module.css";
import Header from "../header/Header";
import addIcon from "../../img/addIcon.png";
import imgEdit from "../../img/imgEdit.png";
import imgDelete from "../../img/imgDelete.png";
import { EditEmployee } from "../popup/EditEmployee";

const Team = () => {
  const navigate = useNavigate();
  const [team, setTeam] = useState([]);
  const [objModal, setModal] = useState({ visibility: false });
  const [modalDelete, setModalDelete] = useState(false);
  const [idDeletedEmployee, setIdDeletedEmployee] = useState("");

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

  const editEmployee = (popupProduct) => {
    setModal({ visibility: true, popupProduct });
  };

  const onClickHide = () => {
    getAllTeam();
    setModal({ visibility: false });
  };

  const toggleModalDelete = () => {
    setModalDelete(!modalDelete);
  };

  const deletePerson = (id) => {
    setIdDeletedEmployee(id);
    toggleModalDelete();
  };

  const deleteEmployee = (employee) => {
    fetch(`http://localhost:3004/Team/${employee.id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((deletedEmployee) => {
        console.log(deletedEmployee);
        getAllTeam();
      });
    toggleModalDelete();
  };

  return (
    <>
      <EditEmployee
        onClickCloseModal={onClickHide}
        visible={objModal.visibility}
        attrProduct={objModal.popupProduct}
      />

      <Header />

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
            <div className={styles.headerTable}>Name</div>
            <div className={styles.headerTable}>Role</div>
            <div className={styles.headerTable}>Password</div>
            <div className={styles.headerTable}>Edit</div>
            <div className={styles.headerTable}>Delete</div>
          </div>
          <div className={styles.scrollProduct}>
            {team.map((employee) => {
              return (
                <div key={employee.id} className={styles.containerItems}>
                  <div className={styles.itemAlignStart}>
                    {" "}
                    <p className={styles.text}>{employee.email}</p>{" "}
                  </div>
                  <div className={styles.itemTable}>
                    {" "}
                    <p className={styles.text}>{employee.name}</p>{" "}
                  </div>
                  <div className={styles.itemTable}>
                    {" "}
                    <p>{employee.role}</p>{" "}
                  </div>
                  <div className={styles.itemTable}>
                    {" "}
                    <p className={styles.text}>{employee.password}</p>{" "}
                  </div>
                  <div className={styles.itemTable}>
                    <button className={styles.btnEditAndDelete}>
                      <img
                        alt="imgEdit"
                        className={styles.imgEdit}
                        src={imgEdit}
                        onClick={() => editEmployee(employee)}
                      ></img>
                    </button>
                  </div>
                  <div className={styles.itemTable}>
                    <button
                      className={styles.btnEditAndDelete}
                      onClick={() => deletePerson(employee)}
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

      {modalDelete && (
        <section className={styles.modalDelete}>
          <section className={styles.overlayDelete}></section>
          <section className={styles.modalContentDelete}>
            <h2 className={styles.deleteOrCancel}>
              Are you sure you want to delete this person?
            </h2>
            <section className={styles.deleteAndCancel}>
              <button
                className={styles.deleteYes}
                onClick={() => deleteEmployee(idDeletedEmployee)}
              >
                Delete
              </button>
              <button
                type="submit"
                className={styles.cancel}
                onClick={toggleModalDelete}
              >
                Cancel
              </button>
            </section>
          </section>
        </section>
      )}
    </>
  );
};

export default Team;
