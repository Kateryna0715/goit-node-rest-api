const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("colors");

const path = require("path");
const configPath = path.join(__dirname, ".env");
require("dotenv").config({ path: configPath });

const contactsRouter = require("./routes/contactsRouter.js");
const connectDb = require("./config/connectDB.js");

const app = express();

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

connectDb();

const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(`Server is running. Use our API on port: ${PORT}`.green.bold);
});
