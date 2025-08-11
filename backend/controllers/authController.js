
const User = require("../model/auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
    try{
        const { name, email, accountType, password, confirmPassword } = req.body;

        if(!name || !email || !password || !confirmPassword || !accountType) {
            return res.status(400).json({
                success : false,
                message : "All field are required."
            })
        }; 

        if(password !== confirmPassword){
            return res.status(400).json({
                success : false,
                message : "Password does not match"
            })
        }

        const existingUser = await User.findOne({email : email}); 

        if(existingUser){
            return res.status(406).json({
                success : false,
                message : "Your account already exits please login"
            })
        }

        // hashed 
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email, 
            password : hashedPassword,
            accountType
        });

        return res.status(200).json({
            success : true,
            message : "Account successfully created",
            data : {
                name : newUser.name,
                email : newUser.email,
                accountType : newUser.accountType
            }
        })

    }
    catch(error){
        return res.status(500).json({
            success : false,
            message : "Server Error" ,
            error : error
        })
    }
}

exports.login = async (req, res) => {
    try{
        const { email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                success : false,
                message : "All field are required"
            })
        }

        const existingUser = await User.findOne({email});

        if(!existingUser){
            return res.status(400).json({
                success : false,
                message : "Your account are not create Please create Message"
            })
        }

        const comparePassword = bcrypt.compare(existingUser.password, password);

        if(!comparePassword){
            return res.status(400).json({
                success : false,
                message : "Password Invalid"
            })
        }

        const payload = {
            id : existingUser.id,
            email : existingUser.email,
            accountType : existingUser.accountType,
            name : existingUser.name
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn : "1h"
        });


        return res.status(200).json({
            success : true,
            message : "User Login Success",
            token : token,
            data : {
                name : existingUser.name,
                email : existingUser.email,
                accountType : existingUser.accountType
            }
        })

    }
    catch(error){
        return res.status(500).json({
            success : false,
            message : "Server Error" ,
            error : error
        })
    }
}

exports.getUser = async (req, res) => {
     try{

        const { id } = req.user ; 

        if(!id) {
            return res.status(404).json({
                success : false,
                message : "user Id Undefined"
            })
        }

        const userDetails = await User.findById({_id : id}).select("-password");

        return res.status(200).json({
            success : false,
            message : "User Details",
            data : userDetails
        });

    }
    catch(error){
        return res.status(500).json({
            success : false,
            message : "Server Error" ,
            error : error
        })
    }
}

exports.deleteUser = async (req, res) => {
    try{

    }
    catch(error){
        return res.status(500).json({
            success : false,
            message : "Server Error" ,
            error : error
        })
    }
}

