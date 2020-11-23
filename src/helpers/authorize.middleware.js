const jwt = require("jsonwebtoken");
const UserModel = require("../users/users.model");
const { Unauthorized } = require("./errors");
exports.authorize = async (req, res, next) => {
  try {
    const authHeader = req.get("Authorization" || "");
    const token = authHeader.replace("Bearer ", "");
    let payload;
    try {
      payload = await jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      throw new Unauthorized("Not authorized");
    }
    const user = await UserModel.findById(payload.userId);
    if (!user) {
      throw new Unauthorized("Not authorized");
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
