const express = require("express");
const app = express();
const session = require("express-session");
const flash = require("express-flash");
const cookieParser = require("cookie-parser");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Seções, Flash e cookie parser
const APP_SECRET_KEY_SESSION = process.env.APP_SECRET_KEY_SESSION;
const APP_SECRET_KEY_COOKIEPARSER = process.env.APP_SECRET_KEY_COOKIEPARSER;

app.use(cookieParser(APP_SECRET_KEY_COOKIEPARSER));
app.use(session({
  secret: APP_SECRET_KEY_SESSION,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60 * 60 * 1000 }
}));

app.use(flash());

// Definição de Rotas
const indexRoutes = require("./routes/indexRoute");
const adminRoutes = require("./routes/adminRoutes");
const gamesRoutes = require("./routes/gamesRoutes");
const usersRoutes = require("./routes/usersRoutes");

app.use("/", adminRoutes);
app.use("/", gamesRoutes);
app.use("/", usersRoutes);
app.use("/", indexRoutes);

module.exports = app;
