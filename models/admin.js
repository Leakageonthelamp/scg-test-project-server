const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminSchema = new Schema({
  account: { type: String },
  password: { type: String },
});

const admin = mongoose.model("admin", adminSchema);
module.exports = admin;
