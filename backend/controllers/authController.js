const User = require("../model/auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../utils/sendMail");

// MAIL_HOST= smtp.gmail.com
// MAIL_USER= mdkhalidalam001@gmail.com
// MAIL_PASS= 

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

        const comparePassword = await bcrypt.compare(password, existingUser.password);

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

// Here Send Email with Reset Password Link
exports.SendLink = async (req, res) => {
    try{
        const { email } = req.body;

        if(!email){
            return res.status(400).json({
                success : false,
                message : "Email is required"
            })
        };

        const findUser = await User.findOne({email : email}).select(-"password");

        if(!findUser){
            return res.status(404).json({
                success : false,
                message : "User not found"
            })
        };

        const payload = {
            id : findUser.id,
            email : findUser.email
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn : "1h"
        });

        const Link = `${process.env.FRONTEND_LINK}reset-password?token=${token}`;

        const html = `Reset Password Link : <a href="${Link}">Reset Password</a>`;

        await sendEmail(findUser.email, "From Auth System", html);

        return res.status(200).json({
            success : true,
            message : "Mail send Success"
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

// Here Update password with Reset Password Link
exports.resetPassword = async (req, res) => {
    try{
        const { token } = req.query ;
        console.log(token);

        if(!token){
            return res.status(400).json({
                success : false,
                message : "Token not found..."
            })
        }

        // find password and confirm 
        const {password, confirmPassword} = req.body; 

        // password and confirm required 
        if(!confirmPassword || !password){
            return res.status(400).json({
                success : false,
                message : "Match is required..."
            })
        }

        console.log("Hit here - II")

        // password and confirm match 
        if(password !== confirmPassword){
            return res.status(400).json({
                success : false,
                message : "Password does not match"
            })
        }

        // decode token 
        let decode ; 
        try{
            decode = jwt.verify(token, process.env.JWT_SECRET);
        }
        catch(error){
            return res.status(501).json({
                success : false,
                message : "Token is expired Please generate New Token.."
            })
        }

        console.log(decode);

        console.log("Hit here - III")

        // after decoded find user 
        const findUser = await User.findOne({email : decode.email});
        console.log(findUser);

        if(!findUser){
            return res.status(404).json({
                success : false,
                message : "User Not Found, Please check your token"
            })
        }

        console.log("Hit her - 4");

        // hashed password 
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);


        const updatePassword = await User.updateOne(
            {_id : findUser.id},
            {password : hashedPassword}
        )

    
        return res.status(200).json({
            success : true,
            message : "Password forget success",
            data : updatePassword
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

// Here Update password if user Login 
exports.updatePassword = async (req, res) => {
    try{
        const { id } = req.user

        if(!id){
            return res.status(400).json({
                success : false,
                message : "User id Not Found..."
            })
        }

        const { password, confirmPassword} = req.body;

        if(!password || !confirmPassword){
            return res.status(400).json({
                success : false,
                message : "Password and Confirm Password are required"
            })
        }

        if(password !== confirmPassword){
            return res.status(400).json({
                success : false,
                message : "Password does not match"
            })
        }

        const findUser = await User.findOne({_id : id}).select("-password");

        if(!findUser){
            return res.status(404).json({
                success : false,
                message : "User Not Found..."
            })
        }

        // hashed password 
        const hashedPassword = await bcrypt.hash(password, 10);


        await User.updateMany({
            password : hashedPassword
        })

        return res.status(200).json({
            success : true,
            message : "Your Password are Update Success"
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

// here User Delete Our Account 
exports.deleteUser = async (req, res) => {
    try{

        // find User 
        const { id } = req.user;

        if(!id){
            return res.status(400).json({
                success : false,
                message : "User id Not found...."
            })
        }

        // delete using delete method 
        await User.findByIdAndDelete({
            _id : id
        }); 


        // return response
        return res.status(200).json({
            success : true,
            message : "Account Delete success full.."
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

