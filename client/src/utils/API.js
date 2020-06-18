import axios from "axios";

export default {
  register: function (user) {
    return axios.post("/api/register", user);
  },
  login: function (user) {
    return axios.post("/api/login", user);
  },

  addProduct: function (user) {
    return axios.post("/api/admin/products", user);
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

  editUser: function (data) {
    return axios.put("/api/admin/edit", data);
  },
  selectUser: function (id) {
    return axios.get("/api/admin/users/" + id);
  },

  editProduct: function (id, data) {
    return axios.put("/api/admin/products/edit/" + id, data)
  },

  selectProduct: function (id) {
    return axios.get("/api/admin/products/" + id)
  }
};
