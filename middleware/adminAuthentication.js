import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';


import UserModel from "../models/userSchema.js";

const adminAuthentication = async (req, res, next) => {
    try {
        const cookieKey = process.env.COOKIE_KEY
        const authorizationToken = req.cookies[cookieKey];
        if (authorizationToken) {

            const { adminId } = jwt.verify(authorizationToken, process.env.JWT_SECRET_KEY)
            if (Types.ObjectId.isValid(adminId)) {

                const admin = await UserModel.findById(adminId).select("-password");
                if (admin.role === "admin") {
                    req.admin = admin
                    next();
                } else {
                    return res.status(403).json({ "status": false, "message": "Invalid Request" });
                }

            } else {
                return res.status(403).json({ "status": false, "message": "Invalid Request" });
            }

        } else {
            res.status(401).json({ "status": false, "message": "Authorization Failed" });
        }

    } catch (error) {
        res.status(500).json({ "status": false, "message": "Internal Server Error", "error": error });
    }
}

export default adminAuthentication;