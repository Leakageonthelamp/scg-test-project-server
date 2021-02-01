const Admin = require("../models/admin");
const bcrpyt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  signup: async (req, res, next) => {
    const newAdmin = new Admin({
      account: req.value.body.account,
      password: bcrpyt.hashSync(req.value.body.password, 10),
    });
    await newAdmin.save();
    res.status(201).json({ message: "sign up success!" });
  },

  login: async (req, res, next) => {
    console.log(req.body);
    const result = await Admin.findOne({ account: req.body.account });
    if (!result) {
      res
        .status(200)
        .json({ message: "admin cannot found in database", error: true });
    }

    if (!bcrpyt.compareSync(req.body.password, result.password)) {
      res.status(200).json({ message: "Wrong Password", error: true });
    }

    //All good create jwt token
    const token = jwt.sign({ adminId: result._id }, "secretKey");
    res.status(200).json({
      admin: result.account,
      token: token,
      error: false,
    });
  },

  logout: async (req, res, next) => {
      res.status(200).json({ message: "logout" })
  }
};
