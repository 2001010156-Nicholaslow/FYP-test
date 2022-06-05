const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const JWTKey = "abc";
const bcrypt = require('bcrypt'); //for hashing
const { response } = require("express"); 
const saltRounds = 10; //for hashing
const bodyParser = require("body-parser"); //session and cookies
const cookieParser = require("cookie-parser"); //session and cookies
const session =require("express-session"); //session and cookies


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
    methods: ["GET", "POST"],
    credentials: true
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));

app.use(
  session({
  key: "userId", //email
  secret: "nicholaslow", //important! remember to change
  resave : false,
  saveUninitialized: false,
  cookies: {
    expires: 21600,  //6hours (60 * 60 * 6)
  }
}))

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

  bcrypt.hash(password, saltRounds, (err, hash) => { //hashing

    db.query(
      "INSERT INTO users (full_name, password, email, dob, gender, contact_number, education, citizenship, address, country, postalcode) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
      [
        fullname,
        hash,
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
  })
});

//client - PartnerRegister
app.post("/PartnerConfirmation", (req, res) => {
  const fullname = req.body.fullname;
  const password = req.body.password;
  const email = req.body.email;
  const num = req.body.num;
  const businessname = req.body.businessname;

  bcrypt.hash(password, saltRounds, (err, hash) => { //hashing
    db.query(
      "INSERT INTO partners (email, company_name, contact_name, contact_number, password) VALUES (?,?,?,?,?)",
      [
        email,
        businessname,
        fullname,
        num,
        hash
      ],
      (err, result) => {
        console.log(err);
        console.log(result);
      }
    );
  })
});

//youth emailcheck
app.post("/EmailCheck", (req, res) => {
  const email = req.body.email;

  db.query("SELECT * FROM users WHERE email = ?;", [email], (err, result) => {
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

  db.query("SELECT * FROM partners WHERE email = ?;", [email], (err, result) => {
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


//check session for login
app.get("/loginSession" , (req, res) => {
  if(req.session.user) {
    res.send({loggedIn: true, user: req.session.user});
  } else {
    res.send({ loggedIn: false})
  }
})

const verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"]

  if(!token) {
    res.send("You need a token. Try again later.")
  }else {
    jwt.verify(token, "jwtSecret", (err, decoded) => {
      if(err) {
        res.json({auth: false, message: " Authentication Failed."});
      } else {
        req.userId = decoded.id;
        next();
      }
    })
  }
}


//check for auth 
app.get("/isAuth", verifyJWT, (req, res) => {
  res.send("You are authenticated.")
})

//client Login
app.post("/ClientLogin", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.query(
    "SELECT * FROM users WHERE email = ?;",
    [email],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        if (result.length > 0) {
          bcrypt.compare(password, result[0].password, (error, response) => {
            if(response) {
              

              const id = result[0].id
              const token = jwt.sign({id}, "jwtSecret", {  //remember to change secret! important
                expiresIn: 300,
              })
              req.session.user = result;


              res.json({auth: true, token: token, result: result});
            } else {
              res.send({message : "Wrong password!"})
            }
          });
        } else {
          res.json({auth: false, message: "Wrong Email/Password combination!" });
        }
      }
    }
  );
});


//Login - Partner
app.post("/PartnerLogin", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.query(
    "SELECT * FROM partners WHERE email = ?;",
    [email],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        if (result.length > 0) {
          bcrypt.compare(password, result[0].password, (error, response) => {
            if(response) {
              const id = result[0].id
              const token = jwt.sign({id}, "jwtSecret", {  //remember to change secret! important
                expiresIn: 300,
              })
              req.session.user = result;
              res.json({auth: true, token: token, result: result});
            } else {
              res.send({message : "Wrong password!"})
            }
          })
        } else {
          res.json({auth: false, message: "Wrong Email/Password combination!" });
        }
      }
    }
  );
});

// listen App
app.listen(3001, () => {
  console.log("running server");
});
