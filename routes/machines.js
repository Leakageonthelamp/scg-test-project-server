const router = require("express-promise-router")();
const MachinesController = require("../controller/machines");
const {
  validateParam,
  validateBody,
  schemas,
} = require("../helpers/routeHelpers");

router
  .route("/")
  .get(MachinesController.index)
  .post(validateBody(schemas.machineSchema), MachinesController.newMachine);

router
  .route("/:machineId")
  .get(
    validateParam(schemas.idSchema, "machineId"),
    MachinesController.getMachineById
  )
  .put(
    [
      validateParam(schemas.idSchema, "machineId"),
      validateBody(schemas.machineSchema),
    ],
    MachinesController.editMachine
  )
  .patch(
    [
      validateParam(schemas.idSchema, "machineId"),
      validateBody(schemas.machineUpdateSchema),
    ],
    MachinesController.updateMachine
  )
  .delete(
    validateParam(schemas.idSchema, "machineId"),
    MachinesController.deleteMachine
  );

// Item menagement

router
  .route("/:machineId/getItems")
  .get(
    validateParam(schemas.idSchema, "machineId"),
    MachinesController.getMachineItems
  );

router
  .route("/:machineId/addItem/:productId")
  .post(
    [
      validateParam(schemas.idSchema, "machineId"),
      validateParam(schemas.idSchema, "productId"),
      validateBody(schemas.addItemSchema),
    ],
    MachinesController.addItem
  );

router
  .route("/:machineId/addItemQty/:itemId")
  .patch(
    [
      validateParam(schemas.idSchema, "machineId"),
      validateParam(schemas.idSchema, "itemId"),
    ],
    MachinesController.addItemQty
  );

router
  .route("/:machineId/buyItem/:itemId")
  .patch(
    [
      validateParam(schemas.idSchema, "machineId"),
      validateParam(schemas.idSchema, "itemId"),
    ],
    MachinesController.buyItem
  );

router
  .route("/:machineId/deleteItem/:itemId")
  .delete(
    [
      validateParam(schemas.idSchema, "machineId"),
      validateParam(schemas.idSchema, "itemId"),
    ],
    MachinesController.deleteItem
  );

module.exports = router;
