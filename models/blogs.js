const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true,
        max:50,
    },
    category:{
        type:Number,
        required:true,  
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    likes:{
        type: Number,
        default: 0
    },
    continent:{
        type:Number,
        required: true,
    },
    cleverQoute:{
        type:String
    },
    subTitle:{
        type:String,
        required: true,
        max: 350
    },
    country:{
        type:Number,
        required:true
    },
    partOne:{
        type:String,
        max: 6000
    },
    partTwo:{
        type:String,
        max: 6000
    },
    partThree:{
        type:String,
        max: 6000
    },
    partFour:{
        type:String,
        max: 6000
    },
    mainImg:{
        type:String,
    },
    blogImg:{
        type:String,
    },
    img:{
        type:String,
    },
    img1:{
        type:String,
    },
    img2:{
        type:String,
    },
    img3:{
        type:String,
    },
},
{timestamps:true}
)

module.exports = mongoose.model("Blog", BlogSchema);