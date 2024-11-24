require("dotenv").config();
const express = require("express");
const cors = require("cors");
require("./db/conn");
const router = require("./routes/router");

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);

const PORT = process.env.PORT || 8003;

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
