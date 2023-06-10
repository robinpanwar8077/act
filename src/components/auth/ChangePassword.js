import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import React, { useState } from "react";
import { AiOutlineLock } from "react-icons/ai";
import Header from "../../components/Header";
import {Link} from "react-router-dom";
import axios from 'axios';
import { Modal } from "react-bootstrap";
import { GiCheckMark } from "react-icons/gi";
import { useParams } from 'react-router';

import {
  AiFillCaretDown,
  AiOutlineClose,

  AiOutlineMinus,
} from "react-icons/ai";
import { useHistory } from 'react-router-dom';

export default function ChangePassword(props) {

  const [resetPassword, setResetPassword] = useState({

    newPassword: "",
    confirmPassword: "",
  });
  
  const history = useHistory();
  console.log("props",props)
  const [valid, setValid] = useState({});
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [error, setError] = useState(false);
  const closePopup = () => setError(false);



  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
  const PasswordVisiblity = () => {
    setPasswordShown(!passwordShown)
  }

  const confirmPasswordVisiblity = () => {
    setConfirmPasswordShown(!confirmPasswordShown)
  }
  var usr = JSON.parse(localStorage.getItem('user'))
  console.log(usr,"asdfghijkl")
  
 
  const config = {
    headers:{
      "Content-Type":"Application/json",
    },}
  const onSubmit = (e) => {
    e.preventDefault()
    const url = 'api/reset-password/';
    const body = JSON.stringify({ id :usr.id,new_password: resetPassword.newPassword, confirm_password:resetPassword.confirmPassword});
    console.log(body)
    
    axios.post(url,body,config).then((result)=>{
      setResetPassword(result.data)
      setShow(true);
      console.log(resetPassword,"asdfghijkl")
    }).catch((error) => {
      console.log("error from api", error)

      setError(true)
    })

  };
    
  const Onchange = (e) => {
    const inputValue=e.target.value;
    const inputName=e.target.name;
    console.log(inputName);
    setResetPassword({
      ...resetPassword,
      [inputName]: inputValue
    })
   
 
 
}  

  
  
  console.log(resetPassword)
  return (
    <div className="reset-password-page mentor-forget-password">

      <Header heading="Change Password" />

      <div className="container">
        <div className="forget-password">
          <div className="lock-icon">
            <AiOutlineLock />
          </div>
          <h2>Change your Password?</h2>
          <p className="text-center mt-1">
            You've Successfully verified your account.Enter new password below.
          </p>
          <div className="login-form forget-password-page reset-password">
            <form onSubmit={onSubmit} autoComplete="off">
           
              <div className="input-field">
                <input
                  type={passwordShown ? "text" : "password"}
                  placeholder="New Password"
                  name="newPassword"
                  onChange={Onchange}
                  required

                />
                <span className="hide" onClick={PasswordVisiblity}>
                  {

                    passwordShown ? <AiOutlineEye /> : <AiOutlineEyeInvisible />
                  }
                </span>
              </div>
              <div className="input-field">
                <input
                  type={passwordShown ? "text" : "password"}
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  onChange={Onchange}
                  required
                />
                <span className="hide" onClick={confirmPasswordVisiblity}>
                  {

                    passwordShown ? <AiOutlineEye /> : <AiOutlineEyeInvisible />
                  }
                </span>
              </div>
              
              {/* <div className=" input-field submit">
                <input type="submit" value="SUBMIT" />
              </div> */}
                    <Link to="/home">  <button type="button" class="btn btn-secondary can" >Cancel</button></Link>
                  <button type="submit"  class="btn btn-secondary sub">Submit</button>
       
       
              {/* <p>
                Not a User?
                <Link to="/welcome" className="apply-now">
                  Login
                </Link>
              </p> */}
            </form>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
          <div className="popup-content success">
          <Link to="/home">   <span onClick={handleClose}>
            <AiOutlineClose />
          </span>
</Link>         
            <h3>Congratulation !!!</h3>
            <p>You've been Reset Password Successfully </p>
          </div>
        </Modal>
        <Modal show={error} onHide={closePopup}>
          <div className="popup-content error">
            <span onClick={closePopup}>
              <AiOutlineClose />
            </span>
            <div>
            <h3>Did Not Match Password </h3>
             
</div>
          </div>
        </Modal>
    </div>
  );
}
