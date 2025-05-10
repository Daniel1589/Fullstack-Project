require("dotenv").config();
const express = require("express");
const cors = require("cors");
const chalk = require("chalk");

const app = express();
app.use(express.json());
app.use(cors());

const userRouter = require("../routes/userRoute");
app.use("/api/users", userRouter);

app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Something went wrong" });
});

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(process.env.PORT, () => {
  console.log(chalk.green("Express connected"));
});
