const { User } = require("../models");

module.exports.createUser = async (req, res, next) => {
  try {
    const { body } = req;
    console.log(body);
    const [user] = await User.find({ email: body.email });
    if (user) {
      return res.status(200).send({ data: user });
    }
    const newUser = await User.create(body);
    res.status(200).send({ data: newUser });
  } catch (error) {
    next(error);
  }
};
