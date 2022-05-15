const express = require('express');
const app = express();
var ip = require('ip');
require('dotenv').config();
const mongoose = require("mongoose");

const blogRoute = require('./routes/blogRoute');

const port = process.env.PORT || 8800;

mongoose.connect(process.env.DB, {useNewUrlParser: true},()=>{
    console.log("Connected to MongoDB")
});

app.use(express.json());


app.use("/blogs", blogRoute)

app.listen(port, () => {
    console.log(`App listening at ${ip.address()}:${port}`);
});