import { Link, useHistory, useLocation } from "react-router-dom";
import React,{useEffect, useState} from "react";

export default function WelcomeVideo() {
  const history = useHistory();
  const location = useLocation()
  const params = location.state?.descipleData;
  const params2 = location.state?.mentorData;
 
  useEffect(() => {
    getUser()
  }, []);
  
  const getUser =()=>{
    console.log("params1",params);
    console.log("params2",params2);
  }
 
  
  return (
    <div className="welcome-margin">
      <div className="welcome-page">
        <div className="container">
          <div className="welcome-content">
            <h2>
              Welcome to the Acts Ministry Training &amp; Mentoring Registration
              for all Christians, Military, and First Responders.
            </h2>
            <p>
              We at Acts are proud of you for your service and we are here for
              you. Acts is a life changing experience that will bring incredible
              purpose for all your trauma and suffering. ALL INFORMATION IS
              PRIVATE AND CONFIDENTIAL. Acts will only release information with
              written consent from the patient/client/mentored.
            </p>
            <div className="apply-btn">
              <Link className="primary-btn" to="/genralArticle">Apply</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
