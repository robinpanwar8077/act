import { FaChevronLeft } from "react-icons/fa";
import Header from "../components/Header";
import React from "react";
import axios from "axios";
import  { useState,useEffect } from "react";
import parse from "html-react-parser"

const TermsAndCondition = () => {
  const [show, setShow] = useState([]);

  useEffect(() => {
  const url = 'api/termsConditionslisting/';
  const config = {
    headers:{
      "Content-Type":"Application/json",
    },}
   axios.post(url,config).then((result)=>{
    console.log("shantanu",result)
    setShow(result.data)
   
   }).catch(err => console.log("error rj",err));
 },[]);
 console.log("bholu",show)
  return (
    <div className="about-us-page privacy-policy-page padding-top">
      <Header
        heading="Privacy Policies"
        back={<FaChevronLeft />}
        path="profile"
      />

      <div className="about-us-content">
        <div className="container">
        {show.map((event) => {

        console.log("shantanu",show)
        return (
          
          <p>
          {parse(event.content)}
        </p>
        ) 
        })}
         
        </div>
      </div>
    </div>
  );
};

export default TermsAndCondition;
