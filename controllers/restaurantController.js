const Member = require("../models/Member");
const Product = require("../models/Product");

const restaurantController = module.exports;

restaurantController.getMyRestaurantProducts = async (req, res) => {
  try {
    console.log("GET: cont/getMyRestaurantProducts");

    //TODO: Get my restaurant products
    console.log("res-locals from res-cont::", res.locals);

    const product = new Product();
    const data = await product.getAllProductsDataResto(res.locals.member);
    res.render("restaurant-menu", { restaurant_data: data });
  } catch (err) {
    console.log(`ERROR: cont/getMyRestaurantData, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

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

    // console.log(`req session: ${req.session}`);
    // console.log(`req: ${req.body}`);
    console.log(req.session);
    req.session.member = new_member;
    res.redirect("/resto/products/menu");
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

    req.session.member = result;
    req.session.save(function () {
      res.redirect("/resto/products/menu");
    });
    req.session.member = result;
    req.session.save(function () {
      res.redirect("/resto/products/menu");
    });
  } catch (err) {
    console.log(`Errorr: ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

restaurantController.logout = (req, res) => {
  console.log("GET cont.logout");
  res.send("Logout sahifasidasiz");
};

restaurantController.checkSessions = (req, res) => {
  if (req.session?.member) {
    res.json({ state: "success", data: req.session.member });
  } else {
    res.json({ state: "fail", message: "You are not authenticated!" });
  }
};

restaurantController.validateAuthRestaurant = (req, res, next) => {
  if (req.session?.member?.mb_type === "RESTAURANT") {
    console.log("req-session:", req.session);

    console.log("req-member:", req.member);
    req.member = req.session.member;
    console.log("req-member-2:", req.member);
    next();
  } else
    res.json({
      state: "fail",
      message: "only authenticated members with restaurant type",
    });
};
