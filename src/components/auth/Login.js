import {
  AiOutlineClose,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { Link, useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";

import { GiCheckMark } from "react-icons/gi";
import Loader from "../Loader";
import { Modal } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import axios from "axios";
import logo from "../../assets/images/logo";

export default function Login(props) {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState("");
  const [msgB, setMsgB] = useState(false);
  const [msgM, setMsgM] = useState("");
  const [msgMB, setMsgMB] = useState(false);
  const [errorD, setErrorD] = useState(false);
  const [errorM, setErrorM] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const handleClose = () => setShow(false);
  const closePopup = () => setError(false);
  const closeMsg = () => setMsgB(false);
  const closeMsgM = () => setMsgMB(false);
  var usr = JSON.parse(localStorage.getItem('user'))
  
  
  const [descipleData,setDescipleData] = useState({
    email: "",
    password: "",
    "user_type": "1",
  });
  const [mentorData, setMentorData] = useState({
    email: "",
    password: "",
    "user_type": "2",

  });

  console.log(usr)

  if (usr){
    if(usr.user_type == "2") {
      history.push("/home")
    }
    else{
      history.push("/welcomeVideo")
    }

  }

  const navigate = () => {
    history.push("/welcomeVideo");
  };
  const navigateMentor = () => {
    history.push("/home");
  };

 
  const load = () => {
    return <Loader />;
  };
  const descipleOnchange = (e) => {
    setDescipleData({
      ...descipleData,
      [e.target.name]: e.target.value,
    });
  };
  const mentorOnchange = (e) => {
    setMentorData({
      ...mentorData,
      [e.target.name]: e.target.value,
    });
  };

  const descipleNewData = { ...descipleData };
  
  const discipleOnSubmit = async (e) => {
    e.preventDefault();

    const isDisciple = descipleData.user_type === "1";

    const url = "api/loginUser/";
    const config = {
      headers: { "Content-Type": "Application/json" },
    };
    if (isDisciple) {

      try {
       


        const body = JSON.stringify(descipleNewData);
        console.log(body,"asdfghjol")

        axios.post(url, body , config)
        .then(response => { 
          if (response.data.message === "User login Successfully") {
            localStorage.setItem("user",JSON.stringify(response.data.user));
            load();
            setShow(true);
            setTimeout(() => 
            navigate()
            , 1000);
          }
        })
        .catch(error => {
            
          setMsg(error.response.data.message)
   
        
            setMsgB(true);
        });
       
       

        
       
        
      } 
      
      
      catch (err) {
        
        console.log(err,"alhjfct")
   
        
        setError(true);
      }
      setDescipleData(descipleData);
    }
    
  };

  const applyDisciple = () => {
    history.push("/genralArticle",{descipleData:descipleNewData})
  } 
  
 


  const mentorNewData = { ...mentorData };
  console.log("shanta",mentorNewData)
  const mentorOnSubmit = async (e) => {
    e.preventDefault();
    const isMentor = mentorData.user_type === "2";
    const url = "https://act.cladev.com/api/loginUser/";
    const config = {
      headers: { "Content-Type": "Application/json" },
    };

    if (isMentor) {
      try {
      

      
        const body = JSON.stringify(mentorNewData);
        axios.post(url, body , config)
        .then(response => { 
          if (response.data.message === "User login Successfully") {
            localStorage.setItem("user",JSON.stringify(response.data.user));
            load();
            setShow(true);
            setTimeout(() => 
            navigateMentor()
            , 1000);
          }
        })
        .catch(error => {
            
          setMsgM(error.response.data.message)
          setMsgMB(true);
        });
       
       

        
       
        
      } 
       catch (err) {
       
        // setError(true);
        
      }
      setMentorData(mentorData);

    } 
  };
  
  const applyMentor = () => {
    history.push("/genralArticle",{mentorData:mentorNewData})
  }
  const togglePasswordVisiblity = () => {
    setPasswordShown(!passwordShown);
  };

  console.log(mentorData,descipleData,"hello")

  return isLoading ? (
    <Loader />
  ) : (
    <div className="login-page">
      <div className="container">
        <div className="login-logo">
          <img src={logo} alt="logo" />
        </div>

        <div className="login-tabs">
        <Tabs defaultActiveKey="disciple">
            <Tab eventKey="disciple" title="DISCIPLE">
              <div className="login-form">
                <form onSubmit={discipleOnSubmit} autoComplete="off">
                  <div className="input-field">
                    <input
                      type="email"
                      placeholder="Email ID"
                      name="email"
                      autoComplete="off"
                      onChange={descipleOnchange}
                      required
                    />
                  </div>
                  <div className="input-field">
                    <input
                      type={passwordShown ? "text" : "password"}
                      placeholder="Password"
                      name="password"
                      autoComplete="false"
                      onChange={descipleOnchange}
                      required
                    />
                    <span className="hide" onClick={togglePasswordVisiblity}>
                      {passwordShown ? (
                        <AiOutlineEye />
                      ) : (
                        <AiOutlineEyeInvisible />
                      )}
                    </span>
                  </div>

                  <div className=" input-field submit">
                    <input type="submit" value="SIGN IN" />
                  </div>
                  <div className="forgot-password">
                    <Link to="/discipleForgetPassword">Forgot Password</Link>
                    <p>
                      Not a User?
                       <button onClick={applyDisciple} className="apply-now">
                        APPLY NOW
                      </button>
                    
                    </p>
                  </div>
                </form>
              </div>
            </Tab>
            <Tab eventKey="mentor" title="MENTOR">
              <div className="login-form">
                <form onSubmit={mentorOnSubmit} autoComplete="off">
                  <div className="input-field">
                    <input
                      type="email"
                      placeholder="Email ID"
                      name="email"
                      onChange={mentorOnchange}
                      required
                    />
                  </div>
                  <div className="input-field">
                    <input
                    type={passwordShown ? "text" : "password"}
                      placeholder="Password"
                      name="password"
                      onChange={mentorOnchange}
                      required
                    />
                    <span className="hide" onClick={togglePasswordVisiblity}>
                    {passwordShown ? (
                      <AiOutlineEye />
                    ) : (
                      <AiOutlineEyeInvisible />
                    )}
                    </span>
                  </div>
                  <div className=" input-field submit">
                    <input type="submit" value="SIGN IN" />
                  </div>
                  <div className="forgot-password">
                    <Link to="discipleForgetPassword">Forgot Password</Link>
                    <p>
                      Not a User?
                      
                      <button onClick={applyMentor} className="apply-now">
                        APPLY NOW
                      </button>
                    </p>
                  </div>
                </form>
              </div>
            </Tab>
          </Tabs>
        </div>
        <Modal show={show} onHide={handleClose}>
          <div className="popup-content success">
            <span>
              <GiCheckMark />
            </span>
            <h3>Congratulation !!!</h3>
            <p>You've been LoggedIn Successfully. </p>
          </div>
        </Modal>
        <Modal show={error} onHide={closePopup}>
          <div className="popup-content error">
            <span onClick={closePopup}>
              <AiOutlineClose />
            </span>
            <div>
            <h3>No match found for login/password combo</h3>
              <p>Please check your login/password and try again</p>
</div>
          </div>
        </Modal>
       
        <Modal show={msgB} onHide={closeMsg}>
          <div className="popup-content error">
            <span onClick={closeMsg}>
              <AiOutlineClose />
            </span>
            <div>
            <h3>{msg}</h3>
              
</div>
          </div>
        </Modal>
        <Modal show={msgMB} onHide={closeMsgM}>
          <div className="popup-content error">
            <span onClick={closeMsgM}>
              <AiOutlineClose />
            </span>
            <div>
            <h3>{msgM}</h3>
              
</div>
          </div>
        </Modal>
      </div>
    </div>
  );
}



  
