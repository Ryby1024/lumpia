const passport = require("passport");
const express = require("express");
const router = express.Router();
const db = require("./models");
var isAuthenticated = require("./config/middleware/isAuthenticated");

router.post("/api/register", function(req, res) {
  console.log("registering user");

  //Do password validation here before attempting to register user, such as checking for password length, captial letters, special characters, etc.

  db.User.register(
    new db.User({ username: req.body.username, email: req.body.email }),
    req.body.password,
    function(err, user) {
      if (err) {
        console.log(err);
        return res.json(err);
      }
      passport.authenticate("local")(req, res, function(data) {
        res.json(req.user);
      });
    }
  );
});

router.post("/api/login", function(req, res, next) {
  passport.authenticate("local", function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.json(info);
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      return res.json(user);
    });
  })(req, res, next);
});


// Adding Products to the database
router.post("/api/admin/products", function(req, res) {
 db.Product.create({name: req.body.name, image: req.body.image, price: req.body.price, quantity: req.body.quantity})
 .then(function(dbProduct){
   return db.User.findOneAndUpdate({_id: req.user._id}, {$set: {product: dbProduct._id}})
 })
 .then(function(dbUser){
   res.json(dbUser)
 })
 .catch(function(err){
   console.log(err);
   res.json(err)
 });
});
 


router.get("/api/logout", function(req, res) {
  req.logout();
  res.json({ message: "logged out" });
});


router.get("/api/user", function(req, res) {
  console.log("available username");
  if (req.query.username) {
    db.User.find({ username: req.query.username })
      .then(result => {
        res.json({ length: result.length });
      })
      .catch(err => res.status(422).json(err));
  } else {
    res.json({ message: "no username entered for query" });
  }
});

router.get("/api/authorized", isAuthenticated, function(req, res) {
  res.json(req.user);
});

// Getting all the users from the database
router.get("/api/admin", isAuthenticated, function(req, res) {
 db.User.find({})
 .then(function(allUsers){
   res.json(allUsers);
   console.log(allUsers)
 })
 .catch(function(err) {
   res.json(err)
 });
});

// Getting a single users info from the database
router.get("/api/admin/users/:id", isAuthenticated, function(req, res) {
  db.User.findOne({_id: req.params.id})
  .then(currentUser => {
    res.json(currentUser)
    console.log("got the user")
    console.log(currentUser);
  })
  .catch(function(err) {
    res.json(err);
  })
})

router.get("/api/products", isAuthenticated, function(req, res) {
  db.Product.find({})
  .then(function(allProducts){
    res.json(allProducts)
    console.log(allProducts);
  })
  .catch(function(err){
    res.json(err)
  });
});


// Editing a users info
router.put("/api/admin/edit", isAuthenticated, function (req, res) {
  console.log(req.body._id)
  db.User.findByIdAndUpdate({ _id: req.body._id }, req.body, { new: true })
  .then(function(data) {
    console.log(data);
    res.json(data);
  })
  .catch(function(err){
    res.json(err)
  })
})

module.exports = router;
