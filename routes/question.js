const router = require("express").Router();
const Questions = require("../models/questions");


router.get("/all", async (req,res)=>{
    
    const questions = await Questions.find({});

    res.status(200).json(questions);
})

router.post("/add", async (req,res)=>{


    
    const newQuestion = new Questions({
        name: req.body.name,
        email: req.body.email,
        message: req.body.message,
        category: req.body.category,
        
    });
    try{
        const savedQuestion = await newQuestion.save();
        res.status(200).json(savedQuestion);

    } catch (err) {
        res.status(500).json(err.message);
    }
})


module.exports = router;