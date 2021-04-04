const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
      unique: true
    }
  },
  { timestamps: true }  //whenever make a new entry using this schema in DB date and time is recorded
);

module.exports = mongoose.model("Category", categorySchema);
