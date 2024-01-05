import argon2 from 'argon2';
import { check, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken'
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
                return res.send({ "message": "User already exists" });
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
                }).send({ "status": true, "message": "Registration Successfull" })

            } else {
                res.send({ "status": false, "message": "Something Went Wrong" });
            }


        } catch (error) {
            console.error(error);
            res.status(500).json({ "status": false, "message": error.message });
        }
    }
];

export { userRegistration }