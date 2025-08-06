const User = require("../model/user");

// signup or register a new user
exports.signup = async (req, res) => {
    try{

    }
    catch(error){
        res.status(500).json({
            success : false,
            message : "Something went wrong"
        })
    }
}