import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import UserModel from "../models/userSchema.js";

const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email && password) {

            const existingUser = await UserModel.findOne({ email });
            if (!existingUser || existingUser.role !== "admin") {
                return res.status(401).send({ "status": false, "message": "Invalid Identifier" });
            }

            const isMatch = await argon2.verify(existingUser.password, password);
            if (isMatch) {

                const token = jwt.sign({ adminId: existingUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.TOKEN_EXPIRES });
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

const adminData = async (req, res) => {
    res.send(req.admin);
}

export { adminLogin, adminData };