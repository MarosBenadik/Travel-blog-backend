const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');


function generateAccessToken(id, username) {
    return jwt.sign({id, username}, process.env.JWT_SEC, { expiresIn: '1800m' });
}

function generateRefreshToken(id, username) {
    return jwt.sign({ id, username }, process.env.JWT_SEC, { expiresIn: '1800m'});
}

//Login
router.post("/login", async (req,res)=>{

    try {
        if(req.body.email){
            try {
                const user = await User.findOne({email:req.body.email});
                const validPassword = await bcrypt.compare(req.body.password, user.password);

                if(validPassword === true){
                    const token = generateAccessToken({ id: user._id, username: user.username});
                    const refreshToken =  generateRefreshToken({ id: user._id, username: user.username})
        
                    const { password, ...user_info} = user._doc;

                    res.status(200).json({user_info, tokens: { refreshToken: refreshToken, accessToken: token}});
                }else{
                        res.status(404).send({message: "Wrong password"});
                    }
                } catch {
                    res.status(404).send({message: "user not found"});
                }
            } else { 
                res.status(404).send({message: "Email Required"});
        }
    } catch (err){
        res.status(500).send({message: "Something Went Wrong"});
    }
})

router.post("/register", async (req, res) => {

    try{
        if (req.body.password === req.body.password1) {
            // generate password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            // generate user 
            const NewUser = new User({
                username:req.body.username,
                email:req.body.email,
                password:hashedPassword,
            });
            // save user 
            const user = await NewUser.save();

            const token = generateAccessToken({ id: user._id, username: user.username });

            res.status(200).json({user, token});
        } else {
            res.status(404).send({message: "Password does not match!"});
        }

        } catch(err) {
            res.status(500).json(err.message);
        }
    } 
);


router.post("/verify", async (req,res)=>{

    const token = req.body.token;

    try {
        jwt.verify( token, process.env.JWT_SEC, (err, verifiedJwt) => {
            if(err){
                res.status(500).json(err)
            } else {
                const data = verifiedJwt;
                const token = generateAccessToken({ id: verifiedJwt.id.id, username: verifiedJwt.id.username});
                res.status(200).json({token: token});
            } 
        })       
    } catch (err){
        res.status(500).send({message: err});
    }
})


module.exports = router;