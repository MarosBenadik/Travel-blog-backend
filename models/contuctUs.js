const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
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
    }
},
{timestamps:true}
)

module.exports = mongoose.model("Contact", ContactSchema);