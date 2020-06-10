import React, { Component } from "react";
import { Link } from "react-router-dom";
class Navbar extends Component {
    render() {
    return (
        <nav className="navbar navbar-expand-lg bg-dark">
            <Link className="navbar-brand" to="/home">
                Home
            </Link>

            <button className="navbar-toggler" type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link to="/login" className={window.location.pathname === "/login" ? "nav-link active" : "nav-link"}>
                            Sign In
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link to="/register" className={window.location.pathname === "/register" ? "nav-link active" : "nav-link"}>
                            Register
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link to="/products" className={window.location.pathname === "/products" ? "nav-link active" : "nav-link"}>
                            Products
                        </Link>
                    </li>

                    
                </ul>
            </div>
        </nav>
    )
    }
} export default Navbar;