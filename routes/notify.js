const router = require("express-promise-router")();
const NotifyController = require("../controller/notify");
const {
  validateParam,
  validateBody,
  schemas,
} = require("../helpers/routeHelpers");

router.route("/").get(NotifyController.index);

router
  .route("/:notifyId")
  .delete(
    validateParam(schemas.idSchema, "notifyId"),
    NotifyController.deleteNotify
  );

module.exports = router;
