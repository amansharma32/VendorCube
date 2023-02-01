const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");

require("./db/conn");
const Register = require("./models/registers");

const port = process.env.PORT || 3000;
const static_path = path.join(__dirname, "../public");
const views_path = path.join(__dirname, "../src/templates/views");
const partial_path = path.join(__dirname, "../src/templates/partials");

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", views_path);
app.use(express.static(partial_path));
app.use(express.static(views_path));
hbs.registerPartials(partial_path);

// console.log(static_path);
// console.log(partial_path);
// console.log(views_path);

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/index", (req, res) => {
  res.render("index");
});

app.get("/registration", (req, res) => {
  res.render("registration");
});

app.get("/aboutUs", (req, res) => {
  res.render("aboutUs");
});

app.post("/registration", async (req, res) => {
  try {
    const password = req.body.Password;
    const ConfirmPassword = req.body.ConfirmPassword;
    if (password === ConfirmPassword) {
      const registerEmployee = new Register({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phonenumber: req.body.phonenumber,
        category: req.body.category,
        Password: req.body.Password,
        ConfirmPassword: req.body.ConfirmPassword,
      });

      

      const registered = await registerEmployee.save();
      res.status(201).render("index");
    } else {
      res.send("password not match");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

app.post("/aboutUs", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const userdetail = await Register.findOne({ email: email });

    if (userdetail.Password === password) {
      res.render("aboutUs");
    } else {
      res.send("invalid login details");
    }
  } catch (error) {
    res.status(400).send("invalid login details");
  }
});

// const bcrypt = require("bcryptjs");

// const securePassword = async (password) => {
//   const sec = await bcrypt.hash(password, 10);
//   console.log(sec);

//   const pswck = await bcrypt.compare(password, sec);
//   console.log(pswck);




// };
 

 


// securePassword("aman@1234");

app.listen(port, () => {
  console.log(`running on ${port} successful`);
});
 