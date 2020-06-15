import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/API";
import AdminProductCard from "../../components/AdminProductCard";
import { Col, Row, Container } from "../../components/Grid";
import UserCard from "../../components/UserCard";
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
        price: "",
        quantity: ""

    }
    componentDidMount() {
        this.getAllUsers();
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
                                        name="name"
                                        onChange={this.handleInputChange}
                                        className="form-control" id="productName"
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
                                        name="image"
                                        onChange={this.handleInputChange}
                                        className="form-control" id="imageLink"
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
                                        name="price"
                                        onChange={this.handleInputChange}
                                        className="form-control" id="price"
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
                                        name="quantity"
                                        onChange={this.handleInputChange}
                                        className="form-control" id="quantity"
                                        placeholder="Quantity"
                                        />
                                    </Col>
                                </Row>
                        </FormGroup>

                        
                        <button type="button" onClick={() => this.addProduct()}>Add Product</button>
                    </Col>
                </Row>
                </Tab>

                </Tabs>               
            </Container >
        )
    }



}
export default withRouter(Admin);