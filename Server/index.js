require("dotenv").config();

const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const JWTKey = "abc";
const bcrypt = require("bcrypt"); //for hashing
const { response } = require("express");
const saltRounds = 10; //for hashing
const bodyParser = require("body-parser"); //session and cookies
const cookieParser = require("cookie-parser"); //session and cookies
const session = require("express-session"); //session and cookies

const { sendConfirmationEmail } = require("./mailer");
const { sendPasswordResetEmailconfirm } = require("./mailerPSconfirm");
const { sendPasswordResetEmail } = require("./mailerPS");
const { sendNotifaEmail } = require("./mailerNotification");

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

// Get fav
app.get("/profile_get_fav", (req, res) => {
  db.query("SELECT * FROM user_fav", (err, results) => {
    if (err) {
      res.status(401).send({ err: err });
    } else {
      res.status(200).send(results);
    }
  });
});

// User Fav
app.post("/profile_save_fav", (req, res) => {
  const user_id = req.body.user_id;
  const opp_id = req.body.opp_id;

  db.query(
    "INSERT INTO user_fav (user_id, opp_id) VALUES (?,?)",
    [user_id, opp_id],
    (err, results) => {
      if (err) {
        res.status(401).send({ err: err });
      } else {
        res.status(200).send(results);
      }
    }
  );
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

//Client - Profile
app.get("/users/:id", (req, res) => {
  const id = req.params.id;

  db.query(
    "SELECT user_id, full_name, email, dob, gender, contact_number, user_bio, postalcode, education, country, citizenship, address FROM users WHERE user_id = '" +
      id +
      "'",
    (err, results) => {
      if (err) {
        res.status(400).send({ err: err });
      } else {
        if (results.length == 0)
          // not found
          res.status(404).send();
        res.status(200).send(results[0]);
      }
    }
  );
});

//Client - PartnerProfile
app.get("/partners/:id", (req, res) => {
  const id = req.params.id;

  db.query(
    "SELECT email, company_name, contact_name, contact_number, UEN, company_industry, company_overview FROM partners WHERE partners_id = '" +
      id +
      "'",
    (err, results) => {
      if (err) {
        res.status(400).send({ err: err });
      } else {
        if (results.length == 0)
          // not found
          res.status(404).send();
        res.status(200).send(results[0]);
      }
    }
  );
});

//Client - Application
app.get("/opportunity/:id", (req, res) => {
  const id = req.params.id;

  db.query(
    "SELECT * FROM opportunity WHERE opp_id='" + id + "'",
    (err, results) => {
      if (err) {
        res.status(401).send({ err: err });
      } else {
        if (results.length == 0)
          // not found
          res.status(404).send();
        res.status(200).send(results[0]);
      }
    }
  );
});

app.post("/opportunity/:id/apply", (req, res) => {
  const id = req.params.id;
  const f = req.files;

  if (f == null) res.status(406).send("no file");

  console.log(f.File.name);

  db.query(
    "INSERT INTO application (file, status, user_id, opp_id) VALUES (?,?,?,?)",
    [f.File.data, "0", "2", id],
    (err, result) => {
      if (err) {
        res.status(401).send({ err: err });
      } else {
        res.status(200).send("okay");
      }
    }
  );
});

//Client - Review Application
app.get("/opportunity/:id/application", (req, res) => {
  const id = req.params.id;

  db.query(
    "SELECT * FROM application INNER JOIN users ON application.user_id = users.user_id WHERE opp_id='" +
      id +
      "'",
    (err, results) => {
      if (err) {
        res.status(401).send({ err: err });
      } else {
        if (results.length == 0)
          // not found
          res.status(404).send();
        res.status(200).send(results);
      }
    }
  );
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

//Admin reports
app.get("/admin_get_reports", (req, res) => {
  db.query("SELECT * FROM reports", (err, results) => {
    if (err) {
      res.status(401).send({ err: err });
    } else {
      res.status(200).send(results);
    }
  });
});

app.put("/admin_resolve_report", (req, res) => {
  const report_id = req.body.report_id;
  console.log(req.body);
  db.query(
    "UPDATE reports SET status='Resolved' WHERE report_id=?",
    [report_id],
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

app.put("/admin_delete_reports", (req, res) => {
  const report_id = req.body.report_id;
  console.log(req.body);
  db.query(
    "DELETE FROM reports WHERE report_id =?",
    [report_id],
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

app.get("/getUserCreated1", (req, res) => {
  db.query(
    "SELECT Count(user_id) AS count,CAST(Curdate() as Date) AS date FROM users\
    WHERE CAST(created_at as Date) =  CAST( curdate() as Date) \
    UNION\
    SELECT Count(user_id) AS count,CAST(Curdate() as Date) -interval 1 day AS date\
    FROM users\
    WHERE CAST(created_at as Date) =  CAST( curdate() as Date) -interval 1 day\
    UNION\
    SELECT Count(user_id) AS count,CAST(Curdate() as Date) -interval 2 day AS date\
    FROM users\
    WHERE CAST(created_at as Date) =  CAST( curdate() as Date) -interval 2 day\
    UNION\
    SELECT Count(user_id) AS count,CAST(Curdate() as Date) -interval 3 day AS date\
    FROM users\
    WHERE CAST(created_at as Date) =  CAST( curdate() as Date) -interval 3 day\
    UNION\
    SELECT Count(user_id) AS count,CAST(Curdate() as Date) -interval 4 day AS date\
    FROM users\
    WHERE CAST(created_at as Date) =  CAST( curdate() as Date) -interval 4 day\
    UNION\
    SELECT Count(user_id) AS count,CAST(Curdate() as Date) -interval 5 day AS date\
    FROM users\
    WHERE CAST(created_at as Date) =  CAST( curdate() as Date) -interval 5 day\
    UNION\
    SELECT Count(user_id) AS count,CAST(Curdate() as Date) -interval 6 day AS date\
    FROM users\
    WHERE CAST(created_at as Date) =  CAST( curdate() as Date) -interval 6 day\
    UNION\
    SELECT Count(user_id) AS count,CAST(Curdate() as Date) -interval 7 day AS date\
    FROM users\
    WHERE CAST(created_at as Date) =  CAST( curdate() as Date) -interval 7 day",
    (err, results) => {
      if (err) {
        res.status(401).send({ err: err });
      } else {
        res.status(200).send(results);
      }
    }
  );
});

app.get("/getPartnerCreated1", (req, res) => {
  db.query(
    "SELECT Count(partners_id) AS count,CAST(Curdate() as Date) AS date FROM partners\
    WHERE CAST(created_at as Date) =  CAST( curdate() as Date) \
    UNION\
    SELECT Count(partners_id) AS count,CAST(Curdate() as Date) -interval 1 day AS date\
    FROM partners\
    WHERE CAST(created_at as Date) =  CAST( curdate() as Date) -interval 1 day\
    UNION\
    SELECT Count(partners_id) AS count,CAST(Curdate() as Date) -interval 2 day AS date\
    FROM partners\
    WHERE CAST(created_at as Date) =  CAST( curdate() as Date) -interval 2 day\
    UNION\
    SELECT Count(partners_id) AS count,CAST(Curdate() as Date) -interval 3 day AS date\
    FROM partners\
    WHERE CAST(created_at as Date) =  CAST( curdate() as Date) -interval 3 day\
    UNION\
    SELECT Count(partners_id) AS count,CAST(Curdate() as Date) -interval 4 day AS date\
    FROM partners\
    WHERE CAST(created_at as Date) =  CAST( curdate() as Date) -interval 4 day\
    UNION\
    SELECT Count(partners_id) AS count,CAST(Curdate() as Date) -interval 5 day AS date\
    FROM partners\
    WHERE CAST(created_at as Date) =  CAST( curdate() as Date) -interval 5 day\
    UNION\
    SELECT Count(partners_id) AS count,CAST(Curdate() as Date) -interval 6 day AS date\
    FROM partners\
    WHERE CAST(created_at as Date) =  CAST( curdate() as Date) -interval 6 day\
    UNION\
    SELECT Count(partners_id) AS count,CAST(Curdate() as Date) -interval 7 day AS date\
    FROM partners\
    WHERE CAST(created_at as Date) =  CAST( curdate() as Date) -interval 7 day",
    (err, results) => {
      if (err) {
        res.status(401).send({ err: err });
      } else {
        res.status(200).send(results);
      }
    }
  );
});

//stats for partner side
app.get("/getPartnerViews", (req, res) => {
  db.query(
    "SELECT views AS count,CAST(Curdate() as Date) AS date FROM opportunity\
    WHERE CAST(created_at as Date) =  CAST( curdate() as Date) \
    UNION\
    SELECT views AS count,CAST(Curdate() as Date) -interval 1 day AS date\
    FROM opportunity\
    WHERE CAST(created_at as Date) =  CAST( curdate() as Date) -interval 1 day\
    UNION\
    SELECT views AS count,CAST(Curdate() as Date) -interval 2 day AS date\
    FROM opportunity\
    WHERE CAST(created_at as Date) =  CAST( curdate() as Date) -interval 2 day\
    UNION\
    SELECT views AS count,CAST(Curdate() as Date) -interval 3 day AS date\
    FROM opportunity\
    WHERE CAST(created_at as Date) =  CAST( curdate() as Date) -interval 3 day\
    UNION\
    SELECT views AS count,CAST(Curdate() as Date) -interval 4 day AS date\
    FROM opportunity\
    WHERE CAST(created_at as Date) =  CAST( curdate() as Date) -interval 4 day\
    UNION\
    SELECT views AS count,CAST(Curdate() as Date) -interval 5 day AS date\
    FROM opportunity\
    WHERE CAST(created_at as Date) =  CAST( curdate() as Date) -interval 5 day\
    UNION\
    SELECT views AS count,CAST(Curdate() as Date) -interval 6 day AS date\
    FROM opportunity\
    WHERE CAST(created_at as Date) =  CAST( curdate() as Date) -interval 6 day\
    UNION\
    SELECT views AS count,CAST(Curdate() as Date) -interval 7 day AS date\
    FROM opportunity\
    WHERE CAST(created_at as Date) =  CAST( curdate() as Date) -interval 7 day",
    (err, results) => {
      if (err) {
        res.status(401).send({ err: err });
      } else {
        res.status(200).send(results);
      }
    }
  );
});

// function getCustomerCount( callback ){
//   var count = 0;
//   db.transaction(function(tx) {
//   tx.executeSql('SELECT * FROM users WHERE last_login>=CURDATE();', [], function(tx, results) {
//            // this function is called when the executeSql is ended
//            count = results.rows.length;
//            callback( count );   // <-- call the callback when is done
//       });
//   });
// }

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

  console.log("1");
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
        console.log("2");
        const Uid = result.insertId;
        const token = jwt.sign({ Uid }, "jwtSecret"); //remember to change secret! important
        const newUser = { email, fullname };
        //sendConfirmationEmail({ toUser: newUser, ConfirmationCode: token });
        console.log("3");
        res.send(result);
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
app.get("/confirm/:confirmationCode"); //for mailerjs

app.get("/confirm/:PasswordReset"); //for mailerPS.js

//User Password reset email
app.post("/ClientPasswordForget", (req, res) => {
  const email = req.body.email;
  db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      let results = JSON.parse(JSON.stringify(result));
      const name = results[0].full_name;
      const Uid = results[0].user_id;
      const token = jwt.sign({ Uid }, "jwtSecret2"); //remember to change secret! important
      const UserDetails = { email, name };
      sendPasswordResetEmail({ toUser: UserDetails, PasswordReset: token });
    }
  });
});

//Partner Password reset email
app.post("/PartnerPasswordForget", (req, res) => {
  const email = req.body.email;
  db.query("SELECT * FROM partners WHERE email = ?", [email], (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      let results = JSON.parse(JSON.stringify(result));
      const name = results[0].company_name;
      const id = results[0].partners_id;
      const token = jwt.sign({ id }, "jwtSecret2"); //remember to change secret! important
      const UserDetails = { email, name };
      sendPasswordResetEmail({ toUser: UserDetails, PasswordReset: token });
    }
  });
});

//reset password Partner
app.post("/PartnerPasswordReset", (req, res) => {
  const Pid = req.body.Pid;
  const password = req.body.NPS;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    //hashing
    db.query(
      "UPDATE partners SET password = ? WHERE partners_id = ?",
      [hash, Pid],
      (err, result) => {
        if (err) {
          res.send({ err: err });
        } else {
          db.query(
            "SELECT * FROM partners WHERE partners_id = ?",
            [Pid],
            (err, result) => {
              if (err) {
                res.send({ err: err });
              } else {
                let results = JSON.parse(JSON.stringify(result));
                const name = results[0].company_name;
                const email = results[0].email;
                const UserDetails = { email, name };
                sendPasswordResetEmailconfirm({ toUser: UserDetails });
              }
            }
          );
        }
      }
    );
  });
});

//reset password User
app.post("/UserPasswordReset", (req, res) => {
  const Uid = req.body.Uid;
  const password = req.body.NPS;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    //hashing
    db.query(
      "UPDATE users SET password = ? WHERE user_id = ?",
      [hash, Uid],
      (err, result) => {
        if (err) {
          res.send({ err: err });
        } else {
          db.query(
            "SELECT * FROM users WHERE user_id = ?",
            [Uid],
            (err, result) => {
              if (err) {
                res.send({ err: err });
              } else {
                let results = JSON.parse(JSON.stringify(result));
                const name = results[0].full_name;
                const email = results[0].email;
                const UserDetails = { email, name };
                sendPasswordResetEmailconfirm({ toUser: UserDetails });
              }
            }
          );
        }
      }
    );
  });
});

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

//Partner stars rating
app.post("/getstars", (req, res) => {
  const Pid = req.body.Pid;
  db.query(
    "SELECT AVG(rating) as Average FROM review WHERE partners_id = ?;",
    [Pid],
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
//Partner stars rating total
app.post("/getstarsNum", (req, res) => {
  const Pid = req.body.Pid;
  db.query(
    "SELECT count(rating) as length FROM review WHERE partners_id = ?;",
    [Pid],
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

//reporting system
app.post("/HelpReport", (req, res) => {
  const report_type = req.body.report_type;
  const report_title = req.body.report_title;
  const report_text = req.body.report_text;
  const uid = req.body.user_id;

  db.query(
    "INSERT into reports (report_type, report_title, report_text, partners_id) VALUES (?,?,?,?)",
    [report_type, report_title, report_text, uid],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send({
          message: "Your Report has been send to an Admin.",
        });
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

//get stats (count applied)

app.post("/get_status_count2", (req, res) => {
  const Pid = req.body.Pid;
  const opp_id = req.body.result;

  db.query(
    "UPDATE opportunity SET applied = (SELECT count(*) AS ApplyTotal FROM (SELECT count(*) AS NumApply FROM application a, opportunity o WHERE o.fk_partners_id = ? AND a.opp_id = ?  GROUP BY a.id_application) AS FOO) WHERE opp_id = ?;",
    [Pid, opp_id, opp_id],
    (err, result) => {
      if (err) {
        res.status(401).send({ err: err });
      } else {
        let results = JSON.parse(JSON.stringify(result));
        //res.send(result)
        return;
      }
    }
  );
});

//get stats (views)
app.post("/get_status_view", (req, res) => {
  const Pid = req.body.Pid;

  db.query(
    "SELECT o.name,o.opp_id,o.views FROM application a, opportunity o WHERE o.fk_partners_id = ? GROUP BY o.opp_id;",
    [Pid],
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

//stats page partner
app.post("/get_status_view_final", (req, res) => {
  const Pid = req.body.Pid;

  db.query(
    "SELECT opp_id, views, name, applied, fk_partners_id FROM opportunity WHERE fk_partners_id = ?;",
    [Pid],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        let results = JSON.parse(JSON.stringify(result));
        res.send(results);
        //console.log(result)
      }
    }
  );
});

// stats total views
app.post("/get_total_views", (req, res) => {
  const Pid = req.body.Pid;

  db.query(
    "SELECT SUM(views) AS Vtotal FROM opportunity WHERE fk_partners_id = ?;",
    [Pid],
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

// stats total applied
app.post("/get_total_applied", (req, res) => {
  const Pid = req.body.Pid;

  db.query(
    "SELECT SUM(applied) AS Atotal FROM opportunity WHERE fk_partners_id = ?;",
    [Pid],
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

app.post("/users/save", verifyJWT, (req, res) => {
  console.log(req.body);
  console.log(req.userId);

  var decoded = jwt.decode(req.headers["x-access-token"]);
  console.log(decoded.Uid);

  db.query(
    "UPDATE users SET full_name=?, dob=?, gender=?, contact_number=?, user_bio=?, education=?, citizenship=?, address=?, country=?, postalcode=? WHERE user_id=?;",
    [
      req.body.fullName,
      req.body.dob,
      req.body.gender,
      req.body.number,
      req.body.bio,
      req.body.education,
      req.body.citizenship,
      req.body.address,
      req.body.country,
      req.body.postalcode,
      decoded.Uid,
    ],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.status(200).send(result);
      }
    }
  );
});

app.post("/partners/save", verifyJWT, (req, res) => {
  var decoded = jwt.decode(req.headers["x-access-token"]);
  console.log(decoded.id);

  db.query(
    "UPDATE partners SET company_name=?, contact_name=?, contact_number=?, UEN=?, company_industry=?, company_overview=? WHERE partners_id=?;",
    [
      req.body.companyName,
      req.body.contactName,
      req.body.contactNumber,
      req.body.UEN,
      req.body.companyIndustry,
      req.body.companyOverview,
      decoded.id,
    ],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.status(200).send(result);
      }
    }
  );
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

//get reviews for partners
app.post("/partners_reviews", (req, res) => {
  const PID = req.body.PID;
  db.query(
    "SELECT * FROM review WHERE partners_id = ?;",
    [PID],
    (err, results) => {
      if (err) {
        res.status(401).send({ err: err });
      } else {
        res.status(200).send(results);
      }
    }
  );
});

//get reviews for partners
app.post("/partners_reviews_top", (req, res) => {
  const PID = req.body.PID;
  db.query(
    "SELECT * FROM review WHERE partners_id = ? ORDER BY created_at desc LIMIT 3;",
    [PID],
    (err, results) => {
      if (err) {
        res.status(401).send({ err: err });
      } else {
        res.status(200).send(results);
      }
    }
  );
});

//get reviews for partners_rating_asec
app.post("/sort_partners_reviews1", (req, res) => {
  const PID = req.body.PID;
  db.query(
    "SELECT * FROM review WHERE partners_id = ? ORDER BY rating desc;",
    [PID],
    (err, results) => {
      if (err) {
        res.status(401).send({ err: err });
      } else {
        res.status(200).send(results);
      }
    }
  );
});

//get reviews for partners_rating_desc
app.post("/sort_partners_reviews2", (req, res) => {
  const PID = req.body.PID;
  db.query(
    "SELECT * FROM review WHERE partners_id = ? ORDER BY rating ASC;",
    [PID],
    (err, results) => {
      if (err) {
        res.status(401).send({ err: err });
      } else {
        res.status(200).send(results);
      }
    }
  );
});

//get reviews for sort date
app.post("/sort_partners_reviews3", (req, res) => {
  const PID = req.body.PID;
  db.query(
    "SELECT * FROM review WHERE partners_id = ? ORDER BY created_at desc;",
    [PID],
    (err, results) => {
      if (err) {
        res.status(401).send({ err: err });
      } else {
        res.status(200).send(results);
      }
    }
  );
});

//get reviews for sort date
app.post("/sort_partners_reviews4", (req, res) => {
  const PID = req.body.PID;
  const filterby = req.body.fillby;
  //console.log(filterby);
  db.query(
    "SELECT * FROM review WHERE partners_id = ? and rating = ?;",
    [PID, filterby],
    (err, results) => {
      if (err) {
        res.status(401).send({ err: err });
      } else {
        res.status(200).send(results);
      }
    }
  );
});

//get reviews for sort date
app.post("/sort_partners_reviews5", (req, res) => {
  const PID = req.body.PID;
  const filterby = req.body.fillby;
  //console.log(filterby);
  db.query(
    "SELECT * FROM review WHERE partners_id = ? and rating = ? ORDER BY created_at desc;",
    [PID, filterby],
    (err, results) => {
      if (err) {
        res.status(401).send({ err: err });
      } else {
        res.status(200).send(results);
      }
    }
  );
});

//search company
app.post("/company_search", (req, res) => {
  const search = req.body.searchV;
  const insert = '%' + search + '%'
  db.query(
    "SELECT * FROM fyp_db.partners WHERE admin_acc = 0 AND company_name LIKE ? AND emailverify = 1 AND verified = 0",
    [insert],
    (err, results) => {
      if (err) {
        res.status(401).send({ err: err });
      } else {
        res.status(200).send(results);
      }
    }
  );
});
//search company
app.post("/company_search2", (req, res) => {
  const search = req.body.searchF;
  db.query(
    "SELECT email,company_name,contact_number,UEN,company_industry,company_overview FROM fyp_db.partners WHERE partners_id = ?",
    [search],
    (err, results) => {
      if (err) {
        res.status(401).send({ err: err });
      } else {
        res.status(200).send(results);
      }
    }
  );
});

//get job details (company)
app.post("/getjobdetails", (req,res) => {
  const id = req.body.opp_id;

  db.query(
    "SELECT * FROM opportunity WHERE opp_id = ?;",
    [id],
    (err, result) => {
      if (err) {
        res.status(401).send({ err: err });
      } else {
        res.status(200).send(result);
      }
    })
})


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
