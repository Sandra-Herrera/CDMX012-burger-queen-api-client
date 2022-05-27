import { useState } from "react";
import styles from "./popup.module.css";


export function Popup(props) {

    const initialStateValues = {
        name: '',
        price:'',
        category:'',
    };

    const [values, setValues] = useState(initialStateValues);
    
    const areaEditChange = e =>{
        const {id, value} = e.target;
        const newValue = {...props.attrProduct, [id]: value};
        setValues(newValue);
    }


    const saveProduct =product => async (e) => {
        e.preventDefault();
        if(product && product.id){
            // Hacer PUT
            fetch(`http://localhost:3004/Products/${product.id}`,{
                method: 'PUT',
                headers: { 
                    'content-type': 'application/json',
                },
                body:JSON.stringify(values)
            })
            .then(response => response.json())
            .then(addedProduct => {
                console.log(addedProduct)
                props.onClickCloseModal();
            });
        }else{
            // Hacer POST
            product = values;
            fetch('http://localhost:3004/Products',{
                method: 'POST',
                headers: { 
                    'content-type': 'application/json',
                },
                body:JSON.stringify(product)
            })
            .then(response => response.json())
            .then(addedProduct => {
                console.log(addedProduct)
                props.onClickCloseModal();
            });
        }  
    }

    return(
        props.visible ?
        <>
            {/* <!-- The Modal --> */}
            <div id="myModal" className={styles.modal}>

                {/* <!-- Modal content --> */}
                <div className={styles.modalContent}>
                    <span className={styles.close} onClick={props.onClickCloseModal}>&times;</span>
                    <section className={styles.titleModal}>New product</section>
                    <input className={styles.inputModal} id="name" onChange={areaEditChange} placeholder="Product Name" defaultValue={props.attrProduct?.name}></input>
                    <input className={styles.inputModal} id="price" onChange={areaEditChange} placeholder="Price" defaultValue={props.attrProduct?.price}></input>
                    <input className={styles.inputModal} id="category" onChange={areaEditChange} placeholder="Category" defaultValue={props.attrProduct?.category}></input>
                    <section className={styles.areaSaveButton}>
                        <button className={styles.saveEditButton} onClick={saveProduct(props.attrProduct)} > 
                            Save
                        </button>
                    </section>
                </div>
            </div>
        </>
        : null
    );
}