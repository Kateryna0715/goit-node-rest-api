const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const jimp = require("jimp");
const path = require("path");
const fs = require("fs/promises");

const { User } = require("../models");
const { HttpError, ctrlWrapper } = require("../helpers");

const { SECRET_KEY } = process.env;

const avatarDir = path.join(__dirname, "../", "public", "avatars");

const registerUser = async (req, res) => {
  const { email, password } = req.body;
  const isExist = await User.exists({ email });

  if (isExist) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatartUrl = gravatar.url(email);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatartUrl,
  });

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.status(200).json({
    token: token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const getCurrentUser = async (req, res) => {
  const { email, subscription } = req.user;

  res.status(200).json({
    email,
    subscription,
  });
};

const logoutUser = async (req, res) => {
  const { _id: id } = req.user;
  await User.findByIdAndUpdate(id, { token: "" });

  res.status(204).send();
};

const updateUserSubscription = async (req, res) => {
  const { _id: id } = req.user;
  const { subscription } = req.body;

  const updatedUser = await User.findByIdAndUpdate(
    id,
    { subscription },
    { new: true }
  );

  res.status(200).json({
    email: updatedUser.email,
    subscription: updatedUser.subscription,
  });
};

const updateAvatar = async (req, res) => {
  const { _id: id } = req.user;

  const { path: tempUpload, originalname } = req.file;
  const filename = `${id}_${originalname}`;

  const resultUpload = path.join(avatarDir, filename);
  await fs.rename(tempUpload, resultUpload);

  const avatar = await jimp.read(resultUpload);
  await avatar.resize(250, 250).write(resultUpload);

  const avatarUrl = path.join("avatars", filename);

  await User.findByIdAndUpdate(id, { avatarUrl });

  res.status(200).json({ avatarUrl });
};

module.exports = {
  registerUser: ctrlWrapper(registerUser),
  loginUser: ctrlWrapper(loginUser),
  getCurrentUser: ctrlWrapper(getCurrentUser),
  logoutUser: ctrlWrapper(logoutUser),
  updateUserSubscription: ctrlWrapper(updateUserSubscription),
  updateAvatar: ctrlWrapper(updateAvatar),
};
