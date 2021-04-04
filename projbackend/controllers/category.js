const Category = require("../models/category");

exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, cate) => {
    if (err) {
      return res.status(400).json({
        error: "Category not found in DB"
      });
    }
    req.category = cate;
    next();
  });
};

exports.createCategory = (req, res) => {
  const category = new Category(req.body);  //....Category(req... **this is model which we are taking from front end**
  category.save((err, category) => {   //we are creating a object of Category as category
    if (err) {
      return res.status(400).json({
        error: "NOT able to save category in DB"
      });
    }
    res.json({ category });
  });
};


exports.getCategory = (req, res) => {
    return res.json(req.category);   //as we have all used a middleware which brings it (getCategoryById)
  };
  
  exports.getAllCategory = (req, res) => {
    Category.find().exec((err, categories) => {
      if (err) {
        return res.status(400).json({
          error: "NO categories found"
        });
      }
      res.json(categories);
    });
  };

  exports.updateCategory = (req, res) => {
    const category = req.category;    //from middleware (getCategoryById)
    category.name = req.body.name;   //cheking model and writing what we want to update (category.name)  **req.body.name is from the frontend or postman**
  
    category.save((err, updatedCategory) => {
      if (err) {
        return res.status(400).json({
          error: "Failed to update category"
        });
      }
      res.json(updatedCategory);
    });
  };

  
exports.removeCategory = (req, res) => {
    const category = req.category;    //by the help of middelware (getCategoryById)
  
    category.remove((err, category) => {   //remove method given by mongoose
      if (err) {
        return res.status(400).json({
          error: "Failed to delete this category"
        });
      }
      res.json({
        message: `${category} category was Successfull deleted`
      });
    });
  };