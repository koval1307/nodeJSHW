const { serializeUser } = require("./users.serializer")
const {Unauthorized} = require("../helpers/errors")
const userModel = require("./users.model");

exports.getCurretUser = (req, res, next) => {
  console.log(req.user.avatarURL)
  res.status(200).send(serializeUser(req.user))
};
exports.updateAvatar = async (req, res, next) => {
      const { user } = req;
  const { file } = req;

  try {
      const updateUserAvatar = await userModel.findByIdAndUpdate(
        user._id,
        {
          avatarURL: `http://localhost:${process.env.PORT}/images/${file.filename}`,
        },
        {
          new: true,
        }
      );
      res.status(200).send({ avatarURL: updateUserAvatar.avatarURL });
      next();
    } catch (err) {
   throw new Unauthorized("Not authorized");
    }
  }
