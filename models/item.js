const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  itemQty: { type: Number, default: 0 },
  productDetail: { type: Object },
});

const item = mongoose.model("item", itemSchema);
module.exports = item;
