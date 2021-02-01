const router = require("express").Router();
const machines = require("./machines");
const products = require("./products");
const admin = require("./admin");
const notify = require("./notify")

router.use("/machines", machines);
router.use("/products", products);
router.use("/admin", admin);
router.use("/notify", notify);

module.exports = router;
