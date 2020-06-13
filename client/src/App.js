import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import API from "./utils/API";
import Products from "./pages/Products";
import Navbar from "../src/components/Navbar/index";
import Admin from "./pages/Admin";



class App extends Component {
  state = {
    authorized: false
  };

  componentDidMount() {
    this.isAuthorized();
  }

  isAuthorized = () => {
    API.isAuthorized()
      .then(res => {
        if (res.data.message) {
          this.setState({ authorized: false });
        } else {
          this.setState({ authorized: true });
        }
      })
      .catch(err => {
        console.log(err);
        this.setState({ authorized: false });
      });
  };

  logout = () => {
    API.logout()
      .then(res => {
        console.log("logged out");
        this.isAuthorized();
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <Router>
        <Navbar logout={this.logout} />
          <Switch>
            <Route exact path="/">
              {this.state.authorized ? (
                <Home logout={this.logout} />
              ) : (
                <Redirect to="/login" />
              )}
            </Route>
            <Route exact path="/login">
              {this.state.authorized ? (
                <Redirect to="/" />
              ) : (
                <Login isAuthorized={this.isAuthorized} />
              )}
            </Route>
            <Route exact path="/register">
              {this.state.authorized ? (
                <Redirect to="/" />
              ) : (
                <Register isAuthorized={this.isAuthorized} />
              )}
            </Route>
            <Route exact path="/products">
              {this.state.authorized ? (
                <Products />
              ) : (
                <Redirect to="/login" />
              )}
            </Route>
            <Route exact path="/admin">
              {this.state.authorized ? (
                <Admin />
              ) : (
                <Redirect to="/login" />
              )}
            </Route>
            <Route>
              <Redirect to="/" />
            </Route>
          </Switch>
        
      </Router>
    );
  }
}

export default App;
