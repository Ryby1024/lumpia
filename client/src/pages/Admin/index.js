import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/API";
import AdminProductCard from "../../components/AdminProductCard";
import { Col, Row, Container } from "../../components/Grid";
import {withRouter} from "react-router-dom";
import { Tabs, Tab } from "react-bootstrap";
import { FormGroup, Label, Input, Dropdown, Option, FormBtn } from "../../components/Form";
import Table from 'react-bootstrap/Table'



class Admin extends Component {
    state = {
        users: [],
        currentUser: [],
        products: [],
        user_id: "",
        username: "",
        email: "",
        admin: "",
        name: "",
        image: "",
        price: "",
        quantity: ""

    }
    componentDidMount() {
        this.getAllUsers();
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
                let myProducts = res.data;
                this.setState({
                    products: myProducts
                })
            })
            .catch(err => console.log(err));
    }

    getAllUsers = () => {
        API.getUsers()
            .then(res => {
                let allUsers = res.data;
                console.log(allUsers)
                this.setState({
                    users: allUsers
                })
            })
            .catch(err => console.log(err));
    }

    deleteUser = (id) => {
        API.deleteUser(id)
            .then(res => {
                this.getAllUsers()
            })
            .catch(err => console.log(err));
        console.log("click working")
    }

    userInfo = (id) => {
        API.selectUser(id)
        .then(res => {
            console.log(res.data)
            this.setState({
                user_id: res.data._id,
                username: res.data.username,
                email: res.data.email,
                admin: res.data.admin
            })
        })
        .catch(err => console.log(err));
    }

    selectProduct = (id) => {
        API.selectProduct(id)
        .then(res => {
            console.log(res.data)
            this.setState({
                name: res.data.name,
                image: res.data.image,
                price: res.data.price,
                quantity: res.data.quantity
            })
        })
        .catch(err => console.log(err));
    }


    updateUser = (event) => {
        event.preventDefault();
        API.editUser({
            _id: this.state.user_id,
            username: this.state.username,
            email: this.state.email,
            admin: this.state.admin
        })
        .then(res => {
            console.log(res);
            console.log("User updated");
            this.props.history.push("/admin")
        })
    }

    addProduct = (event) => {
        event.preventDefault();
        API.addProduct({
            name: this.state.name,
            image: this.state.image,
            price: this.state.price,
            quantity: this.state.quantity
        })
        .then(res => {
            console.log(res);
            // this.props.history.push("/products")
        })
        .catch(err => {
            console.log(err);
        })
    };


    render() {
        return (
            <Container>
                <Tabs defaultActiveKey="user" transition={false} id="noanim-tab-example">
                    <Tab eventKey="user" title="Edit Users">
                        <Row className="all-users">
                            {this.state.users.map(user => (                           
                            <Table responsive>
                                <thead>
                                    <tr>
                                        <th>User Name</th>
                                        <th>User Email</th>
                                        <th>Admin</th>
                                        <th>Edit</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>{user.admin}</td>
                                        <td>{<button onClick={() => this.userInfo(user._id)}>Select</button>}</td>
                                    </tr>
                                </tbody>

                            </Table>
                             ))}
                        </Row>
                    
                        <FormGroup>
                            <Row>
                                <Col size="sm-6" className="align-self-center">
                            <Label text="User Name"/>
                            <Input
                                type="text" 
                                name="username"
                                defaultValue={this.state.username}
                                onChange={this.handleInputChange}
                                className="form-control" id="username"
                                placeholder={this.state.username}
                            />
                            </Col>
                        </Row>
                        </FormGroup>

                        <FormGroup>
                        <Row>
                                <Col size="sm-6" className="align-self-center">
                            <Label text="Email"/>
                            <Input
                                type="text"
                                name="email"
                                defaultValue={this.state.email}
                                onChange={this.handleInputChange}
                                className="form-control" id="email"
                                placeholder={this.state.email}
                            />
                            </Col>
                        </Row>
                        </FormGroup>

                        <FormGroup>
                        <Row>
                                <Col size="sm-6" className="align-self-center">
                            <Label text="Admin"/>
                            <select className="form-control" name="admin" defaultValue={this.state.admin} onChange={this.handleInputChange}>
                                <option value="true">Admin</option>
                                <option value="false">Not Admin</option>
                            </select>
                            </Col>
                        </Row>
                        </FormGroup>
                        <FormGroup>
                            <FormBtn
                            text="Update"
                            onClick={this.updateUser}
                            classes="submitButton"
                            />
                        </FormGroup>
                    </Tab>
                
                <Tab eventKey="products" title="Add Products" >
                <h3 id="new-product">Add New Products</h3>
                <Row className="add-product">
                    <Col size="sm-6" className="align-self-center">
                        <FormGroup>
                                <Row>
                                    <Col size="md-6">
                                        <Label text="Name" />
                                        <Input 
                                        type="text"
                                        value={this.state.name}
                                        name="name"
                                        onChange={this.handleInputChange}
                                        className="form-control" className="productName"
                                        placeholder="Type of Lumpia"
                                        />
                                    </Col>
                                </Row>
                        </FormGroup>
                        <FormGroup>
                                <Row>
                                    <Col size="md-6">
                                        <Label text="Image" />
                                        <Input 
                                        type="text"
                                        value={this.state.image}
                                        name="image"
                                        onChange={this.handleInputChange}
                                        className="form-control" className="imageLink"
                                        placeholder="Link for Image"
                                        />
                                    </Col>
                                </Row>
                        </FormGroup>

                        <FormGroup>
                                <Row>
                                    <Col size="md-6">
                                        <Label text="Price" />
                                        <Input 
                                        type="text"
                                        value={this.state.price}
                                        name="price"
                                        onChange={this.handleInputChange}
                                        className="form-control" className="price"
                                        placeholder="Price"
                                        />
                                    </Col>
                                </Row>
                        </FormGroup>


                        <FormGroup>
                                <Row>
                                    <Col size="md-6">
                                        <Label text="Quantity" />
                                        <Input 
                                        type="text"
                                        value={this.state.quantity}
                                        name="quantity"
                                        onChange={this.handleInputChange}
                                        className="form-control" className="quantity"
                                        placeholder="Quantity"
                                        />
                                    </Col>
                                </Row>
                        </FormGroup>

                        <FormGroup>
                            <FormBtn
                            text="Add"
                            onClick={this.addProduct}
                            classes="submitButton"
                            />
                        </FormGroup>
                        
                        
                    </Col>
                </Row>
                </Tab>

                <Tab eventKey="edit=products" title="Edit/Delete Products">
                    <h3 id="editProducts">Edit/Delete Products</h3>
                    <Row className="products">
                        <Col size="md-3">
                    {this.state.products.map(product => (
                        <AdminProductCard 
                        key={product._id}
                        _id={product._id}
                        name={product.name}
                        image={product.image}
                        price={product.price}
                        quantity={product.quantity}
                        deleteProduct={this.deleteProduct}
                        selectProduct={this.selectProduct}

                        />
                    ))}
                    </Col>
                  </Row>

                  <Row className="add-product">
                    <Col size="sm-6" className="align-self-center">
                        <FormGroup>
                                <Row>
                                    <Col size="md-6">
                                        <Label text="Name" />
                                        <Input 
                                        type="text"
                                        defaultValue={this.state.name}
                                        name="name"
                                        onChange={this.handleInputChange}
                                        className="form-control" className="productName"
                                        placeholder={this.state.name}
                                        />
                                    </Col>
                                </Row>
                        </FormGroup>
                        <FormGroup>
                                <Row>
                                    <Col size="md-6">
                                        <Label text="Image" />
                                        <Input 
                                        type="text"
                                        defaultValue={this.state.image}
                                        name="image"
                                        onChange={this.handleInputChange}
                                        className="form-control" className="imageLink"
                                        placeholder={this.state.image}
                                        />
                                    </Col>
                                </Row>
                        </FormGroup>

                        <FormGroup>
                                <Row>
                                    <Col size="md-6">
                                        <Label text="Price" />
                                        <Input 
                                        type="text"
                                        defaultValue={this.state.price}
                                        name="price"
                                        onChange={this.handleInputChange}
                                        className="form-control" className="price"
                                        placeholder={this.state.price}
                                        />
                                    </Col>
                                </Row>
                        </FormGroup>


                        <FormGroup>
                                <Row>
                                    <Col size="md-6">
                                        <Label text="Quantity" />
                                        <Input 
                                        type="text"
                                        defaultValue={this.state.quantity}
                                        name="quantity"
                                        onChange={this.handleInputChange}
                                        className="form-control" className="quantity"
                                        placeholder={this.state.quantity}
                                        />
                                    </Col>
                                </Row>
                        </FormGroup>

                        <FormGroup>
                            <FormBtn
                            text="Add"
                            onClick={this.editProduct}
                            classes="submitButton"
                            />
                        </FormGroup>
                        
                        
                    </Col>
                </Row>

                </Tab>

                </Tabs>               
            </Container >
        )
    }



}
export default withRouter(Admin);