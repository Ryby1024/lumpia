import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import API from "../../utils/API";
import ProductCard from "../../components/ProductCard"


class Products extends Component {
    state = {
        products: [],
        name: "",
        price: "",
        quantity: ""
    }

    componentDidMount() {
        this.getAllProducts();
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
          [name]: value
        });
    
    
      };

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

    get allProducts() {
        const { products } = this.state
        console.log(products);

        if(Array.isArray(products)) {
            return products.map(product => {
                return <ProductCard 
                key={product._id}
                _id={product._id}
                name={product.name}
                price={product.price}
                quantity={product.quantity}
                />
            })
        }
    }

    render(){
        return(
            <Container>
                <h1 id="allProducts">All Products</h1>

                <Row>
                    <Col size="sm-4" id="product-column">
                        {this.getProducts}
                    </Col>
                </Row>
            </Container>
        )
    }
}
export default Products;