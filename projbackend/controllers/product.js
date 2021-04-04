const Product = require("../models/product");
const formidable = require("formidable");  //require formidable
const _ = require("lodash");  //require Lodash
const fs = require("fs");   //this is already provided by node (filestructure)**to access path of file**
// const product = require("../models/product");
const { sortBy } = require("lodash");


exports.getProductById=(req,res,next,id)=>{
    Product.findById(id)
    .populate("category")
    .exec((err, product) => {
        if (err) {
          return res.status(400).json({
            error: "Product not found"
          });
        }
        req.product = product;
        next();
      });
}


exports.createProduct = (req, res) => {
    let form = new formidable.IncomingForm();  //creation of a form **as the syntax says**
    form.keepExtensions = true;    //we want the extention of file uploaded
  
    form.parse(req, (err, fields, file) => {   //form accepts 3 parameter(err,field,files)
      if (err) {
        return res.status(400).json({
          error: "problem with image"
        });
      }
      //destructuring the the fields
      const {name,description,price,category,stock}=fields;  

      if(!name || !description || !price || !category || !stock) {  //checking whether user has given all data of model
        return res.status(400).json({
            error: "please include all fields"
        })
      }

      let product = new Product(fields);   //user provides all he fields of the product model**we are saving it into product**
                        
      //handle file here
      if (file.photo) {  //(as we are using photo)
        if (file.photo.size > 3000000) {  //checking file size 
          return res.status(400).json({
            error: "File size too big!"
          });
        }
        product.photo.data = fs.readFileSync(file.photo.path);  //this photo will have data as type "buffer"(see in models(product.js))
        product.photo.contentType = file.photo.type;  //we will send path to fs   //content type will be same as file type
      }
  
      //save to the DB
      product.save((err, product) => {
        if (err) {
          res.status(400).json({
            error: "Saving tshirt in DB failed"
          });
        }
        res.json(product);
      });
    });
  };
  
  
exports.getProduct = (req, res) => {
    req.product.photo = undefined;  //we dont give the photo bcz it loads slow (large file)
    return res.json(req.product);
  };
  
  //middleware
exports.photo = (req, res, next) => {
    if (req.product.photo.data) {                    //...photo.data...**is is another way to check whether photo has some data(if yes then go ahead)**
      res.set("Content-Type", req.product.photo.contentType);
      return res.send(req.product.photo.data);
    }
    next();
  };
  
exports.deleteProduct=(req,res)=>{
      let product=req.product;   //with the help of param :productId
    product.remove((err,deletedProduct)=>{
        if (err) {
            res.status(400).json({
              error: "Unable to delete product"
            });
          }
          res.json({
            message: "Deletion was a success",
            deletedProduct
          });
    }
)};

exports.updateProduct = (req, res) => {
    let form = new formidable.IncomingForm();  //creation of a form **as the syntax says**
    form.keepExtensions = true;    //we want the extention of file uploaded
  
    form.parse(req, (err, fields, file) => {   //form accepts 3 parameter(err,field,files)
      if (err) {
        return res.status(400).json({
          error: "problem with image"
        });
      }

      //updation code
      let product = req.product;   //user provides all he fields of the product model**we are saving it into product**
      product=_.extend(product,fields);  //using lodash      //updates the values      **fields will be updated in site the product**

      //handle file here
      if (file.photo) {  //(as we are using photo)
        if (file.photo.size > 3000000) {  //checking file size 
          return res.status(400).json({
            error: "File size too big!"
          });
        }
        product.photo.data = fs.readFileSync(file.photo.path);  //this photo will have data as type "buffer"(see in models(product.js))
        product.photo.contentType = file.photo.type;  //we will send path to fs   //content type will be same as file type
      }
  
      //save to the DB
      product.save((err, product) => {
        if (err) {
          res.status(400).json({
            error: "Saving tshirt in DB failed"
          });
        }
        res.json(product);
      });
    });
  }

  exports.getAllProducts=(req,res)=>{
    let limit=req.query.limit? parseInt(req.query.limit):8;  //taking from frontend
    let sortBy=req.query.sortBy? req.query.sortBy:"_id";  //taking from frontend

      Product.find().select("-photo").populate("category").limit(limit).sort([[sortBy,"asc"]]).exec((err,products)=>{
        if (err) {
            res.status(400).json({
              error: "No products found"
            });
          }
          res.json(products)
      })
  }

  
exports.updateStock = (req, res, next) => {    //middleware
    let myOperations = req.body.order.products.map(prod => { //as we have many products, we are looping through them each 1by1
      return {
        updateOne: {      //method of mongoose
          filter: { _id: prod._id },   //1)write what you want to filter with 
          update: { $inc: { stock: -prod.count, sold: +prod.count } }  //write what u want to update ($inc in compulsory)
        }
      };
    });
  
    Product.bulkWrite(myOperations, {}, (err, products) => {   //mongoose method (this is the syntax)
      if (err) {
        return res.status(400).json({
          error: "Bulk operation failed"
        });
      }
      next();
    });
  };
  
exports.getAllUniqueCategories=(req,res)=>{
    Product.distinct("category",{},(err,category)=>{    //mongoose method (distinct)
        if (err) {
            return res.status(400).json({
              error: "No category found"
            });
          }
          res.json(category);
    })
}