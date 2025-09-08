
import express from "express"


import { login, logout, refreshAccessToken, signup, verifyToken } from "../controllers/index.controller";
const auth=express.Router()

auth


.post("/signup",signup)
.post("/login",login)
.get("/verify-token",verifyToken)
.post("/logout",(logout))
.post("/refresh-token",refreshAccessToken)


export  {auth}        