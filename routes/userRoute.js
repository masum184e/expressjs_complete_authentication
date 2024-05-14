import express from 'express';
import { uploadProfilePicture, userData, userLogin, userRegistration, sendOtop, verifyOtpWithNewPassword } from '../controller/userController.js';
import userAuthentication from '../middleware/userAuthentication.js';
import uploadFile from '../middleware/uploadFile.js';

const userRouter = express.Router();
userRouter.post("/registration", userRegistration);
userRouter.post("/login", userLogin);
userRouter.get("/", userAuthentication, userData);
userRouter.post("/upload-profile-picture", userAuthentication, uploadFile.fields([{ name: "profilePicture", maxCount: 1 }]), uploadProfilePicture)
userRouter.get("/reset-password-otp", sendOtop);
userRouter.post("/reset-password/:token/:verificationId", verifyOtpWithNewPassword);
export default userRouter