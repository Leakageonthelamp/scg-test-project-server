const Joi = require("joi");

module.exports = {
  validateParam: (schema, name) => {
    return (req, res, next) => {
      console.log("req.params", req.params);
      const result = schema.validate({ param: req["params"][name] });
      if (result.error) {
        return res.status(400).json(result.error);
      } else {
        if (!req.value) req.value = {};
        if (!req.value["params"]) req.value["params"] = {};
        req.value["params"][name] = result.value.param;
        next();
      }
    };
  },

  validateBody: (schema) => {
    return (req, res, next) => {
      const result = schema.validate(req.body);
      if (result.error) {
        return res.status(400).json(result.error);
      } else {
        if (!req.value) req.value = {};
        if (!req.value["body"]) req.value["body"] = {};
        req.value["body"] = result.value;
        next();
      }
    };
  },

  schemas: {
    //machine Schema
    machineSchema: Joi.object().keys({
      machineName: Joi.string().required(),
      status: Joi.string(),
      location: Joi.object().required(),
    }),

    machineUpdateSchema: Joi.object().keys({
      machineName: Joi.string(),
      status: Joi.string(),
      location: Joi.object(),
    }),

    addItemSchema: Joi.object().keys({
      itemQty: Joi.number().required(),
    }),

    //product Schema
    productSchema: Joi.object().keys({
      productName: Joi.string().required(),
      description: Joi.string().allow(null, ""),
      type: Joi.string().required(),
      price: Joi.number().required(),
      productImgUrl: Joi.string().allow(null, ""),
    }),

    //admin Schema
    signupSchema: Joi.object().keys({
      account: Joi.string().required(),
      password: Joi.string().required(),
    }),

    idSchema: Joi.object().keys({
      param: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
    }),
  },
};
