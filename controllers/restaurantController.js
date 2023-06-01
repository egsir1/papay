const Member = require("../models/Member");

const restaurantController = module.exports;

restaurantController.getSignupMyRestaurant = async (req, res) => {
  try {
    console.log("GET: cont/getSignUpMyRestaurant");
    res.render("signup");
  } catch (err) {
    console.log(`ERROR: cont/getSignupMyRestaurant, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

restaurantController.signupProcess = async (req, res) => {
  try {
    console.log("POST: cont/signup");
    const data = req.body;
    const member = new Member();
    const new_member = await member.signupData(data);

    res.json({ state: "success", data: new_member });
  } catch (err) {
    console.log(`Errorr: ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

restaurantController.getLoginMyRestaurant = async (req, res) => {
  try {
    console.log("req.body::", req.body);
    console.log("GET: cont/getSignUpMyRestaurant");
    res.render("login-page");
  } catch (err) {
    console.log(`ERROR: cont/getSignupMyRestaurant, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

restaurantController.loginProcess = async (req, res) => {
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

restaurantController.logout = (req, res) => {
  console.log("GET cont.logout");
  res.send("Logout sahifasidasiz");
};
