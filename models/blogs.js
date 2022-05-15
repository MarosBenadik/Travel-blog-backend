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
    likes:{
        type: Number,
        default: 0
    },
    continent:{
        type:Number,
        required: true,
    },
    subTitle:{
        type:String,
        required: true,
        max: 350
    },
    partOne:{
        type:String,
        max: 3000
    },
    partTwo:{
        type:String,
        max: 3000
    },
    partThree:{
        type:String,
        max: 3000
    }
},
{timestamps:true}
)

module.exports = mongoose.model("Blog", BlogSchema);