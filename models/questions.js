const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
        max:80,
    },
    email:{
        type:String,
        required:true,
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
    category: {
        type: Number,
        enum: [1, 2, 3, 4, 5, 6, 7, 8],
        required: true
    },
    answers: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Answers"
        }
    ]
},
{timestamps:true}
)

module.exports = mongoose.model("Question", QuestionSchema);