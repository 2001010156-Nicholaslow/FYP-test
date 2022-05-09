const express = require("express")
const bodyParser = require('body-parser')
const cors = require("cors")
const app = express()
const mysql = require("mysql")

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "cruddatabase"
});

app.use(cors());
app.use(express.json()) // use to pass the data into sql
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/get', (req,res)=> {
  const sqlSelect = "SELECT * FROM movie_reviews";
  db.query(sqlSelect ,(err,result) => {
    res.send(result);
  });
});

//ADD
app.post("/api/insert",(req,res)=> {

  const movieName = req.body.movieName
  const movieReview = req.body.movieReview 

  const sqlInsert = "INSERT INTO movie_reviews (movieName, movieReview) VALUES (?,?)" //? is for the sql variables
  db.query(sqlInsert, [movieName, movieReview] , (err,result)=> {
    console.log(result);
    console.log(err);
    
  })
})
//app.get("/", (req,res)=> {
    
  //  const sqlInsert = "INSERT INTO movie_reviews (movieName, movieReview) VALUES ('BEE Movie', 'Best movie');"
  //  db.query(sqlInsert, (err,result)=> {
  //      res.send("Hello nicholas  Error: " + console.log(err));
  //  })
//});

//DELETE
app.delete('/api/delete/:movieName', (req,res) => {
  const name = req.params.movieName;
  const sqlDelete = "Delete FROM movie_reviews WHERE movieName = ?";

  db.query(sqlDelete, name, (err,result) => {
    if (err) console.log(err);
  })
})

//UPDATE
app.put("/api/update", (req,res) => {
  const name = req.body.movieName;
  const review = req.body.movieReview
  const sqlUpdate = "UPDATE movie_reviews SET movieReview = ? WHERE movieName = ?";

  db.query(sqlUpdate, [review,name], (err,result) => {
    if(err) console.log(err)
  });
});

app.listen(3001,() =>{
    console.log("running on port 3001");
});