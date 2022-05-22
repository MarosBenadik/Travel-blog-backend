const mongoose = require("mongoose");

const AnswersSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
        max:80,
    },
    message:{
        type:String,
        max: 3000
    },
    answered: {
        type: Boolean,
        required: true,
        default: false,
    },
},
{timestamps:true}
)

module.exports = mongoose.model("Answers", AnswersSchema);