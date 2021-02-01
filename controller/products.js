const Product = require("../models/product");
// const User = require("../models/machine");

module.exports = {
  index: async (req, res, next) => {
    const allProducts = await Product.find({});
    res.status(200).json(allProducts);
  },

  newProduct: async (req, res, next) => {
    const newProduct = new Product(req.value.body);
    const product = await newProduct.save();
    res.status(201).json(product);
  },

  getProductById: async (req, res, next) => {
    const { productId } = req.value.params;
    const product = await Product.findById(productId);
    res.status(200).json(product);
  },

  editProduct: async (req, res, next) => {
    const { productId } = req.value.params;
    const newProduct = req.value.body;
    await Product.findByIdAndUpdate(productId, newProduct);
    res.status(200).json({ success: true });
  },

  deleteProduct: async (req, res, next) => {
    const { productId } = req.value.params;
    const result = await Product.findByIdAndDelete(productId);
    if (!result) {
      return res.status(404).json({ error: "This Product Id does not exist!" });
    }

    res.status(200).json({ success: true });
  },

  //   newCar: async (req, res, next) => {
  //     const seller = await User.findById(req.value.body.seller);
  //     const newCar = req.value.body;
  //     delete newCar.seller;

  //     const car = new Car(newCar);
  //     car.seller = seller;
  //     await car.save();

  //     seller.cars.push(car);
  //     await seller.save();
  //     res.status(200).json(car);
  //   },

  //   deleteCar: async (req, res, next) => {
  //     const { carId } = req.value.params;
  //     const car = await Car.findById(carId);
  //     if (!car) {
  //       return res.status(404).json({ error: "Car does not exist!" });
  //     }

  //     const sellerId = car.seller;
  //     const seller = await User.findById(sellerId);

  //     await car.remove();
  //     seller.cars.pull(car);
  //     await seller.save();

  //     res.status(200).json({ success: true });
  //   },
};
