const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({extended: false}));

const indexRoutes = require("./routes/indexRoutes");
app.use("/", indexRoutes);

module.exports = app;
