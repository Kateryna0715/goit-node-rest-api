const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const { mongoUrl, port } = require("./configs/serverConfig.js");
const contactsRouter = require("./routes/contactsRouter.js");

const app = express();

mongoose.Promise = global.Promise;

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});
app.listen(port, () => {
  console.log("Server is running. Use our API on port: 3000");
});
