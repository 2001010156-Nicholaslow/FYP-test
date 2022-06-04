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

app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) {
      res.status(401).send({ err: err });
    } else {
      res.status(200).send(results);
    }
  });
});

app.get("/opportunity", (req, res) => {
  db.query("SELECT * FROM opportunity", (err, results) => {
    if (err) {
      res.status(401).send({ err: err });
    } else {
      res.status(200).send(results);
    }
  });
});

//Client - YouthRegister
app.post("/YouthConfirmation", (req, res) => {
  const fullname = req.body.fullname;
  const password = req.body.password;
  const email = req.body.email;
  const dob = req.body.dob;
  const gender = req.body.gender;
  const num = req.body.num;
  const levelOfEducation = req.body.levelOfEducation;
  const citizenship = req.body.citizenship;
  const address = req.body.address;
  const country = req.body.country;
  const postalcode = req.body.postalcode;

  db.query(
    "INSERT INTO users (full_name, password, email, dob, gender, contact_number, education, citizenship, address, country, postalcode) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
    [
      fullname,
      password,
      email,
      dob,
      gender,
      num,
      levelOfEducation,
      citizenship,
      address,
      country,
      postalcode,
    ],
    (err, result) => {
      console.log(err);
      console.log(result);
    }
  );
});
//Client - YouthRegister
app.post("/YouthConfirmation", (req, res) => {
  const fullname = req.body.fullname;
  const password = req.body.password;
  const email = req.body.email;
  const dob = req.body.dob;
  const gender = req.body.gender;
  const num = req.body.num;
  const levelOfEducation = req.body.levelOfEducation;
  const citizenship = req.body.citizenship;
  const address = req.body.address;
  const country = req.body.country;
  const postalcode = req.body.postalcode;

  db.query(
    "INSERT INTO users (full_name, password, email, dob, gender, contact_number, education, citizenship, address, country, postalcode) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
    [
      fullname,
      password,
      email,
      dob,
      gender,
      num,
      levelOfEducation,
      citizenship,
      address,
      country,
      postalcode,
    ],
    (err, result) => {
      console.log(err);
      console.log(result);
    }
  );
});

//youth emailcheck
app.post("/EmailCheck", (req, res) => {
  const email = req.body.email;

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      if (result.length > 0) {
        res.send(result);
      } else {
        res.send({
          message: "This email is already in used. Try another Email.",
        });
      }
    }
  });
});

//partner emailcheck
app.post("/EmailCheck1", (req, res) => {
  const email = req.body.email;

  db.query("SELECT * FROM partners WHERE email = ?", [email], (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      if (result.length > 0) {
        res.send(result);
      } else {
        res.send({
          message: "This email is already in used. Try another Email.",
        });
      }
    }
  });
});

//Login - client
app.post("/ClientLogin", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.query(
    "SELECT * FROM users WHERE email = ? AND password = ?",
    [email, password],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        if (result.length > 0) {
          res.send(result);
        } else {
          res.send({ message: "Wrong Email/Password combination!" });
        }
      }
    }
  );
});

//Client - PartnerRegister
app.post("/PartnerConfirmation", (req, res) => {
  const email = req.body.email;
  const fullname = req.body.fullname;
  const password = req.body.password;
  const num = req.body.num;
  const businessname = req.body.businessname;

  db.query(
    "INSERT INTO partners (email, company_name, contact_name, contact_number, password) VALUES (?,?,?,?,?)",
    [email, businessname, fullname, num, password],
    (err, result) => {
      console.log(err);
      console.log(result);
    }
  );
});

// listen App
app.listen(3001, () => {
  console.log("running server");
});
