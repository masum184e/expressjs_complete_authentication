import argon2 from 'argon2';
import { check, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

import UserModel from "../models/userSchema.js";

const userRegistration = [
    check('firstName').isAlpha().withMessage('Only alphabets are allowed'),
    check('lastName').isAlpha().withMessage('Only alphabets are allowed'),
    check('email').isEmail().withMessage('Enter a Valid Email'),
    check('phoneNumber').isNumeric().isLength({ min: 11, max: 11 }).withMessage('Enter a Valid 10-digit Number'),
    check('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/).withMessage('Password must contain at least one lowercase letter, one uppercase letter, and one digit'),
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ "status": false, "message": errors.array()[0].msg });
            }

            const { firstName, lastName, email, phoneNumber, password } = req.body;
            const existingUser = await UserModel.findOne({ $or: [{ email }, { phoneNumber }] });
            if (existingUser) {
                return res.status(400).send({ "status": false, "message": "User already exists" });
            }

            const hashedPassword = await argon2.hash(password);
            const userData = new UserModel({
                firstName,
                lastName,
                email,
                phoneNumber,
                password: hashedPassword,
                createdAt: new Date(),
                role: "user"
            })
            const savedUser = await userData.save();
            if (savedUser) {

                const token = jwt.sign({ userId: savedUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.TOKEN_EXPIRES });
                res.cookie(process.env.EXPRESSJS_COMPLETE_AUTHENTICATION_TOKEN_COOKIE_KEY, token, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'none'
                }).status(200).send({ "status": true, "message": "Registration Successfull" })

            } else {
                res.status(500).send({ "status": false, "message": "Something Went Wrong" });
            }


        } catch (error) {
            console.error(error);
            res.status(500).json({ "status": false, "message": error.message });
        }
    }
];

const userLogin = async (req, res) => {
    try {
        const { identifier, password } = req.body;
        if (identifier && password) {

            const existingUser = await UserModel.findOne({ $or: [{ email: identifier }, { phoneNumber: identifier }] });
            if (!existingUser || existingUser.role !== "user") {
                return res.status(401).send({ "status": false, "message": "Invalid Identifier" });
            }

            const isMatch = await argon2.verify(existingUser.password, password);
            if (isMatch) {

                const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.TOKEN_EXPIRES });
                res.cookie(process.env.EXPRESSJS_COMPLETE_AUTHENTICATION_TOKEN_COOKIE_KEY, token, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'none'
                }).status(200).send({ "status": true, "message": "Login Successfull" })

            } else {
                res.status(401).send({ "status": false, "message": "Wrong Password" });
            }

        } else {
            res.status(400).send({ "status": false, "message": "All fields are required" })
        }

    } catch (error) {
        console.error(error)
        res.status(500).send({ "status": false, "message": error.message })
    }
}

const userData = async (req, res) => {
    res.status(200).send(req.user);
}

const userDataById = async (req, res) => {
    const { userId } = req.params;
    if (Types.ObjectId.isValid(userId)) {

        const user = await UserModel.findById(userId).select("-password");
        if (user) {
            res.status(200).send(user);
        } else {
            res.status(404).send({ "status": false, "message": 'User not found' });
        }

    } else {
        res.status(403).json({ "status": false, "message": "Invalid Request" });
    }
}

const usersData = async (req, res) => {
    const users = await UserModel.find({}).select("-password");
    res.status(200).send(users)
}

const removeUser = async (req, res) => {
    try {
        const { userId } = req.params;
        if (Types.ObjectId.isValid(userId)) {

            const removedUser = await UserModel.findByIdAndDelete(userId);
            if (!removedUser) {
                return res.status(404).send({ "status": false, "message": 'User not found' });
            }

            res.status(200).send({ "status": true, "message": 'User removed successfully', removedUser });

        } else {
            res.status(403).json({ "status": false, "message": "Invalid Request" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ "status": false, "message": 'Internal Server Error' });
    }
};

export { userRegistration, userLogin, userData, userDataById, usersData, removeUser }