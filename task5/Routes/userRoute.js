const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../Schema/userModel');
const userValidationSchema = require('../Validation/joiSchema');

const router = express.Router();

router.post('/create', async (req,res)=>{
    try{
        const {error} = userValidationSchema.validate(req.body);
        if(error)
            return res.json({ error: error.details[0].message });
        const {email, phoneNo, age, name, password} = req.body;

        const existUser = await User.findOne({ email });
        if (existUser) 
            return res.json({ error: "Email already registered" });

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name: req.body.name,
            age: req.body.age,
            email: req.body.email,
            password: hashedPassword,
            phoneNumber: req.body.phoneNumber
        });
        await newUser.save();
        res.json({ message: "User created successfully", user: { name, email, phoneNo, age } });
    }
    catch(err){
        res.json({ error: "server error" });
    }
});

router.post('/login', async (req,res)=>{
    const {email, password } = req.body;
    const user= await User.findOne({email});
    if(!user){
        return res.json({error: 'User not found'});
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.json({ error: "Invalid password" });
    }
    res.json({msg: "Login Successfully"});
});

router.get('/page', async(req,res)=>{
    let {page, limit} = req.query;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    if(limit<0)
        res.send("error occur");
    const skip = (page-1)*limit;
    const users = await User.find().skip(skip).limit(limit);
    const totalUsers = await User.countDocuments();

    res.json({
        success: true,
        totalUsers,
        totalPages: Math.ceil(totalUsers / limit),
        currentPage: page,
        users
    });
});

module.exports = router;
