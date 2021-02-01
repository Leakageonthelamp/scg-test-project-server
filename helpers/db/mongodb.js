const mongoose = require("mongoose");

const initDB = () => {
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .catch((err) => {
      console.log("error: ", err.stack);
      process.exit(1);
    });
  mongoose.connection.on("open", () => {
    console.log("connected to the database!");
  });
};

mongoose.Promise = global.Promise;
module.exports = initDB;
