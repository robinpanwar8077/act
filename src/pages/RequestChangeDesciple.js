import { Link, useHistory } from "react-router-dom";
import React,{useEffect, useState} from "react";

import {
  AiOutlineClose
} from "react-icons/ai";
import { FaChevronLeft } from "react-icons/fa";
import { GiCheckMark } from "react-icons/gi";
import Header from "../components/Header";
import Loader from '../components/Loader'
import { Modal } from "react-bootstrap";
import axios from "axios";

export default function RequestChangeDesciple() {
  const history = useHistory();
  const [requestData, setRequestData] = useState({
    discription:""
  })
  const isAuthorise = JSON.parse(localStorage.getItem("user"));

  const [result, setResult] = useState(null);
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);
  const handleClose = () => setShow(false);
  const closePopup = () => setError(false);
  const isAuthorised = JSON.parse(localStorage.getItem("user"))
  useEffect(() => {
    console.log("requestData", requestData)
  }, [requestData]);
  const load = () => {
    return <Loader />;
  };

  const submit = async (e)=>{
    e.preventDefault()
    if((requestData.discription).length === 0 ){
      setError(true)
    }
    else{
      const token = isAuthorise.token
      const config = {
        headers: {
          "Content-Type": "Application/json ",
          "Authorization": `Token ${token}`,
        },
      }
      const body = {
        "description":requestData.discription,
        "requested_by":isAuthorised.id
    };
      const url = "api/change-mentor/request/";
      const res = await axios.post(url, body, config);
      setResult(res.data);
      console.log(res);
      load()
      setShow(true)
      setTimeout(function(){ 
        history.push("/profile");
       }, 2000);
      
    }
  }
  const onChange = (e) =>{
    setRequestData({
      ...requestData,
       [e.target.name]:e.target.value,
    })
  }
  return (
    <div className="request-change-mentor padding-top ">
      <Header
        heading="Request to change Desciple"
        back={<FaChevronLeft />}
        path="profile"
      />
      <Modal show={show} onHide={handleClose}>
          <div className="popup-content success">
            <span>
              <GiCheckMark />
            </span>
            <h3>congratulation !!!</h3>
            <p>Request Sent Successfully. </p>
          </div>
        </Modal>
      <Modal show={error} onHide={closePopup}>
          <div className="popup-content error">
            <span>
              <AiOutlineClose />
            </span>
            <h3>Error !!!</h3>
            <p>Please Agree All Terms &amp; Requestion </p>
          </div>
        </Modal>
      <div className="container">
        <form className="request-form" onSubmit={submit}>
          <div className="request-message">
            <textarea type="text" placeholder="Type Here" name="discription" onChange={onChange}  />
          </div>
          <div className="send-request">
            <input type="submit" value="Send Request" className={(requestData.discription.length === 0) ? " primary-btn disable" : "primary-btn"} />
          </div>
        </form>
      </div>
      
    </div>
  );
}
