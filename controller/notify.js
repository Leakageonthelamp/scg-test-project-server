const Notify = require("../models/notification");

module.exports = {
  index: async (req, res, next) => {
    const allNotify = await Notify.find({});
    res.status(200).json(allNotify);
  },

  deleteNotify: async (req, res, next) => {
    const { notifyId } = req.value.params;
    const result = await Notify.findByIdAndDelete(notifyId);
    if (!result) {
      return res.status(404).json({ error: "This Notify Id does not exist!" });
    }

    res.status(200).json({ success: true });
  },
};
