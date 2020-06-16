import React from "react";
let moment = require("moment");


const ProductCard = (props) => {
    return (
        <div className="card productCard">
            <img className="card-img-top" src={props.image} alt="Card image cap"></img>
            <div className="card-body text-center">
                <h5 className="card-title card-text">Name: {props.name}</h5>
                <span className="productCardBody">
                    <p className="lumpia-type">Type: Chicken, Pork, Vegetable</p>
                    <p className="price">Price: {props.price}</p>
                    <p className="quantity">Quantity: {props.quantity}</p>
                </span>
            </div>
        </div>
    )
}
export default ProductCard;