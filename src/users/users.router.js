const { Router } = require("express");
const { authorize } = require("../helpers/authorize.middleware");
const { getCurretUser } = require("./users.controller");
const router = Router();
router.get("/current", authorize, getCurretUser);
exports.userRouter = router;
