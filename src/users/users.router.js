const { Router } = require("express");
const { authorize } = require("../helpers/authorize.middleware");
const { getCurretUser } = require("./users.controller");
const { avatarUpdate } = require("../helpers/avatarUpdate");
const { updateAvatar } = require("./users.controller")

const router = Router();
router.get("/current", authorize, getCurretUser);
router.patch(
  "/avatars",
  authorize,
  avatarUpdate().single("avatar"),
updateAvatar
);

exports.userRouter = router;
