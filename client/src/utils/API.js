import axios from "axios";

export default {
  register: function (user) {
    return axios.post("/api/register", user);
  },
  login: function (user) {
    return axios.post("/api/login", user);
  },
  isAuthorized: function () {
    return axios.get("/api/authorized");
  },
  logout: function () {
    return axios.get("/api/logout");
  },
  availableUN: function (username) {
    return axios.get("/api/user/?username=" + username);
  },

  getProducts: function () {
    return axios.get("/api/products");
  },
  getUsers: function () {
    return axios.get("/api/admin");
  },
  deleteUser: function (id) {
    return axios.delete("/api/admin" + id)
  },

  editUser: function (id) {
    return axios.put("/api/admin" + id);
  }
};
