import React, {useState, useEffect} from "react";
import './App.css';
import Axios from 'axios'

function App() {

const [Listings, setListings] = useState('')
const [descr, setDescr] = useState('')
const [DescrList, setDescrList] = useState([])

const[newDescr, setNewDescr] = useState("")

useEffect(() => {
  Axios.get("http://localhost:3001/api/get").then((Response)=> {
    setDescrList(Response.data)
  });
}, [])

const submitReview = () => {
  Axios.post("http://localhost:3001/api/insert", {movieName : Listings, movieReview : descr});

    setDescrList([...DescrList,{movieName: Listings, movieReview: descr}]);
};// using axios

const deleteReview = (movie) => {
  Axios.delete(`http://localhost:3001/api/delete/${movie}`)
};

const updateReview = (movie) => {
  Axios.put("http://localhost:3001/api/update/", {movieName : movie, movieReview : newDescr});
  //setNewReview("") //clear it for new review
};






  return (
    <div className="App">
      <h1>Hello</h1>
      
      <div className='form'> 
        <label>Listings:</label>
        <input type="text" name="movieName" onChange={(e)=> {
          setListings(e.target.value)
        }}/>
        <label>Job description:</label>
        <input type="text" name="review" onChange={(e)=> {
          setDescr(e.target.value)
        }}/>

        <button onClick={submitReview}>Submit</button>

        {DescrList.map((val) => {
          return(
            <div className="card">
            <h1>{val.movieName}</h1>
            <p>{val.movieReview}</p>

            <button onClick={() => {deleteReview(val.movieName)}}>Delete</button>
            <input type="text" id ="updateinput" onChange={(e) => {
              setNewDescr(e.target.value)
            }}/>
            <button onClick={() => {updateReview(val.movieName)}}>Update</button>
            </div>
            
          );
           } )}
        
    </div>
    </div>
  );
}

export default App;
