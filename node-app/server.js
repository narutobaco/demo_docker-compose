const express = require("express");
const mongoose = require("mongoose");
const Router = require("./routes")
const app = express();
app.use(express.json());

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(express.json());

const dbHost = process.env.DB_HOST || 'localhost'
const dbPort = process.env.DB_PORT || 27017
const dbName = process.env.DB_NAME || 'usersdb'
const mongoUrl = `mongodb://${dbHost}:${dbPort}/${dbName}`

const connectWithRetry = function () {
    return mongoose.connect(mongoUrl,(err) => {
      if (err) {
        console.error('Failed to connect to mongo on startup - retrying in 5 sec', err)
        setTimeout(connectWithRetry, 5000)
      }
    })
  }
connectWithRetry()
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected successfully");
});
app.use(Router);
app.listen(3005, () => {
    console.log("Server is running at port 3005");
});