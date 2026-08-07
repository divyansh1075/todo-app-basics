import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import dotenv from 'dotenv';

dotenv.config();

export const signup = async(req, res) => {

    const {name, email, password} = req.body;

    try{
        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(400).json({
                message: "User already exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name: name, 
            email: email, 
            password: hashedPassword
        })

        res.status(201).json({
            message: "New user created", 
            user
        });

    } catch(error) {
        console.log(error);
        res.status(501).json({
            message: "Server auth error"
        });
    }
}

export const signin = async(req, res) => {
    
    const {email, password} = req.body;

    try{
        const user = await User.findOne({email});
        
        if(!user){
            return res.status(400).json({
                message: "Invalid credentials"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }

        const token = jwt.sign( {id : user._id}, process.env.JWT_SECRET );
        
        res.status(201).json({
            message : "User exists and jwt created and sent",
            token,
            user : {
                name : user.name,
                id : user._id,
                email : user.email
            }
        });

    } catch(error){
        console.log(error);
        res.status(501).json({
            message: "Internal server error."
        })
    }

}