import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

import UserModel from "../models/userSchema.js";

const userAuthentication = async (req, res, next) => {
    try {
        const cookieKey = process.env.EXPRESSJS_COMPLETE_AUTHENTICATION_TOKEN_COOKIE_KEY
        const authorizationToken = req.cookies[cookieKey];
        if (authorizationToken) {

            const { userId } = jwt.verify(authorizationToken, process.env.JWT_SECRET_KEY)
            if (Types.ObjectId.isValid(userId)) {

                const user = await UserModel.findById(userId).select("-password");
                if (user.role === "user") {
                    req.user = user
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

export default userAuthentication;