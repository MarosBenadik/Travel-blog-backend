const express = require('express');
const app = express();
var ip = require('ip');
require('dotenv').config();
const mongoose = require("mongoose");

const blogRoute = require('./routes/blogRoute');
const contactRoute = require('./routes/contactUs');

const port = process.env.PORT || 8800;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", " http://localhost:3000"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

mongoose.connect(process.env.DB, {useNewUrlParser: true},()=>{
    console.log("Connected to MongoDB")
});

app.use(express.json());


app.use("/blogs", blogRoute);
app.use("/contuct-us", contactRoute);

app.listen(port, () => {
    console.log(`App listening at ${ip.address()}:${port}`);
});