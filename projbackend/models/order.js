const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const ProductCartSchema = new mongoose.Schema({
  product: {
    type: ObjectId,     //taken it at top 
    ref: "Product"     //linked product.js 
  },
  name: String,
  count: Number,
  price: Number
});

const ProductCart = mongoose.model("ProductCart", ProductCartSchema);

const OrderSchema = new mongoose.Schema(
  {
    products: [ProductCartSchema],    //this schema is at the top  // 2 schema in one file
    transaction_id: {},
    amount: { type: Number },
    address: String,
    status:{
      type:String,
      default:"Recieved",
      enum:["Cancelled","Delivered","Shipped","Processing","Recieved"]   //when we want to restrict user to choose only these values then we use enum
    }, 
    updated: Date,
    user: {
      type: ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);

module.exports = { Order, ProductCart };
