var express = require("express");
var router = express.Router();
const { response } = require("../app");
var adminHelpers = require("../helpers/admin-helpers");
var session = require("express-session");

/* GET users listing. */
router.get("/", function (req, res) {
  let adminData = req.session.admin;
  if (req.session.adminLoggedIn) {
    adminHelpers.getAllUser().then((users) => {
      res.render("admin/all-users", { users,login:req.session.adminLoggedIn,admin:true,adminData});
    });
  } else {
    res.redirect("/admin/admin-login");
  }
});

router.get("/admin-login", function (req, res) {
  if (req.session.adminLoggedIn) {
    res.redirect("/admin");
  } else {
    res.render("admin/admin-login", { loginErr: req.session.loginErr });
    req.session.loginErr = false;
  }
});

router.post("/admin-login", function (req, res) {
  adminHelpers.doLogin(req.body).then((response) => {
    if (response.status) {

      req.session.adminLoggedIn = true;
      req.session.admin = response.admin;
      res.redirect("/admin");

    } else {
      req.session.loginErr = true;
      res.redirect("/admin/admin-login");
    }
  });
});


router.get("/admin-logout", function (req, res) {
  req.session.destroy();
  res.redirect("/admin/admin-login");
});


router.get("/add-users", function (req, res) {
  if (req.session.adminLoggedIn) {
    res.render("admin/add-users", { addFail: req.session.addFail,admin:true});
    req.session.addFail = false;
  } else {
    res.redirect("admin/admin-login");
  }
});


router.post("/add-users", function (req, res) {
  console.log(req.body);
  adminHelpers.addUsers(req.body).then((response) => {
    if (response.status) {
      console.log("user added successfully");
      res.redirect("/admin");
    } else {
      req.session.addFail = true;
      res.redirect("/admin/add-users");
    }
  });  
});


router.get("/delete-user/:id", function (req, res) {
  //userId = req.params.id;
  adminHelpers.deleteUsers(req.params.id).then(() => {
    res.redirect("/admin");
  });
});


router.get("/edit-user/:id", async (req, res) => {
  if(req.session.adminLoggedIn){

  let user = await adminHelpers.getUserdetails(req.params.id);
  console.log(user);
 
  
  res.render("admin/edit-user", { user, admin:true });
  }else{
    res.redirect('/admin')
  }
});


router.post("/edit-user/:id", (req, res) => {
  adminHelpers.updateUser(req.params.id, req.body).then(() => {
    res.redirect("/admin");
  });
});


module.exports = router;
