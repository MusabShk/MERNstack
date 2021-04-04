const User = require("../models/user");
const Order = require("../models/order");


exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "No user was found in DB"
      });
    }
    req.profile = user;   //we create one object named as profile
    next();
  });
};

exports.getUser = (req, res) => {
  req.profile.salt=undefined;
  req.profile.encry_password=undefined;
  req.profile.createdAt=undefined;
  req.profile.updatedAt=undefined;
  return res.json(req.profile);
};

exports.updateUser = (req, res) => {
    User.findByIdAndUpdate(
      { _id: req.profile._id },    //...profile._id.. **we are getting this from :userId which we are using in router**
      { $set: req.body },    //whatever we want to update we put it into dollar set **req.body coming from frontend** so whatever we send from frontend will be updated
      { new: true, useFindAndModify: false },
      (err, user) => {
        if (err) {
          return res.status(400).json({
            error: "You are not authorized to update this user"
          });
        }
        user.salt = undefined;
        user.encry_password = undefined;
        res.json(user);
      }
    );
  };
  
  exports.userPurchaseList = (req, res) => {
    Order.find({ user: req.profile._id })    
      .populate("user", "_id name")      //whenever u reference something in different collection (in usder model we are using purchase from differen model)
      .exec((err, order) => {      //.populate("use.."..)  here we write 2 things 1)model which you want to update 2)fields whih you want to bring in
        if (err) {
          return res.status(400).json({
            error: "No Order in this account"
          });
        }
        return res.json(order);
      });
  };

  exports.pushOrderInPurchaseList = (req, res, next) => {
    let purchases = [];   //empty array 
    req.body.order.products.forEach(product => {  //info coming from body and we will call it as order and since many items coming we are caling as products
      purchases.push({         //products is an array(we will loop through every product and push in purchases array**new array**)
        _id: product._id,
        name: product.name,
        description: product.description,
        category: product.category,
        quantity: product.quantity,
        amount: req.body.order.amount,
        transaction_id: req.body.order.transaction_id
      });
    });
  
    //store thi in DB
    User.findOneAndUpdate(    //all of this (purchases etc) are of user so we update user
      { _id: req.profile._id },
      { $push: { purchases: purchases } },  //updating local purchases with user purchases
      { new: true },   //sending new value (updated value)
      (err, purchases) => {
        if (err) {
          return res.status(400).json({
            error: "Unable to save purchase list"
          });
        }
        next();
      }
    );
  };
  

// exports.getAllUsers=(req,res)=>{
//     User.find().exec((err,users)=>{
//         if (err || !users) {
//             return res.status(400).json({
//               error: "No users found"
//             });
//           }
//           res.json(users);
//     })
// }
