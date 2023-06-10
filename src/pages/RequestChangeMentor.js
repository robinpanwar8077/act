import { Link, useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";

import {
  AiOutlineClose
} from "react-icons/ai";
import { FaChevronLeft } from "react-icons/fa";
import { GiCheckMark } from "react-icons/gi";
import Header from "../components/Header";
import Loader from '../components/Loader'
import { Modal } from "react-bootstrap";
import axios from "axios";

export default function RequestChangeMentor() {
  const history = useHistory();
  const [requestData, setRequestData] = useState({
    discription: ""
  })
  const isAuthorise = JSON.parse(localStorage.getItem("user"));

  const [status, setStatus] = useState(null);
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);
  const handleClose = () => setShow(false);
  const closePopup = () => setError(false);
  const isAuthorised = JSON.parse(localStorage.getItem("user"))
  if (isAuthorise !== null ){
    var token = isAuthorise.token
  }
  useEffect(() => {
    if (!isAuthorise) {
        history.push("/login");
    }
}, []);
  const config = {
    headers: {
      "Content-Type": "Application/json ",
      "Authorization": `Token ${token}`,
    },
  }
  useEffect(() => {
    // console.log("requestData", requestData)
  }, [requestData]);
  const load = () => {
    return <Loader />;
  };

  // const checkStatus = async (e)=>{
  //   const body = {
  //     "requested_by":isAuthorised.id
  //   }
  //   console.log("base url",axios.defaults.baseURL);
  //   const url = "api/get-change-mentor/request/";
  //   const result = await axios.post(url,body,config);
  //   console.log("status",result);
  //   setStatus(result)
  // }

  
 

  useEffect(() => {
    const url = "https://act.cladev.com/api/get-change-mentor/request/";

    if (isAuthorised !== null){
      var requestOptions = {
        method: 'POST',
        headers: {
          "Content-Type": "Application/json ",
          "Authorization": `Token ${token}`,
        },
        
        body:JSON.stringify({
          "requested_by": isAuthorised.id
        })
      }
    }

    
    const checkStatus = async (e) => {
      try {
        fetch(url, requestOptions).then(res => res.json()).then((data) =>{
          setStatus(data.status)
          console.log(data.status,"data")
          console.log(status);
        } )
      } catch (err) {
        console.log("error", err)
      }
    }
    checkStatus()
  }, [status])

  const submit = async (e) => {
    e.preventDefault()
    if ((requestData.discription).length === 0) {
      setError(true)
    }
    else {
      const body = {
        "description": requestData.discription,
        "requested_by": isAuthorised.id
      };
      console.log("base url", axios.defaults.baseURL);

      const url = "api/change-mentor/request/";
      const res = await axios.post(url, body, config);
      console.log(res);
      load()
      console.log(res.message);

      setShow(true)
      setTimeout(function () {
        history.push("/profile");
      }, 2000);

    }
  }
  const onChange = (e) => {
    setRequestData({
      ...requestData,
      [e.target.name]: e.target.value,
    })
  }
  return (
    <div className="request-change-mentor padding-top ">
      <Header
        heading="Request to change mentor"
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
      {
        (status === true)?
        <div className="pending-status">
          <p>Your request is in progress</p>
        </div>:
        <form className="request-form" onSubmit={submit}>
          <div className="request-message">
            <textarea type="text" placeholder="Type Here" name="discription" onChange={onChange} />
          </div>
          <div className="send-request">
            <input type="submit" value="Send Request" className={(requestData.discription.length === 0) ? " primary-btn disable" : "primary-btn"} />
          </div>
        </form>

      }
      </div>

    </div>
  );
}
