const router = require("express-promise-router")();
const ProductsController = require("../controller/products");
const {
  validateParam,
  validateBody,
  schemas,
} = require("../helpers/routeHelpers");

router
  .route("/")
  .get(ProductsController.index)
  .post(validateBody(schemas.productSchema), ProductsController.newProduct);

router
  .route("/:productId")
  .get(
    validateParam(schemas.idSchema, "productId"),
    ProductsController.getProductById
  )
  .put(
    [
      validateParam(schemas.idSchema, "productId"),
      validateBody(schemas.productSchema),
    ],
    ProductsController.editProduct
  )
  .delete(
    validateParam(schemas.idSchema, "productId"),
    ProductsController.deleteProduct
  );

module.exports = router;
