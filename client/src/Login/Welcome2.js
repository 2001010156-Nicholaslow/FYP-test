import React, {useEffect, useState} from 'react';
import { Link, useParams, useNavigate } from "react-router-dom";
import { GrUserExpert } from "react-icons/gr";
import Axios from "axios";
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
    const Pid = decoded.id
   Axios.post("http://localhost:3001/PartnerEmailVerify", {
      Pid: Pid
  })
    SetNavlink("../Login/PartnerLogin")

  }else if (decoded.Uid) {
    const Uid = decoded.Uid
     Axios.post("http://localhost:3001/UserEmailVerify", {
      Uid: Uid
  })
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
        <div className="welcome_text">
          <p1>Congratulations your account has been activated. Click the link below to login.</p1>
          </div>
        </div>
        <Link to={Navlink} className="nav-link_welcome"><button className='button_welcome'>Click here to login</button></Link>
      </header>

    </div>
  );
};

export default Welcome2;