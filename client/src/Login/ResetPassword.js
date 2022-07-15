import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { GrUserExpert } from "react-icons/gr";
import Axios from "axios";
import './Welcome.css';
import jwt_decode from 'jwt-decode';
import { Form, Alert } from 'react-bootstrap';


const ResetPassword = (req) => {

  const params = useParams();
  const user_id = params.ConfirmationCode
  var decoded = jwt_decode(user_id);
  const nav = useNavigate();
  const [Navlink, SetNavlink] = useState("");
  const [NewPassword, SetNewPassword] = useState("");
  const [checkPassword, SetcheckPassword] = useState("");
  const [LoginMSG, SetLoginMSG] = useState("");
  const [LoginStatus, SetLoginStatus] = useState(false);


  const resetPassword = () => {
    if (NewPassword === "" || checkPassword === "" || NewPassword.length > 7) {
      SetLoginMSG("Password need to be more than 7 characters.")
      SetLoginStatus(true)
    } else {
      if (NewPassword === checkPassword) {

        if (decoded.id) {
          const Pid = decoded.id
          Axios.post("http://localhost:3001/PartnerPasswordReset", {
            NPS: NewPassword,
            Pid: Pid
          })
          SetNavlink("../Login/PartnerLogin")

        } else if (decoded.Uid) {
          const Uid = decoded.id
          //password reset here
          Axios.post("http://localhost:3001/UserPasswordReset", {
            NPS: NewPassword,
            Uid: Uid
          })
          SetNavlink("../Login/Login")
        } else {
          nav("../")
        }
      } else {
        SetLoginMSG("Password are not the same.")
        SetLoginStatus(true)
      }
    }


  }

  return (
    <div className="container_welcome">
      <header className="jumbotron">
        <div className="icon_welcome">
        {LoginStatus && <Alert variant="warning" >{LoginMSG}</Alert>}
          <h1 className="image_icon_welcome"><GrUserExpert /></h1>
          <h3><strong>Reset Password!</strong></h3>
          <div className="welcome_text">
            <p1>Please enter your new password.</p1>
            <Form>
              <input type="password" classname="login_box" placeholder="Password" onChange={(e) => { SetNewPassword(e.target.value) }} style={{ marginTop: 10 }} required />
              <br></br>
              <input type="password" classname="login_box" placeholder="Password" onChange={(e) => { SetcheckPassword(e.target.value) }} style={{ marginTop: 10 }} required />
              <br></br>
            </Form>
          </div>
        </div>
        <button className='login_button' type="submit" onClick={resetPassword} style={{ marginTop: 20, marginBottom: 20, alignItems: 'center' }} >Confirm</button>
      </header>

    </div>
  );
};

export default ResetPassword;