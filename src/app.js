const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Definição de Rotas
const indexRoutes = require("./routes/indexRoute");
const gamesRoutes = require("./routes/gamesRoutes");
const usersRoutes = require("./routes/usersRoutes");

app.use("/games", gamesRoutes);

app.use("/users", usersRoutes);

app.use("/", indexRoutes);

module.exports = app;
