require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./src/routes/routes");
const session = require("express-session");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");

const app = express();

app.set("view engine", "ejs");
// configuration
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(flash());
app.use(
  session({
    name: "session",
    resave: true,
    saveUninitialized: true,
    secret: process.env.SECRET_SESSION,
  })
);

app.use(routes);

app.listen(3000, () => {
  console.log(`Movie Geeks is running!`);
});
