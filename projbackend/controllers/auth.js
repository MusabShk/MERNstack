const User = require("../models/user");  //bringing user model
const { check, validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");

exports.signup = (req, res) => {
  const errors = validationResult(req);   //this line is written as it is in docs, it binds validation with body

  if (!errors.isEmpty()) {
    return res.status(422).json({   
      error: errors.array()[0].msg    //these lines should be written as it is 
    });
  }

  const user = new User(req.body);    //whatever comes from body(req.body) 
  user.save((err, user) => {      //saving user **the field in DB will be user(...err,user)...)**
    if (err) {
      return res.status(400).json({
        err: "NOT able to save user in DB"
      });
    }
    res.json({
      name: user.name,
      email: user.email,
      id: user._id
    });
  });
};

exports.signin = (req, res) => {
  const errors = validationResult(req);   //this line is written as it is in docs, it binds validation with body
  const { email, password } = req.body;  //destructuring to get email and password

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg
    });
  }

  User.findOne({ email }, (err, user) => {  //findOne is methode of mongoose (findOne finds 1 match from database**finds the very first one**)
    if (err || !user) {
      return res.status(400).json({
        error: "USER email does not exists"
      });
    }
                                              //the (...!user...) we are using in the line below is from the method besides findOne
    if (!user.autheticate(password)) {         //here we are using the authenticate method in user model to check whether the passwowrd matches with the OG password  
      return res.status(401).json({
        error: "Email and password do not match"
      });
    }

    //create token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);  
    //put token in cookie
    res.cookie("token", token, { expire: new Date() + 9999 });

    //send response to front end
    const { _id, name, email, role } = user;  //destructuring user 
    return res.json({ token, user: { _id, name, email, role } });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "User signout successfully"
  });
};

//protected routes 
exports.isSignedIn = expressJwt({            //this is middleware but we are not writtig next() because expressJwt a;ready has it 
  secret: process.env.SECRET,
  userProperty: "auth"       //we are setting userProperty to auth whenever signedIn**also used to get the ID of user**
});


//custom middlewares
exports.isAuthenticated = (req, res, next) => {   //req.auth is from isSignedIn
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;  //creating new variable"checker" //through the frontend, we will make a property named "profile" and will only be set up when user is logged in
  if (!checker) {              //the profiles id(from frontend) (profle._id) should be==to auth._id 
    return res.status(403).json({
      error: "ACCESS DENIED"
    });
  }  
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "You are not ADMIN, Access denied"
    });
  }
  next();
};

