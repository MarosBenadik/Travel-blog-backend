const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required: true,
        min:3,
        max:20,
        unique:true
    },
    email:{
        type:String,
        required: true,
        max:50,
        unique:true
    },
    password:{
        type:String,
        required:true,
        min:6,
        max:50,
        unique:true
    },
    profilePicture:{
        type:String,
        default:""
    },
    blogs:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog"
    }],
    bio:{
        type:String,
        default:"Not Provided",
        max:50,
    },
},
{timestamps:true}
);

module.exports = mongoose.model("User", UserSchema);