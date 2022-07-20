import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { RiLockPasswordLine } from "react-icons/ri";
import Axios from "axios";
import './Welcome.css';
import jwt_decode from 'jwt-decode';
import { Form, Alert } from 'react-bootstrap';
import Popup from '../Partner/Popup';
import '../Partner/Popup.css';
import { GrStatusGood } from "react-icons/gr";
import '../success.css';

const ResetPassword = (req) => {

  const params = useParams();
  const user_id = params.PasswordReset
  var decoded = jwt_decode(user_id);
  const nav = useNavigate();
  const [Navlink, SetNavlink] = useState("");
  const [NewPassword, SetNewPassword] = useState("");
  const [checkPassword, SetcheckPassword] = useState("");
  const [LoginMSG, SetLoginMSG] = useState("");
  const [LoginStatus, SetLoginStatus] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    nav(Navlink)
  }

  const resetPassword = () => {
    if (NewPassword === "" || checkPassword === "" || NewPassword.length < 8) {
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
          setIsOpen(true)
          SetNavlink("../Login/PartnerLogin")

        } else if (decoded.Uid) {
          const Uid = decoded.Uid
          //password reset here
          Axios.post("http://localhost:3001/UserPasswordReset", {
            NPS: NewPassword,
            Uid: Uid
          })
          setIsOpen(true)
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
      <header className="jumbotron" style={{ width: "60%" }}>
        <div className="icon_welcome">
          {LoginStatus && <Alert variant="warning" >{LoginMSG}</Alert>}
          <h1 className="image_icon_welcome"><RiLockPasswordLine /></h1>
          <h3><strong>Reset Password!</strong></h3>

          <p1>Please enter your new password.</p1>
          <div>
            <Form>
              <input type="password" classname="login_box" placeholder="Password" onChange={(e) => { SetNewPassword(e.target.value) }} style={{ marginTop: 10 }} required />
              <br></br>
              <input type="password" classname="login_box" placeholder="Confirm Password" onChange={(e) => { SetcheckPassword(e.target.value) }} style={{ marginTop: 10 }} required />
              <br></br>
            </Form>
            <button className='login_button' type="submit" onClick={resetPassword} style={{ marginTop: 20, marginBottom: 20, alignItems: 'center', width: "100%" }} >Confirm</button>
          </div>

        </div>
      </header>
      {isOpen && <Popup
        content={<>
          <div style={{padding : 10}}>
            <div className="success_image">
              <h1 className="image_icon_success"><GrStatusGood /></h1>
            </div>
            <div className="icon_success_reset">
              <h3><strong>Password Change Succes</strong></h3>
              <p>You have successfully change your password.</p>
              <button className='login_button' onClick={togglePopup} style={{ marginTop: 20, marginBottom: 20, alignItems: 'center', width: "30%", marginLeft: "24%" }} >Login</button>

            </div>
          </div>
        </>}
        handleClose={togglePopup}
      />}
    </div>
  );
};

export default ResetPassword;