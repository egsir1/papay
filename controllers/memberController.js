const memberController = module.exports;
const assert = require("assert");
const Member = require("../models/Member");

const jwt = require("jsonwebtoken");
const Definer = require("../lib/errors");

memberController.signup = async (req, res) => {
  try {
    console.log("POST: cont/signup");
    const data = req.body;
    const member = new Member();
    const new_member = await member.signupData(data);

    console.log("result:", new_member);
    const token = memberController.createToken(new_member);

    console.log("token:", token);
    res.cookie("access_token", token, {
      maxAge: 6 * 3600 * 100,
      httpOnly: true,
    });

    res.send("SIGNUP");
    res.json({ state: "success", data: new_member });
  } catch (err) {
    console.log(`Errorr: ${err}`);
    res.json({ state: "fail", message: err.message });
  }
};

memberController.login = async (req, res) => {
  try {
    console.log("POST: cont/login");
    const data = req.body;
    const member = new Member();
    const result = await member.loginData(data);

    console.log("result:", result);
    const token = memberController.createToken(result);

    console.log("token:", token);
    console.log("res.cookie-1:", res.cookie);

    res.cookie("access_token", token, {
      maxAge: 6 * 3600 * 100,
      httpOnly: true,
    });
    console.log("res.cookie-2:", res.cookie);
    res.json({ state: "success", data: result });
  } catch (err) {
    console.log(`Errorr: ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

memberController.logout = (req, res) => {
  console.log("GET cont.logout");
  res.send("Logout sahifasidasiz");
};

// Create JWT

memberController.createToken = (result) => {
  try {
    const upload_data = {
      _id: result._id,
      mb_nick: result.mb_nick,
      mb_type: result.mb_type,
    };
    const token = jwt.sign(upload_data, process.env.SECRET_TOKEN, {
      expiresIn: "6h",
    });

    assert(token, Definer.general_err4);

    return token;
  } catch (error) {
    throw new Error(error);
  }
};

memberController.checkMyAuthentication = (req, res) => {
  try {
    console.log("GET cont/checkMyAuthrntication");
    console.log("req.cookies:", req.cookies);
    let token = req.cookies["access_token"];
    console.log("token:", token);
    const member = token ? jwt.verify(token, process.env.SECRET_TOKEN) : null;

    assert.ok(member, Definer.auth_err2);

    res.json({ state: "success", data: member });
  } catch (error) {
    throw error;
  }
};
