const {Order,ProductCart}=require("../models/order"); //in order model,we export 2 thins (so this is the way to take both of them)

exports.getOrderById=(req,res)=>{
    Order.findById(id)
    .populate("products.product","name price")    //products.product (taking 1 product frm many**based on frontend**)**taking name & price**
    .exec((err,order)=>{
        if (err) {
            return res.status(400).json({
              error: "No order found in DB"
            });
          }
          req.order = order;
    })
}

exports.createOrder=(req,res)=>{
    req.body.order.user=req.profile;     //req.profile (getUserById)
    const order=new Order(req.body.order);  //we are creating a order(const order)
    order.save((err,order)=>{
        if (err) {
            return res.status(400).json({
              error: "failed to save order in DB"
            });
          }
          res.json(order);
    })
}

exports.getAllOrders=(req,res)=>{
    Order.find().populate("user","_id name").exec((err,order)=>{
        if (err) {
            return res.status(400).json({
              error: "failed to save order in DB"
            });
          }
          res.json(order);
    })
}

exports.getOrderStatus=(req,res)=>{
    req.json(Order.schema.path("status").enumValues);   //SYNTAX 
}

exports.updateStatus = (req, res) => {
    Order.update(
      { _id: req.body.orderId },   //locate the stuff based on Id
      { $set: { status: req.body.status } },   //set the status 
      (err, order) => {   //if all good we get call back
        if (err) {
          return res.status(400).json({
            error: "Cannot update order status"
          });
        }
        res.json(order);
      }
    );
  };
  