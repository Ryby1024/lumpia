import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/API";
import AdminProductCard from "../../components/AdminProductCard";
import { Col, Row, Container } from "../../components/Grid";

class Admin extends Component {
    state = {
        users: [],
        products: [],
        username: "",
        admin: "",
        name: "",
        price: "",
        quantity: ""

    }


    getAllProducts = () => {
        API.getProducts()
        .then(res => {
            let myProducts = res.data.products;
            this.setState({
                products: myProducts
            })
        })
        .catch(err => console.log(err));
    }




}