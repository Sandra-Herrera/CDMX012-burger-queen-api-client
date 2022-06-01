import React,{useState} from "react";
import PropTypes from "prop-types";


const OrderContext = React.createContext();

OrderContextProvider.propTypes = {
    children: PropTypes.element.isRequired
}

export const OrderContextProvider = (props) =>{
    const[order, setOrder] = useState([]);

    const sendContextOrder = (meal)=>{
        setOrder(meal);
    }
    return(
        <OrderContext.Provider value={{order,sendContextOrder}}>
            {props.children}
        </OrderContext.Provider>
    )
}

export default OrderContext;