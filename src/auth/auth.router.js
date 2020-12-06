const { Router } = require("express");
const {authorize} = require('../helpers/authorize.middleware')
const { validate } = require('../helpers/validate.Middleware')
const { createUserSchema,loginSchema } = require("./auth.schemes")
const { login, register, logout ,verify} = require('./auth.controller')


const router = Router()
router.post("/register", validate(createUserSchema), register)

router.post("/login", validate(loginSchema), login);

router.post("/logout", authorize, logout)

router.get("/verify/:verificationToken", verify);

exports.authRouter = router;