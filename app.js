const express = require("express");
const bodyParser = require("body-parser");
// const routes = require("./src/routes/routes");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use(routes);

app.listen(3000, () => {
  console.log(`Movie Geeks is running!`);
});
