const assert = require("assert");
const Member = require("../models/Member");
const Product = require("../models/Product");
const Definer = require("../lib/errors");
const Restaurant = require("../models/Restaurant");

const restaurantController = module.exports;

restaurantController.home = (req, res) => {
  try {
    console.log("home-body", req.body);
    console.log("home-member", req.member);
    console.log("GET: cont/home");
    res.render("home-page");
  } catch (err) {
    console.log(`ERROR: cont/home, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

restaurantController.getMyRestaurantProducts = async (req, res) => {
  try {
    console.log("GET: cont/getMyRestaurantProducts");

    //TODO: Get my restaurant products
    console.log("res-locals from res-cont::", res.locals);

    const product = new Product();
    const data = await product.getAllProductsDataResto(res.locals.member);
    console.log("data from getMyRestDataProduct::", data);
    res.render("restaurant-menu", { restaurant_data: data });
  } catch (err) {
    console.log(`ERROR: cont/getMyRestaurantData, ${err.message}`);
    res.redirect("/resto");
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
    // console.log("body:", req.body);
    // console.log("file:", req.file);
    assert(req.file, Definer.general_err3);

    let new_member = req.body;
    new_member.mb_type = "RESTAURANT";
    new_member.mb_image = req.file.path;

    const member = new Member();
    ``;
    const result = await member.signupData(new_member);

    assert(result, Definer.general_err1);

    // console.log(`req session from res/cont: ${req.session}`);
    // console.log(`req.body from res/cont: ${req.body}`);

    req.session.member = result;
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

    // console.log(`req session from res/cont/loginPro: ${req.session}`);
    // console.log(`req.body from res/cont:/loginPro ${req.body}`);
    const data = req.body;
    const member = new Member();
    const result = await member.loginData(data);
    // console.log(
    //   "req.session.member from res/cont/loginPro-1",
    //   req.session.member
    // );
    req.session.member = result;
    // console.log(
    //   "req.session.member from res/cont/loginPro-2",
    //   req.session.member
    // );
    req.session.save(function () {
      result.mb_type === "ADMIN"
        ? res.redirect("/resto/all-restaurant")
        : res.redirect("/resto/products/menu");
    });
  } catch (err) {
    console.log(`Errorr, cont/loginProcess: ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

restaurantController.logout = (req, res) => {
  try {
    console.log("GET cont.logout");
    req.session.destroy(function () {
      res.redirect("/resto");
    });
  } catch (err) {
    console.log(`Errorr, cont/logoutProcess: ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
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

restaurantController.validateAdmin = (req, res, next) => {
  if (req.session?.member?.mb_type === "ADMIN") {
    // console.log("req-session:", req.session);

    // console.log("req-member:", req.member);
    req.member = req.session.member;
    // console.log("req-member-2:", req.member);
    next();
  } else {
    const html = `<script>
    alert('Admin Page: Permission denied!');
    window.location.replace("/resto");
    </script>`;

    res.end(html);
  }
};

restaurantController.getAllRestaurants = async (req, res) => {
  try {
    console.log("GET cont/getAllRestaurants");

    const restaurant = new Restaurant();

    const restaurants_data = await restaurant.getAllRestaurantsData();
    res.render("all-restaurant", { restaurants_data: restaurants_data });
  } catch (err) {
    console.log(`Errorr, cont/getAllRestaurants: ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

restaurantController.updateRestaurantByAdmin = async (req, res) => {
  try {
    console.log("GET cont/updateRestaurantByAdmin");
    const restaurant = new Restaurant();
    const result = await restaurant.updateRestaurantByAdminData(req.body);
    await res.json({ state: "success", data: result });
  } catch (err) {
    console.log(`Errorr, cont/updateRestaurantByAdmin: ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};
