const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  productName: { type: String },
  description: { type: String, default: "This product have no description" },
  type: { type: String },
  price: { type: Number },
  productImgUrl: { type: String, default: "" },
});

const product = mongoose.model("product", productSchema);
module.exports = product;
