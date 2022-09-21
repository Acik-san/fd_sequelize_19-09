const express = require("express");
const app = express();
const router = require("./router");
const handlErrors = require("./midllewares/handle.errors.mw");

app.use(express.json());

app.use("/api", router);

app.use(handlErrors);

module.exports = app;
