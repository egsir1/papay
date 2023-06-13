const express = require("express");
const app = express();
const router = require("./router");
const router_bssr = require("./router_bssr");

// const db = require("./server").db();
// const mongodb = require("mongodb");
// let session = require("express-session");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const store = new MongoDBStore({
  uri: process.env.MONGO_URL,
  collection: "sessions",
});

//1: Kirish code

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//2: Session code

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 30, // for 30 minutes
    },
    store: store,
    resave: true,
    saveUninitialized: true,
  })
);

//browserga sessionni jonatish
app.use((req, res, next) => {
  console.log("app.js=> res.locals-1::", res.locals);
  console.log("app.js=> req.session.member-1", req.session.member);

  //////////////////////////////////////
  res.locals.member = req.session.member;
  ///////////////////////////////////////
  console.log("app.js=> res.locals-2::", res.locals);
  console.log("app.js=> req.session.member-2", req.session.member);
  next();
});

//3: Views code
app.set("views", "views");
app.set("view engine", "ejs");

//4: Routing code
app.use("/resto", router_bssr);
app.use("/", router);

module.exports = app;
