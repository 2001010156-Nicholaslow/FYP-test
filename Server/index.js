const jwt = require("jsonwebtoken");

const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const JWTKey = "abc";
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "fyp_db",
});

app.use(express.json());
app.use(fileUpload());
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

app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) {
      res.status(401).send({ err: err });
    } else {
      res.status(200).send(results);
    }
  });
});

//Client - Profile
app.get("/users/:id", (req, res) => {
  const id = req.params.id

  db.query("SELECT * FROM users WHERE user_id = '" + id + "'", (err, results) => {
    if (err) {
      res.status(401).send({ err: err });
    } else {
      if(results.length == 0) // not found
        res.status(404).send();
      res.status(200).send(results[0]);
    }
  });
});

//Client - Application
app.get("/opportunity/:id", (req, res) => {
  const id = req.params.id

  db.query("SELECT * FROM opportunity WHERE opp_id='" + id + "'", (err, results) => {
    if (err) {
      res.status(401).send({ err: err });
    } else {
      if(results.length == 0) // not found
        res.status(404).send();
      res.status(200).send(results[0]);
    }
  });
});

app.post("/opportunity/:id/apply", (req,res) => {
  const id = req.params.id;
  const f = req.files;

  if(f == null)
    res.status(406).send("no file");

  console.log(f.File.name);

  db.query("INSERT INTO application (file, status, user_id, opp_id) VALUES (?,?,?,?)",
    [
      f.File.data,
      "0",
      "2",
      id
    ],
    (err,result) => {
      if (err) {
        res.status(401).send({ err: err });
      } else {
        res.status(200).send("okay");
      }     
    }
  )
});

//Client - Review Application
app.get("/opportunity/:id/application", (req,res) => {
  const id = req.params.id

  db.query("SELECT * FROM application INNER JOIN users ON application.user_id = users.user_id WHERE opp_id='" + id + "'", (err, results) => {
    if (err) {
      res.status(401).send({ err: err });
    } else {
      if(results.length == 0) // not found
        res.status(404).send();
      res.status(200).send(results);
    }
  });
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

//Client - PartnerRegister
app.post("/PartnerConfirmation", (req,res) => {
  const email = req.body.email
  const fullname = req.body.fullname
  const password = req.body.password
  const num = req.body.num
  const businessname = req.body.businessname


  db.query("INSERT INTO partners (email, company_name, contact_name, contact_number, password) VALUES (?,?,?,?,?)", [email,businessname,fullname,num,password],
  (err,result) => {
    console.log(err);
    console.log(result);
  });
});

app.listen(3001, () => {
  console.log("running server");
});
