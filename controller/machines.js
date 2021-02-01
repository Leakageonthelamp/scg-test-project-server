const Machine = require("../models/machine");
const Product = require("../models/product");
const Item = require("../models/item");
const Notify = require("../models/notification");

module.exports = {
  index: async (req, res, next) => {
    const allMachines = await Machine.find({});
    res.status(200).json(allMachines);
  },

  newMachine: async (req, res, next) => {
    const newMachine = new Machine(req.value.body);
    const machine = await newMachine.save();
    res.status(201).json(machine);
  },

  getMachineById: async (req, res, next) => {
    const { machineId } = req.value.params;
    const machine = await Machine.findById(machineId);
    res.status(200).json(machine);
  },

  editMachine: async (req, res, next) => {
    //req.body must contain all the field in db
    const { machineId } = req.value.params;
    const editMachine = req.value.body;
    await Machine.findByIdAndUpdate(machineId, editMachine);
    res.status(201).json({ success: true });
  },

  updateMachine: async (req, res, next) => {
    const { machineId } = req.value.params;
    const update = req.value.body;
    await Machine.findByIdAndUpdate(machineId, update);
    res.status(201).json({ success: true });
  },

  deleteMachine: async (req, res, next) => {
    const { machineId } = req.value.params;
    const result = await Machine.findByIdAndDelete(machineId);
    if (!result) {
      return res.status(404).json({ error: "This Machine Id does not exist!" });
    }

    res.status(200).json({ success: true });
  },

  //Item management
  getMachineItems: async (req, res, next) => {
    const { machineId } = req.value.params;
    const machine = await Machine.findById(machineId).populate("items");
    res.status(200).json(machine.items);
  },

  addItem: async (req, res, next) => {
    const { machineId, productId } = req.value.params;
    const product = await Product.findById(productId);
    const { itemQty } = req.value.body;
    const newItem = new Item({
      itemQty: itemQty,
      productDetail: product,
    });
    const machine = await Machine.findById(machineId);
    machine.items.push(newItem);
    await newItem.save();
    const result = await machine.save();
    res.status(201).json(result);
  },

  addItemQty: async (req, res, next) => {
    const { machineId, itemId } = req.value.params;
    const addQty = req.body.itemQty;
    const item = await Item.findById(itemId);
    const updateQty = {
      itemQty: item.itemQty + addQty,
    };
    console.log(updateQty);
    await Item.findByIdAndUpdate(itemId, updateQty);
    res.status(201).json({
      message: `Add Item ID:${itemId} ${addQty} unit`,
      success: true,
      currentQty: updateQty.itemQty,
    });
  },

  buyItem: async (req, res, next) => {
    const { machineId, itemId } = req.value.params;
    const currentItem = await Item.findById(itemId);
    const updateItem = { itemQty: currentItem.itemQty - 1 };
    await Item.findByIdAndUpdate(itemId, updateItem);

    if (updateItem.itemQty < 10) {
      const machine = await Machine.findById(machineId);
      const newNotify = new Notify({
        productName: currentItem.productDetail.productName,
        machineName: machine.machineName,
        machineId: machine._id,
        itemQty: updateItem.itemQty,
      });
      await newNotify.save();
    }

    res.status(201).json({
      message: `Sold Item ID:${itemId} 1 unit`,
      success: true,
      currentQty: updateItem,
    });
  },

  deleteItem: async (req, res, next) => {
    const { machineId, itemId } = req.params;
    const item = await Item.findById(itemId);
    console.log(item);
    if (!item) {
      return res
        .status(404)
        .json({ error: "This Item ID:${itemId} does not exist!" });
    }

    const machine = await Machine.findById(machineId);

    await item.remove();
    machine.items.pull(item);
    await machine.save();

    res
      .status(200)
      .json({ message: `delete item ID:${itemId} success!`, success: true });
  },
};
