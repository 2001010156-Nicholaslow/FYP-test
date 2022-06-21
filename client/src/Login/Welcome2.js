import React, {useEffect, useState} from 'react';
import { Link, useParams, useNavigate } from "react-router-dom";
import { GrUserExpert } from "react-icons/gr";
import './Welcome.css';
import jwt_decode from 'jwt-decode';

//Partner

const Welcome2 = (req) => {

  const params = useParams();
  const user_id = params.ConfirmationCode
  var decoded = jwt_decode(user_id);
  const nav = useNavigate();
  const [Navlink, SetNavlink] = useState("");


  useEffect(() => {
  if(decoded.id){
    console.log(decoded.id + "oo");
    SetNavlink("../Login/PartnerLogin")

  }else if (decoded.Uid) {
    console.log(decoded.Uid);
    SetNavlink("../Login/Login")
  } else {
    nav("../")
  }
}, [])
  
  return (
    <div className="container_welcome">
      <header className="jumbotron">
        <div className="icon_welcome">
        <h1 className="image_icon_welcome"><GrUserExpert/></h1>
        <h3><strong>Account Confirmed!</strong></h3>
        </div>
      </header>
      <Link to={Navlink} className="nav-link">
        Click here to login
      </Link>
    </div>
  );
};

export default Welcome2;