const mongoose = require("mongoose");

const OurJournySchema = new mongoose.Schema({
    state:{
        type:Number,
        required: true,
    },
    city:{
        type:String,
        required:true,
    },
    year:{
        type:Number,
    },
    img: {
        type: String,
    },
    desc: {
        type:String
    },
    category:{
        type:Number,
    }
},
{timestamps:true}
)

module.exports = mongoose.model("Journy", OurJournySchema);