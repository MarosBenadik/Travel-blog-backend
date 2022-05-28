const router = require("express").Router();
const Journy = require("../models/ourJourny");
const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});

router.get("/all", async (req,res)=>{
    
    const journy = await Journy.find({});

    res.status(200).json(journy);
});

router.post("/add", async (req,res) =>{

    const c_img = req.body.img;

    const img = await cloudinary.uploader
        .upload(c_img)
        .then((result) => {
            return result
        })
        .catch((err) => {
            console.log("error", JSON.stringify(err, null, 2));
    })
    
    const newJourny = new Journy({
        state: req.body.state.id,
        category: req.body.category.id,
        city: req.body.city,
        year: req.body.year,  
        desc: req.body.desc,
        img: img.public_id,
    });
    console.log(res.statusCode);
    console.log(newJourny)

    try{
        await newJourny.save();
        res.status(200).json({ msg: "success" });

    } catch (err) {
        res.status(500).json(err.message);
    }
})


module.exports = router;