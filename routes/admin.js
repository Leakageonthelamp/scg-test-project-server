const router = require("express-promise-router")();
const AdminController = require("../controller/admin");
const {
  validateParam,
  validateBody,
  schemas,
} = require("../helpers/routeHelpers");

router
  .route("/signup")
  .post(validateBody(schemas.signupSchema), AdminController.signup);

router.route("/login").post(AdminController.login);

router.route("/logout").delete(AdminController.logout);

module.exports = router;
