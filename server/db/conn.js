const mongoose = require("mongoose");

// const DB =
//   "mongodb+srv://vishalmishra4444:vishalmishra@cluster0.3yqcd.mongodb.net?retryWrites=true&w=majority&appName=Cluster0";
const DB = "mongodb://localhost:27017/mernStack";

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.log("Could not connect to MongoDB atlas...", err));
