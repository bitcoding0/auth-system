const User = require("../model/user");
const bcrypt = require('bcryptjs');

// signup or register a new user
exports.signup = async (req, res) => {
    try{

        const { name, email, password, role } = req.body;

        if(!name || !email || !password || !role){
            return res.status(400).json({
                success : false,
                message : "Please provide all the required fields"
            })
        };

        // check if user already exists
        const userExits = await User.findOne({ email : email });

        if(userExits){
            return res.status(400).json({
                success : false,
                message : "User Already Exists"
            })
        }

        // Password encryption
        const hashedPassword = await bcrypt.hash(password, 10);

        // create a new user 
        const newUser = await User.create({
            name, 
            email,
            password : hashedPassword,
            role
        });

        res.status(200).json({
            success : true,
            message : "User Created Successfully",
            data : {
                name : newUser.name,
                email : newUser.email,
                role : newUser.role
            }
        })
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success : false,
            message : "Something went wrong"
        })
    }
}