const mongoose = require("mongoose");

const DB = "mongodb://localhost:27017/mernStack";

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.log("Could not connect to MongoDB atlas...", err));
