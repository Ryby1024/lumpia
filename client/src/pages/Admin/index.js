import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/API";
import AdminProductCard from "../../components/AdminProductCard";
import { Col, Row, Container } from "../../components/Grid";
import UserCard from "../../components/UserCard";
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
    componentDidMount(){
        this.getAllUsers();
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

    

    get Users() {
        const {users} = this.state
        console.log(users);
        if (Array.isArray(users)) {
            return users.map(user => {
                console.log("got users")
                return <UserCard 
                key={user._id}
                _id={user._id}
                username={user.username}
                deleteUser={this.deleteUser}
                />
            })
        }
    }
    
    render(){
        return (
            <Container>
                <Row className="admin-stuff">
                    <Col size="sm-4" id="users">
                       {this.Users}
                    </Col>
                </Row>
            </Container>
        )
    }



}
export default Admin;