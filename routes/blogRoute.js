const router = require("express").Router();
const Blog = require("../models/blogs");
const slugify = require('slugify')

router.get("/all", async (req,res)=>{
    
    const blogs = await Blog.find({});

    res.status(200).json(blogs);
})

router.get("/:id", async (req, res) => {

    const blog = await Blog.findById(req.params.id)

    res.status(200).json(blog);
})

router.post("/add", async (req,res)=>{

    const newSlug = slugify(req.body.title);
    
    const newBlog = new Blog({
        title: req.body.title,
        category: req.body.category,
        slug: newSlug,
        cleverQoute: req.body.cleverQoute,
        country: req.body.country,  
        continent: req.body.continent,
        subTitle: req.body.subTitle,
        partOne: req.body.partOne,
        partTwo: req.body.partTwo,
        partThree: req.body.partThree,
        partFour: req.body.partFour,
    });
    try{
        const savedBlog = await newBlog.save();
        res.status(200).json(savedBlog);

    } catch (err) {
        res.status(500).json(err.message);
    }
})



module.exports = router;