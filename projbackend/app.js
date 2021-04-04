require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");    //what ever value is comming from /admin etc it handles that.**gives req.body property**
const cookieParser = require("cookie-parser");   //needed when we want to put or take something from cookie
const cors = require("cors");    //allows us to make request from other domains like postman 



const authRoutes = require("./routes/auth");   //bringing router into this file
const userRoutes = require("./routes/user");   //bringing router into this file
const categoryRoutes = require("./routes/category");   //bringing router into this file
const productRoutes = require("./routes/product");   //bringing router into this file
const orderRoutes = require("./routes/order");   //bringing router into this file
const stripeRoutes =require("./routes/stripepayment")




//DB Connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log("DB CONNECTED");
  });

//Middlewares
app.use(bodyParser.json());   //what ever value is comming from /admin etc it handles that.**gives req.body property**
app.use(cookieParser());    //needed when we want to put or take something from cookie
app.use(cors());       //allows us to make request from other domains like postman 

//My Routes
app.use("/api", authRoutes);    //if user needs to interact with backend he needs to visit /api **first we are working on authentication routes and we want to prefix it with api**
app.use("/api", userRoutes);    //if user needs to interact with backend he needs to visit /api **first we are working on user routes and we want to prefix it with api**
app.use("/api", categoryRoutes);    //if user needs to interact with backend he needs to visit /api **first we are working on category routes and we want to prefix it with api**
app.use("/api", productRoutes);    //if user needs to interact with backend he needs to visit /api **first we are working on product routes and we want to prefix it with api**
app.use("/api", orderRoutes);    //if user needs to interact with backend he needs to visit /api **first we are working on product routes and we want to prefix it with api**
app.use("/api", stripeRoutes);    //if user needs to interact with backend he needs to visit /api **first we are working on product routes and we want to prefix it with api**




//PORT
const port = process.env.PORT || 8000;

//Starting a server
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});
