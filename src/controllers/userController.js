const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../models/userModel")

exports.getUsers = asyncHandler(async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
})

exports.createUser = asyncHandler(async (req, res) => {
    try {
        const userId = await User.findOne({email: req.body.email});

        if (!userId) {
            const user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword,
                phone: req.body.phone,
                address: req.body.address,
                age: req.body.age
            })
            res.status(200).json({
                status: "success",
                data: user});
        } else {
            return res.status(400).json({status: "Failed", message: "User already exists"})
        }


    } catch (err) {
        res.status(400).json(err);
    }
});


exports.updateUser = asyncHandler(async (req, res) => {
    console.log(req.params.id)
    try {
        const user = await User.findById(req.params.id)
        if (user) {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body,
                {new: true, runValidators: true})
            res.status(200).json({status: "success", data: updatedUser})
        } else {
            res.status(400).json({status: "User not found"})
        }

    } catch (error) {

        res.status(400).json(error);
    }
})


exports.deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (user) {
        await User.findByIdAndDelete(req.params.id)

        res.status(200).json({status: "success", data: req.params.id})
    } else {
        res.status(400).json({status: "Failed", message: "User not found"})
    }
})
