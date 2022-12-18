import Users from "../model/UsersModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const {
    email,
    password,
    firstName,
    lastName,
    userName,
    birthday,
    // picture,
  } = req.body;
  // console.log(password);
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(
    password,
    salt
  );
  try {
    await Users.create({
      email: email,
      password: hashPassword,
      firstName: firstName,
      lastName: lastName,
      userName: userName,
      birthday: birthday,
      // picture: picture,
    });
    res.json({ msg: "Register succesfull!" });
  } catch (e) {
    console.log(e);
    res.status(404).json({
      msg: "Email or UserName already exist",
    });
  }
};

export const login = async (req, res) => {
  try {
    const user = await Users.findAll({
      where: {
        email: req.body.email,
      },
    });
    const match = await bcrypt.compare(
      req.body.password,
      user[0].password
    );
    if (!match)
      return res
        .status(400)
        .json({ msg: "Wrong Password!" });
    const userId = user[0].id;
    const email = user[0].email;
    const userName = user[0].userName;
    const accessToken = jwt.sign(
      { userId, email, userName },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "120000s" }
    );
    console.log(
      "accessToken from login Form",
      accessToken
    );
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 120000 * 1000,
    });
    res.json({
      token: accessToken,
      userId: userId,
    });
  } catch (e) {
    console.log(e);
    res
      .status(404)
      .json({ msg: "Email wasn't found..." });
  }
};

export const logout = (req, res) => {
  const accessToken = req.cookies.accessToken;
  if (!accessToken)
    return res
      .status(204)
      .json({ msg: "loged out" });
  res.clearCookie("accessToken");
  console.log(
    "accessToken 2=>",
    req.cookies.accessToken
  );
  return res.sendStatus(200);
};

export const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll({
      attributes: [
        "email",
        "firstName",
        "lastName",
        "userName",
        "birthday",
      ],
    });
    res.json(users);
  } catch (e) {
    console.log(e);
    res
      .status(404)
      .json({ msg: "Users not found" });
  }
};
