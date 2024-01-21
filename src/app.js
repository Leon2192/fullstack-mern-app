const express = require("express");
const morgan = require("morgan");
const authRouter = require("./routes/aurh");
const tasksRouter = require("./routes/tasks");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api", authRouter);
app.use("/api", tasksRouter);

module.exports = app;
