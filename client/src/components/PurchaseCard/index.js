import React from "react";
let moment = require("moment");

const OrderProductCard = (props) => {
    return (
        <div className="card buyProductCard">
            <img class="card-img-top" src={props.image} alt="Card image cap"></img>
            <div className="card-body text-center">
                <h5 className="card-title card-text">Name: {props.name}</h5>
                <span className="productCardBody">
                    <p className="lumpia-type">Type: Chicken, Pork, Vegetable</p>
                    <p className="price">Price: {props.price}</p>
                    <p className="quantity">Quantity: {props.quantity}</p>
                    <button className="order" onClick={() => props.orderProducts(props._id)}>Order</button>
                </span>
            </div>
        </div>
    )
}
export default OrderProductCard;