import { Router } from "express";
// import { GetUser, Logout, SignIn } from "../models/Users.auth";
import { checkLogs, isLoggedIn } from "../models/Users.middleware";
// import { CheckRest, CreateReset, ResetPassword } from "../models/Reset.controllers";
import { Chat } from "../models/chat.controller.js";

const chatRouter = Router();


chatRouter.post("/", checkLogs, isLoggedIn, Chat);

export default chatRouter;
