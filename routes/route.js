import express from 'express';
import userRouter from './userRoute.js';
import adminRouter from './adminRoute.js';

const router = express.Router();

router.use("/user", userRouter);
router.use("/admin", adminRouter)

export default router;