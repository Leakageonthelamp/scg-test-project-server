const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notifySchema = new Schema({
  productName: { type: String },
  machineName: { type: String },
  machineId: { type: String },
  itemQty: { type: Number },
});

const notify = mongoose.model("notify", notifySchema);
module.exports = notify;
