const express = require("express");
const app = express();
const db = require("./db");

const bodyParsar = require("body-parser");
app.use(bodyParsar.json()); //req.body

app.get("/", function (req, res) {
  res.send("Welcome to our hotel");
});

const personRoutes = require("./routes/personRoute");
const menuRoutes = require("./routes/menuRoutes");

app.use("/person", personRoutes);
app.use("/menu", menuRoutes);

app.listen(3000, () => {
  console.log("listening on port 3000");
});
