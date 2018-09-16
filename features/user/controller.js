const mongoose = require('mongoose');

const User = require('./model');

exports.user_login = async (req, res, next) => {
  const username = req.body.username;
  try {
    const user = await User.find({ username }).exec();
    if (user.length < 1)
      return res.status(401).json({ message: 'username not exist' });
    // check pass
    res.status(200).json({
      message: 'Auth successful',
      data: {
        id: user[0]._id,
        username,
      },
      redirect: '/channel/' + username
    })

  } catch (err) {
    res.status(500).json({ error: err });
  }
}

exports.user_signup = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  try {
    const users = await User.find({ username }).exec();
    if (users.length >= 1)
      return res.status(409).json({ message: "Email has been registered" });

    // Create new User
    const user = new User({
      _id: mongoose.Types.ObjectId(),
      username,
      password,
    });

    const result = await user.save();
    res.status(201).json({ message: 'User created' });

  } catch (err) {
    res.status(500).json({ error: err });
  }

}