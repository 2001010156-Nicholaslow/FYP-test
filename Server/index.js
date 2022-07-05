require("dotenv").config();

const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const JWTKey = "abc";
const bcrypt = require("bcrypt"); //for hashing
const { response } = require("express");
const saltRounds = 10; //for hashing
const bodyParser = require("body-parser"); //session and cookies
const cookieParser = require("cookie-parser"); //session and cookies
const session = require("express-session"); //session and cookies

const { sendConfirmationEmail } = require("./mailer");

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
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    key: "userId", //email
    secret: "nicholaslow", //important! remember to change
    resave: false,
    saveUninitialized: false,
    cookies: {
      expires: 21600, //6hours (60 * 60 * 6)
    },
  })
);

//Admin
app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  db.query(
    "SELECT * FROM admin WHERE email =? and password =?",
    [email, password],
    (err, results) => {
      if (err) {
        res.status(401).send({ err: err });
      }
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

//Admin Manage Users
app.get("/admin_get_users", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) {
      res.status(401).send({ err: err });
    } else {
      res.status(200).send(results);
    }
  });
});

app.put("/admin_update_users", (req, res) => {
  const full_name = req.body.full_name;
  const email = req.body.email;
  const education = req.body.education;
  const contact_number = req.body.contact_number;
  const gender = req.body.gender;
  const citizenship = req.body.citizenship;
  const address = req.body.address;
  const postalcode = req.body.postalcode;
  const country = req.body.country;
  const user_id = req.body.user_id;
  console.log(req.body);
  db.query(
    "UPDATE users SET full_name=?,email=?,education=?,contact_number=?,gender=?,citizenship=?,address=?,postalcode=?,country=? WHERE user_id =?",
    [
      full_name,
      email,
      education,
      contact_number,
      gender,
      citizenship,
      address,
      postalcode,
      country,
      user_id,
    ],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(401).send({ err: err });
      } else {
        res.status(200).send(results);
      }
    }
  );
});

app.put("/admin_delete_users", (req, res) => {
  const user_id = req.body.user_id;
  console.log(req.body);
  db.query("DELETE FROM users WHERE user_id =?", [user_id], (err, results) => {
    if (err) {
      console.log(err);
      res.status(401).send({ err: err });
    } else {
      res.status(200).send(results);
    }
  });
});

//Admin Manage Opportunities
app.get("/admin_get_opp", (req, res) => {
  db.query("SELECT * FROM opportunity", (err, results) => {
    if (err) {
      res.status(401).send({ err: err });
    } else {
      res.status(200).send(results);
    }
  });
});
app.put("/admin_update_opp", (req, res) => {
  const opp_id = req.body.opp_id;
  const name = req.body.name;
  const position_level = req.body.position_level;
  const salary = req.body.salary;
  const job_scope = req.body.job_scope;
  const description = req.body.description;
  const additional_requirements = req.body.additional_requirements;
  console.log(req.body);
  db.query(
    "UPDATE opportunity SET name=?,position_level=?,salary=?,job_scope=?,description=?,additional_requirements=? WHERE opp_id =?",
    [
      name,
      position_level,
      salary,
      job_scope,
      description,
      additional_requirements,
      opp_id,
    ],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(401).send({ err: err });
      } else {
        res.status(200).send(results);
      }
    }
  );
});

app.put("/admin_delete_opp", (req, res) => {
  const opp_id = req.body.opp_id;
  console.log(req.body);
  db.query(
    "DELETE FROM opportunity WHERE opp_id =?",
    [opp_id],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(401).send({ err: err });
      } else {
        res.status(200).send(results);
      }
    }
  );
});

//Admin Manage Partners
app.get("/admin_get_partners", (req, res) => {
  db.query("SELECT * FROM partners", (err, results) => {
    if (err) {
      res.status(401).send({ err: err });
    } else {
      res.status(200).send(results);
    }
  });
});

app.put("/admin_verify_partner", (req, res) => {
  const partner_id = req.body.partner_id;
  console.log(req.body);
  db.query(
    "UPDATE partners SET verified=1 WHERE partners_id =?",
    [partner_id],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(401).send({ err: err });
      } else {
        res.status(200).send(results);
      }
    }
  );
});

app.put("/admin_update_partner", (req, res) => {
  const partners_id = req.body.partners_id;
  const contact_name = req.body.contact_name;
  const email = req.body.email;
  const contact_number = req.body.contact_number;
  console.log(req.body);
  db.query(
    "UPDATE partners SET contact_name=?, email=?, contact_number=? WHERE partners_id =?",
    [contact_name, email, contact_number, partners_id],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(401).send({ err: err });
      } else {
        res.status(200).send(results);
      }
    }
  );
});

app.put("/admin_delete_partner", (req, res) => {
  const partners_id = req.body.partners_id;
  console.log(req.body);
  db.query(
    "DELETE FROM partners WHERE partners_id =?",
    [partners_id],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(401).send({ err: err });
      } else {
        res.status(200).send(results);
      }
    }
  );
});

//Admin Manage Reviews
app.get("/admin_get_reviews", (req, res) => {
  db.query(
    "SELECT r.review_id,r.review,r.rating,u.full_name,p.company_name FROM review r,users u,partners p WHERE u.user_id=r.user_id AND p.partners_id=r.partners_id",
    (err, results) => {
      if (err) {
        res.status(401).send({ err: err });
      } else {
        res.status(200).send(results);
      }
    }
  );
});
app.put("/admin_update_reviews", (req, res) => {
  const review_id = req.body.review_id;
  const review = req.body.review;
  const rating = req.body.rating;
  console.log(req.body);
  db.query(
    "UPDATE review SET review=?, rating=? WHERE review_id =?",
    [review, rating, review_id],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(401).send({ err: err });
      } else {
        res.status(200).send(results);
      }
    }
  );
});

app.put("/admin_delete_review", (req, res) => {
  const review_id = req.body.review_id;
  console.log(req.body);
  db.query(
    "DELETE FROM review WHERE review_id =?",
    [review_id],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(401).send({ err: err });
      } else {
        res.status(200).send(results);
      }
    }
  );
});

//Stats

function getCustomerCount( callback ){    
  var count = 0;  
  db.transaction(function(tx) {   
  tx.executeSql('SELECT * FROM users WHERE last_login>=CURDATE();', [], function(tx, results) {
           // this function is called when the executeSql is ended
           count = results.rows.length;
           callback( count );   // <-- call the callback when is done   
      });
  });
}

//End of Admin

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

  bcrypt.hash(password, saltRounds, (err, hash) => {
    //hashing

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
        const Uid = result.insertId;
        const token = jwt.sign({ Uid }, "jwtSecret"); //remember to change secret! important
        const newUser = { email, fullname };
        sendConfirmationEmail({ toUser: newUser, ConfirmationCode: token });
      }
    );
  });
});

//client - PartnerRegister
app.post("/PartnerConfirmation", (req, res) => {
  const fullname = req.body.fullname;
  const password = req.body.password;
  const email = req.body.email;
  const num = req.body.num;
  const businessname = req.body.businessname;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    //hashing
    db.query(
      "INSERT INTO partners (email, company_name, contact_name, contact_number, password) VALUES (?,?,?,?,?)",
      [email, businessname, fullname, num, hash],
      (err, result) => {
        const id = result.insertId;
        const token = jwt.sign({ id }, "jwtSecret", {
          //remember to change secret! important
          expiresIn: "3h",
        });
        const newUser = { email, fullname };
        sendConfirmationEmail({ toUser: newUser, ConfirmationCode: token });
      }
    );
  });
});
app.get("/confirm/:confirmationCode");

//Partner Verify email check
app.post("/Partneremailverifycheck", (req, res) => {
  const email = req.body.email;
  const emailverify = 0;
  db.query(
    "SELECT * FROM partners WHERE email = ? AND emailverify = ?",
    [email, emailverify],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        if (result.length > 0) {
          res.send({
            message: "Your account is not verified. Please check your Email.",
          });
        } else {
          res.send(result);
        }
      }
    }
  );
});

//User Verify email check
app.post("/Useremailverifycheck", (req, res) => {
  const email = req.body.email;
  const emailverify = 1;
  db.query(
    "SELECT * FROM users WHERE email = ? AND not_verify = ?",
    [email, emailverify],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        if (result.length > 0) {
          res.send({
            message: "Your account is not verified. Please check your Email.",
          });
        } else {
          res.send(result);
        }
      }
    }
  );
});

//partner verify email
app.post("/PartnerEmailVerify", (req, res) => {
  const verified = 1;
  const id = req.body.Pid;
  db.query("UPDATE partners SET emailverify = ? WHERE partners_id = ?", [
    verified,
    id,
  ]);
});

//User verify email
app.post("/UserEmailVerify", (req, res) => {
  const id = req.body.Uid;
  const verified = 0;
  db.query("UPDATE users SET not_verify= ? WHERE user_id = ?", [verified, id]);
});

//Partners Add job
app.post("/JobAddFormADD", (req, res) => {
  const name = req.body.JobTitle;
  const Companyname = req.body.fullname;
  const position_level = req.body.position_level;
  const required_yrs = req.body.required_yrs;
  const job_scope = req.body.job_scope;
  const job_specialization = req.body.job_specialization;
  const description = req.body.description;
  const location = req.body.location;
  const salary = req.body.salary;
  const qualification = req.body.qualification;
  const additional_requirements = req.body.additional_requirements;
  const UID = req.body.Uid;

  db.query(
    "INSERT INTO opportunity (name, company_name, position_level, required_yrs, job_scope, industry, description, location, salary, qualification, additional_requirements, fk_partners_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",
    [
      name,
      Companyname,
      position_level,
      required_yrs,
      job_scope,
      job_specialization,
      description,
      location,
      salary,
      qualification,
      additional_requirements,
      UID,
    ],
    (err, result) => {
      //console.log(err);
      // console.log(result);
    }
  );
});

//Partner Update job

app.put("/JobAddFormUpdate", (req, res) => {
  const name = req.body.JobTitle;
  const Companyname = req.body.fullname;
  const position_level = req.body.position_level;
  const required_yrs = req.body.required_yrs;
  const job_scope = req.body.job_scope;
  const job_specialization = req.body.job_specialization;
  const description = req.body.description;
  const location = req.body.location;
  const salary = req.body.salary;
  const qualification = req.body.qualification;
  const additional_requirements = req.body.additional_requirements;
  const UID = req.body.Uid;
  const opp_id = req.body.oid;

  db.query(
    "UPDATE opportunity SET name = ?, company_name = ?, position_level = ?, required_yrs = ?, job_scope = ?, industry = ?, description = ?, location = ?, salary = ?, qualification = ?, additional_requirements= ?, created_at= NOW() WHERE fk_partners_id = ? AND opp_id = ?",
    [
      name,
      Companyname,
      position_level,
      required_yrs,
      job_scope,
      job_specialization,
      description,
      location,
      salary,
      qualification,
      additional_requirements,
      UID,
      opp_id,
    ],
    (err, result) => {
      //console.log(err);
      //console.log(result);
    }
  );
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

  db.query(
    "SELECT * FROM partners WHERE email = ?;",
    [email],
    (err, result) => {
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
    }
  );
});

//Partner ACcount details check
app.post("/CheckPartnerCompleted", (req, res) => {
  const uid = req.body.user_id;

  db.query(
    "SELECT UEN FROM partners WHERE partners_id = ?;",
    [uid],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        let results = JSON.parse(JSON.stringify(result));
        var UENCheck = results[0].UEN;
        if (UENCheck == null || UENCheck == "") {
          res.send({
            message:
              "Your profile is not completed! \nPlease enter your UEN Registration number to get verified. Verifying your account will unlock necessary to complete your hiring process.",
          });
        }
      }
    }
  );
});

//partner count job
app.post("/CountPartnerJob", (req, res) => {
  const uid = req.body.user_id;

  db.query(
    "SELECT COUNT(opp_id) as cnt FROM opportunity WHERE fk_partners_id = ?;",
    [uid],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        //let results=JSON.parse(JSON.stringify(result))
        let count = result[0].cnt;
        res.send(count + "");
      }
    }
  );
});

//Partner Job Ad Listing
app.post("/PartnerJobAdList", (req, res) => {
  const uid = req.body.user_id;

  db.query(
    "SELECT * FROM opportunity WHERE fk_partners_id = ? ORDER BY created_at DESC;",
    [uid],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        let results = JSON.parse(JSON.stringify(result));
        res.send(results);
      }
    }
  );
});

//Partner Job Ad ListingUpdate
app.post("/PartnerJobAdListUpdate", (req, res) => {
  const uid = req.body.user_id;
  const oid = req.body.oid;

  db.query(
    "SELECT * FROM opportunity WHERE fk_partners_id = ? AND opp_id = ?;",
    [uid, oid],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        let results = JSON.parse(JSON.stringify(result));
        res.send(results);
      }
    }
  );
});

//Listing DELETE
app.delete("/api/deleteListing/:opp_id", (req, res) => {
  const name = req.params.opp_id;
  const sqlDelete = "Delete FROM opportunity WHERE opp_id = ?";

  db.query(sqlDelete, name, (err, result) => {
    if (err) {
      console.log("err");
    } else {
      res.send({ message: "Delete Successful." });
    }
  });
});

//check session for login
app.get("/loginSession", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

const verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    res.send("You need a token. Try again later.");
  } else {
    jwt.verify(token, "jwtSecret", (err, decoded) => {
      if (err) {
        res.json({ auth: false, message: " Authentication Failed." });
      } else {
        req.userId = decoded.id;
        next();
      }
    });
  }
};

//check for auth
app.get("/isAuth", verifyJWT, (req, res) => {
  res.send("You are authenticated.");
});

//client Login
app.post("/ClientLogin", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.query("SELECT * FROM users WHERE email = ?;", [email], (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (error, response) => {
          if (response) {
            const Uid = result[0].user_id;
            const token = jwt.sign({ Uid }, "jwtSecret", {
              //remember to change secret! important
              expiresIn: "3h",
            });
            req.session.user = result;

            res.json({ auth: true, token: token, result: result });
          } else {
            res.send({ message: "Wrong password!" });
          }
        });
      } else {
        res.json({ auth: false, message: "Wrong Email/Password combination!" });
      }
    }
  });
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
            if (response) {
              const id = result[0].partners_id;
              const token = jwt.sign({ id }, "jwtSecret", {
                //remember to change secret! important
                expiresIn: "3h",
              });
              req.session.user = result;
              res.json({ auth: true, token: token, result: result });
            } else {
              res.send({ message: "Wrong password!" });
            }
          });
        } else {
          res.json({
            auth: false,
            message: "Wrong Email/Password combination!",
          });
        }
      }
    }
  );
});

//get user_details (Partners)
app.post("/LoginCheckPartner", (req, res) => {
  const partners_id = req.body.user_id;

  db.query(
    "SELECT company_name FROM partners WHERE partners_id = ?;",
    [partners_id],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result[0].company_name);
      }
    }
  );
});

//get user_details (Users)
app.post("/LoginCheckUser", (req, res) => {
  const users_id = req.body.user_id;

  db.query(
    "SELECT full_name FROM users WHERE users_id = ?;",
    [users_id],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result[0].full_name);
      }
    }
  );
});

// listen App
app.listen(3001, () => {
  console.log("running server");
});
