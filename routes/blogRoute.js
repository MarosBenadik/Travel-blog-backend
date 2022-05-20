const router = require("express").Router();
const Blog = require("../models/blogs");


router.get("/all", async (req,res)=>{
    
    const blogs = await Blog.find({});

    res.status(200).json(blogs);
})

router.post("/add", async (req,res)=>{
    
    const newBlog = new Blog({
        title: req.body.title,
        category: req.body.category,
        continent: req.body.continent,
        subTitle: req.body.subTitle,
        partOne: req.body.partOne,
        partTwo: req.body.partTwo,
        partThree: req.body.partThree
    });
    try{
        const savedBlog = await newBlog.save();
        res.status(200).json(savedBlog);

    } catch (err) {
        res.status(500).json(err.message);
    }
})



module.exports = router;