const express = require("express");
const router = express.Router();

const { getUserById, getUser, updateUser, userPurchaseList } = require("../controllers/user");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");

router.param("userId", getUserById);

router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);  //all routes assocaited with user we will preifx /user
// router.get("/users", getAllUsers); 
router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser);  //all routes assocaited with user we will preifx /user
router.put("/user/:userId", isSignedIn, isAuthenticated, userPurchaseList);  //all routes assocaited with user we will preifx /user


module.exports = router;
