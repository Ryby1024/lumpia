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
                                name="Username"
                                value={this.state.username}
                                onChange={this.handleInputChange}
                                type="text"
                            />
                            </Col>
                        </Row>
                        </FormGroup>

                        <FormGroup>
                        <Row>
                                <Col size="sm-6" className="align-self-center">
                            <Label text="Email"/>
                            <Input 
                                name="Email"
                                value={this.state.email}
                                onChange={this.handleInputChange}
                                type="text"
                            />
                            </Col>
                        </Row>
                        </FormGroup>

                        <FormGroup>
                        <Row>
                                <Col size="sm-6" className="align-self-center">
                            <Label text="Admin"/>
                            <Dropdown
                            name="admin"
                            value={this.state.admin}
                            onChange={this.handleInputChange}
                            key={this.state.user_id}
                            >
                            <Option text="Should they be an Admin?"/>
                            <Option text="Yes" value="true"/>
                            <Option text="No"  value="false"/>
                            </Dropdown>
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
                <Row className="add-product">
                    <Col size="sm-6" className="align-self-center">
                        <h3 id="new-product">Add New Products</h3>
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