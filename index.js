const express = require('express');
const app = express();
var ip = require('ip');
require('dotenv').config();
const mongoose = require("mongoose");
const cors = require('cors')

const bodyParser = require('body-parser')

const blogRoute = require('./routes/blogRoute');
const contactRoute = require('./routes/contactUs');
const questionRoute = require('./routes/question');
const answerRoute = require('./routes/answers');
const userRoute = require('./routes/userRoute');
const journyRoute = require('./routes/ourJourny');

const port = process.env.PORT || 8800;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", " http://localhost:3000"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,

}
app.use(cors(corsOptions));

mongoose.connect(process.env.DB, {useNewUrlParser: true},()=>{
    console.log("Connected to MongoDB")
});

app.use(bodyParser.json({limit: '60mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));


app.use("/blogs", blogRoute);
app.use("/contuct-us", contactRoute);
app.use("/questions", questionRoute);
app.use("/answers", answerRoute);
app.use("/user", userRoute);
app.use("/journy", journyRoute);

app.get("/", async (req, res) => {
    res.status(200).send('<h1 style=" margin: auto; width: 50%; height: 50%; border: 3px solid green; padding: 50px; text-align: center;">Travel Blog Server is running</h1>');
})

app.listen(port, () => {
    console.log(`App listening at ${ip.address()}:${port}`);
});