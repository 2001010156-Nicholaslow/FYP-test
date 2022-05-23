const jwt = require("jsonwebtoken");

const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const JWTKey = "abc";
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "fyp_db",
});

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

app.post("/login", (req, res) => {
  console.log("hello");
  const email = req.body.email;
  const password = req.body.password;
  db.query(
    "SELECT * FROM admin WHERE email =? and password =?",
    [email, password],
    (err, results) => {
      if (err) {
        res.status(401).send({ err: err });
      }
      console.log(results.length);
      if (results.length != 0) {
        const responseBody = {
          token: jwt.sign(
            {
              email: results[0].email,
            },
            JWTKey,
            {
              expiresIn: 86400, //Expires in 24 hrs
            }
          ),
        }; //End of data variable setup
        res.status(200).send(responseBody);
      } else {
        res.status(401).send({ message: "Wrong Email/password combination!" });
      }
    }
  );
});

//Client - YouthRegister
app.post("/YouthConfirmation", (req,res) => {
  const fullname = req.body.fullname
  const password = req.body.password
  const email = req.body.email
  const dob = req.body.dob
  const gender = req.body.gender
  const num = req.body.num
  const levelOfEducation = req.body.levelOfEducation
  const citizenship = req.body.citizenship
  const address = req.body.address
  const country = req.body.country
  const postalcode = req.body.postalcode


  db.query("INSERT INTO users (full_name, password, email, dob, gender, contact_number, education, citizenship, address, country, postalcode) VALUES (?,?,?,?,?,?,?,?,?,?,?)", [fullname,password,email,dob,gender,num,levelOfEducation,citizenship,address,country,postalcode],
  (err,result) => {
    console.log(err);
    console.log(result);
  });
});


app.listen(3001, () => {
  console.log("running server");
});
