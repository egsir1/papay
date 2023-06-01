const memberController = module.exports;
const Member = require("../models/Member");

memberController.signup = async (req, res) => {
  try {
    console.log("POST: cont/signup");
    const data = req.body;
    const member = new Member();
    const new_member = await member.signupData(data);
    res.send("SIGNUP");
    res.json({ state: "success", data: new_member });
  } catch (err) {
    console.log(`Errorr: ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

memberController.login = async (req, res) => {
  try {
    console.log("POST: cont/login");
    const data = req.body;
    const member = new Member();
    const result = await member.loginData(data);

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
