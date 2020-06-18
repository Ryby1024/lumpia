import React from "react";


const AdminProductCard = (props) => {
    return (
        <div className="card adminProductCard">
            <img class="card-img-top" src={props.image} alt="Card image cap"></img>
            <div className="card-body text-center">
                <h5 className="card-title card-text">Name: {props.name}</h5>
                <span className="productCardBody">
                    <p className="lumpia-type">Type: Chicken, Pork, Vegetable</p>
                    <p className="price">Price: {props.price}</p>
                    <p className="quantity">Quantity: {props.quantity}</p>
                    <button className="select" onClick={() => props.selectProduct(props._id)}>Edit</button>
                    <button className="delete" onClick={() => props.deleteProduct(props._id)}>Delete</button>
                </span>
            </div>
        </div>
    )
}
export default AdminProductCard;