const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const machineSchema = new Schema({
  machineName: { type: String },
  status: { type: String, default: "online" },
  location: { type: Object },
  items: [
    {
      type: Schema.Types.ObjectId,
      ref: "item",
    },
  ],
});

const Machine = mongoose.model("machine", machineSchema);
module.exports = Machine;
