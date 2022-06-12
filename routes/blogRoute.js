require("dotenv").config();

const router = require("express").Router();
const Blog = require("../models/blogs");
const slugify = require('slugify')

const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});

router.get("/all", async (req,res)=>{
    
    const blogs = await Blog.find({});

    res.status(200).json(blogs);
})

router.get("/:id", async (req, res) => {

    const blog = await Blog.findById(req.params.id)

    res.status(200).json(blog);
})

router.post("/add", async (req,res) =>{

    const newSlug = slugify(req.body.title);

    const c_mainImg =  req.body.mainImg;
    const c_blogImg =  req.body.blogImg;
    const c_img = req.body.img;
    const c_img1 = req.body.img1;
    const c_img2 = req.body.img2;
    const c_img3 = req.body.img3;

    const mainImg = await cloudinary.uploader
        .upload(c_mainImg)
        .then((result) => {
            return result
        })
        .catch((err) => {
            console.log("error", JSON.stringify(err, null, 2));
    })

    const blogImg = await cloudinary.uploader
        .upload(c_blogImg)
        .then((result) => {
            return result
        })
        .catch((err) => {
            console.log("error", JSON.stringify(err, null, 2));
    })

    const img = await cloudinary.uploader
        .upload(c_img)
        .then((result) => {
            return result
        })
        .catch((err) => {
            console.log("error", JSON.stringify(err, null, 2));
    })

    const img1 = await cloudinary.uploader
        .upload(c_img1)
        .then((result) => {
            return result
        })
        .catch((err) => {
            console.log("error", JSON.stringify(err, null, 2));
    })

    const img2 = await cloudinary.uploader
        .upload(c_img2)
        .then((result) => {
            return result
        })
        .catch((err) => {
            console.log("error", JSON.stringify(err, null, 2));
    })

    const img3 = await cloudinary.uploader
        .upload(c_img3)
        .then((result) => {
            return result
        })
        .catch((err) => {
            console.log("error", JSON.stringify(err, null, 2));
    })
    
    const newBlog = new Blog({
        title: req.body.title,
        category: req.body.category.id,
        slug: newSlug,
        cleverQoute: req.body.cleverQoute,
        country: req.body.country.id,  
        continent: req.body.continent.id,
        subTitle: req.body.subTitle,
        partOne: req.body.partOne,
        partTwo: req.body.partTwo,
        partThree: req.body.partThree,
        partFour: req.body.partFour,
        mainImg: mainImg.url,
        blogImg: blogImg.url,
        img: img.url,
        img1: img1.url,
        img2: img2.url,
        img3: img3.url,
    });

    console.log(newBlog);
    try{
        await newBlog.save();
        res.status(200).json({ msg: "success" });

    } catch (err) {
        res.status(500).json(err.message);
    }
})



module.exports = router;