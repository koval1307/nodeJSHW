const  UserModel  = require('../users/users.model')
const bcrypt = require('bcrypt');
const { Conflict, NotFound, Unauthorized } = require('../helpers/errors')
const jwt = require("jsonwebtoken");
exports.register = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const existingUser = await UserModel.findOne({ email })
        if (existingUser) {
            throw new Conflict("Email in use");
        }
        const passwordHash = await bcrypt.hash(
          password,
          Number(process.env.SALT_ROUNDS)
        );
        const newUser = await UserModel.create({ email, password: passwordHash })
        res.status(201).send({ subcription: newUser.subcription, email: newUser.email })
    }
    catch (err) {
        next(err)
    }
};
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new NotFound("User not found");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Unauthorized("Not authorized");
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    await UserModel.findByIdAndUpdate(
      user._id,
      { $set: { token } },
      { new: true }
    );
    res.status(200).send({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};
exports.logout = async (req, res, next) => {
  try {
    const { _id } = req.user;
    await UserModel.findByIdAndUpdate(_id, { $set: { token: "" } });
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};