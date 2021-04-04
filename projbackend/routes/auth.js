var express = require("express");
var router = express.Router();   //using express router therefore require it 
const { check, validationResult } = require("express-validator");
const { signout, signup, signin } = require("../controllers/auth");  //getting controllers

router.post("/signup",
    [check("name", "name should be at least 3 char").isLength({ min: 3 }),   //we have required check at the lop **express validators**
      check("email", "email is required").isEmail(),
      check("password", "password should be at least 3 char").isLength({ min: 3 })],
    signup
  );
  
router.get("/signout", signout);

router.post("/signin",
    [ check("email", "email is required").isEmail(),  //we have required check at the lop **express validators**
      check("password", "password is required").isLength({ min: 1 })],
    signin
  );



module.exports = router;   //sending router out of this file
