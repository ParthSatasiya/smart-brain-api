const express = require("express");
const cors = require("cors");
const knex = require("knex");
const bcrypt = require("bcrypt-nodejs");

const signin = require("./controllers/signin");
const register = require("./controllers/register");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    port: 5432,
    user: "",
    password: "",
    database: "smart-brain",
  },
});

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json("Server is running");
});

app.post("/signin", signin.handleSignin(db, bcrypt));
app.post("/register", register.handleRegister(db, bcrypt));
app.get("/profile/:id", profile.handleProfileGet(db));
app.put("/image", image.handleImage(db));
app.post("/imageurl", image.handleApiCall);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
