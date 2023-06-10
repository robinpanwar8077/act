import React, { useState,useEffect } from "react";
import {
  AiFillCaretDown,
  AiOutlineClose,
  AiOutlineMinus,
} from "react-icons/ai";

import { AiOutlineLock } from "react-icons/ai";
import { FaChevronLeft } from "react-icons/fa";
import { GiCheckMark } from "react-icons/gi";
import Header from "../Header";
import { Modal } from "react-bootstrap";
import axios from "axios";

export default function DiscipleForgetPassword() {
  const [recoverEmail, setRecoverEmail] = useState(
      {email : "",}
  );
  const [show, setShow] = useState(false);
  
  const handleClose = () => setShow(false);
  



  const onSubmit = async (event) => {
    console.log(recoverEmail,"kjghfhfd")
    getid(recoverEmail)
    event.preventDefault();
    if(!recoverEmail.email){
      alert("Please Enter Email");
    }else{
      const newData = {...recoverEmail,};
      try{
        const config = {
          headers:{
            "Content-Type":"Application/json",
          },
        };
        const url = "api/forget-password/";
        const body = JSON.stringify(newData);
        const res = await axios.post(url,body,config)
        if(res.data = `Reset Password Link Send Successfully` && res.status === 200){
          setRecoverEmail(res)
          console.log("shantanu",res)
          
          setShow(true);
          console.log(true);
        }
      }catch(err){
        alert("error");
      }
    }
    // setRecoverEmail(recoverEmail)
    console.log(recoverEmail)

};



  const getid=() => {
  const url = 'https://act.cladev.com/api/get-user-by-email/';
  const body = JSON.stringify({email:recoverEmail.email});
  console.log("asdf",body)
  const config = {
    headers:{
      "Content-Type":"Application/json",
    },}
   axios.post(url,body,config).then((result)=>{
    if (result.status === 200) {
      localStorage.setItem("recovery",JSON.stringify(result.data));
  }

 
  setRecoverEmail(result.data.user.email)



 
  

   
   }) 
   .catch(err => console.log("error rj",err));
   console.log("bholu",recoverEmail)
 };

  const Onchange = (e) => {
      const inputValue=e.target.value;
      const inputName=e.target.name;
      setRecoverEmail({...recoverEmail,[inputName]:inputValue});
    };
    console.log(recoverEmail);

  return (
    <div className="mentor-forget-password padding-top">
      <Header heading="Forgot Password" back={<FaChevronLeft />} path="/login" />

      <div className="container">
        <div className="forget-password">
          <div className="lock-icon">
            <AiOutlineLock />
          </div>



          
          <h2>Forgot your Password?</h2>

          <div className="login-form forget-password-page">
            <form onSubmit={onSubmit} autoComplete="off">
              <div className="input-field">
                <input
                  type="email"
                  placeholder="Email ID"
                  name="email"
                  value={recoverEmail.email}
                  onChange={Onchange}
                  required
                />
              </div>
              <div className=" input-field submit">
                <input type="submit" value="SUBMIT" />
              </div>
            </form>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose} closebutton>
        <div className="popup-content error">
          <span onClick={handleClose}>
            <AiOutlineClose />
          </span>
         
          <p> Your reset password link has been sent to your registerd mail id</p>
        </div>
      </Modal>
    </div>
  );
}


