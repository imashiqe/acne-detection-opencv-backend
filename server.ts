import dotenv = require("dotenv");
import path from "path";

// After (CommonJS)
const express = require("express");
const cors = require("cors");
const detectRoute = require("./routes/detect");

dotenv.config();

const app = express();

app.use(cors());
app.use("/uploads", express.static("uploads"));
app.use("/api/detect", detectRoute);
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
