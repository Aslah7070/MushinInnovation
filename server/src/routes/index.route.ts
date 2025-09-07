
import express from "express"

import errorCatch from "../middlewares/error-catch";
import { login, signup, verifyToken } from "../controllers/index.controller";
const auth=express.Router()

auth


.post("/signup",errorCatch(signup))
.post("/login",errorCatch(login))
.get("/verify-token",errorCatch(verifyToken))
// .post("/logout",errorCatch(logout))
// .post("/resendotp",errorCatch(resendOtp))
// .post("/otpverification",errorCatch(verifyOtpAndLogin))
// .post("/forgotpassword",errorCatch(forgotPassword))
// .post("/googlelogin",errorCatch(googleAuth))
// .post("/resetpassword",errorCatch(getResetPassword))

export  {auth}        