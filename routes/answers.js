const router = require("express").Router();
const Answers = require("../models/answers");


router.get("/:id/all", async (req,res)=>{
    
    const questions = await Answers.findById(req.params.id);

    res.status(200).json(questions);
})

router.post("/add", async (req,res)=>{
    
    const newAnswers = new Answers({
        name: req.body.name,
        message: req.body.message,        
    });
    try{
        const savedAnswers = await newAnswers.save();
        res.status(200).json(savedAnswers);

    } catch (err) {
        res.status(500).json(err.message);
    }
})


module.exports = router;