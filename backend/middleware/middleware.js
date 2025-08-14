const express = require("express");
require("dotenv").config();
const jwt = require("jsonwebtoken");

exports.authentication = async(req, res, next) => {
    const token =
      req.body?.token ||
      req.header("Authorization")?.replace("Bearer ", "") ||
      req.cookies?.token;

    if(!token){
        return res.status(404).json({
            success : false,
            message : "Unauthorized User"
        })
    };

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch(err){
        return res.status(500).json({
            success : false,
            message : "Error verify token..."
        })
    }
}


exports.isUser = async (req, res, next) => {
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

exports.isAdmin = async (req, res, next) => {
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

exports.isHost = async (req, res, next) => {
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