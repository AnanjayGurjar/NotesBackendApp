const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config

const signup = async (req, res) => {
    
    const {username, email, password} = req.body;

    
    try {
        //check if the user already exist or not
        const existingUser = await userModel.findOne({email: email});
        if(existingUser){
            return res.status(400).json({message: "User already exists"});
        }

        //encrypt the password
        const encrptPassword = await bcrypt.hash(password, 10);
        
        //user creation
        const user = await userModel.create({
            email: email,
            password: encrptPassword,
            username: username
        });

        //token generation
        const token = jwt.sign({email: user.email, id: user._id}, process.env.SECRET_KEY);      //_id is the id given by the mongodb to the user
        res.status(201).json({user: user, token: token});

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong"});
    }
}

const signin = async (req, res ) => {

    const {email, password} = req.body;

    
    try {
        //check if the user already exist or not
        const existingUser = await userModel.findOne({email: email});
        if(!existingUser){
            return res.status(404).json({message: "User doesn't exist, please signup"});
        }

        //encrypt the password to compare with database
        const matchedPassword = await bcrypt.compare(password, existingUser.password);
        
        if(!matchedPassword){
            return res.status(400).json({message: "Incorrect password, please check"});
        }

        //token generation
        const token = jwt.sign({email: existingUser.email, id: existingUser._id}, process.env.SECRET_KEY);      //_id is the id given by the mongodb to the user
        res.status(200).json({user: existingUser, token: token});

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong"});
    }

}


module.exports = {signup, signin};