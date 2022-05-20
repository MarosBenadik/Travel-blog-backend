const router = require("express").Router();
const Contuct = require("../models/contuctUs");


router.get("/all", async (req,res)=>{
    
    const contuct = await Contuct.find({});

    res.status(200).json(contuct);
})

router.post("/add", async (req,res)=>{

    console.log(req.body)
    
    const newContuct = new Contuct({
        name: req.body.name,
        email: req.body.email,
        message: req.body.message,
    });
    try{
        const savedContuct = await newContuct.save();
        res.status(200).json(savedContuct);

    } catch (err) {
        res.status(500).json(err.message);
    }
})


module.exports = router;