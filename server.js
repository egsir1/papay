const http = require("http");
const mongodb = require("mongodb");

const connectionString =
  "mongodb+srv://sam:DKjk9m9CuKeJfaTE@cluster0.wyfd8jw.mongodb.net/PapayAdmin?retryWrites=true&w=majority";

mongodb.connect(
  connectionString,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err, client) => {
    if (err) console.log("Error on connection MongoDB");
    else {
      console.log("Successfully connected to MongoDB");
      //   console.log(client);
      module.exports = client;

      const app = require("./app");

      const server = http.createServer(app);
      let PORT = 3000;
      server.listen(PORT, function () {
        console.log(
          `The server is running successfully on port : ${PORT}, http://localhost:${PORT}`
        );
      });
    }
  }
);
