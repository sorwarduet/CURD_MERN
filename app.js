const express = require("express");
const app = express();
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//database import
const connectDB = require("./src/config/connectDB");
connectDB();

const router = require("./src/routes/api");


app.use("/api/v1", router);
app.get("*", (req, res) => {
    res.status(404).send("Not Found")
})

module.exports = app;
