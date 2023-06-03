const express = require("express");
const app = express();
const router = require("./router");
const router_bssr = require("./router_bssr");
const session = require("express-session");

<<<<<<< HEAD
// const db = require("./server").db();
// const mongodb = require("mongodb");
// let session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const store = new MongoDBStore({
  uri: process.env.MONGO_URL,
  collection: "sessions",
});
=======
// // MongoDB ni call qilamiz

// const db = require("./server").db();
// const mongodb = require("mongodb");
>>>>>>> abf7c4f08a5f52718dcded0aa3c1960c2fe27d1f

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

app.use((req, res, next) => {
  res.locals.member = req.session.member;
  next();
});

//3: Views code
app.set("views", "views");
app.set("view engine", "ejs");

//4: Routing code
app.use("/resto", router_bssr);
app.use("/", router);

module.exports = app;
