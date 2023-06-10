import { Link, useHistory } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";

import { FaChevronLeft } from "react-icons/fa";
import { GrRefresh } from "react-icons/gr";
import Header from "./Header";
import Loader from "./Loader";
import { RiSendPlaneFill } from "react-icons/ri";
import axios from 'axios'
import userOne from "../assets/images/userOne.png";
import userTwo from "../assets/images/userTwo.png";

export default function LegacyGroup() {
  const [groupData, setGroupData] = useState(null);
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null)
  const [userData, setUserData] = useState(null);

  const [emptyMsgAlert, setEmptyMsgAlert] = useState(false)
  const history = useHistory();
  const isAuthorise = JSON.parse(localStorage.getItem("user"));
  const userDetail = JSON.parse(localStorage.getItem("userdata"))
  if (isAuthorise !== null) {
    var token = isAuthorise.token
  }
  else{
    var token = null
  }
  
    const config = {
      headers: {
        "Content-Type": "Application/json ",
        "Authorization": `Token ${token}`
      },
    }
  useEffect(() => {
    if (!isAuthorise) {
      history.push("/login");
    }
  }, []);


  useEffect(() => {
    console.log(groupData, "useeff");
  }, [groupData])
  useEffect(() => {
    getData()
    mentorData()
  }, [])
  
  useEffect(() => {
    scrollToBottom()
  }, [groupData])
  

  const getData = async () => {
    const url = "api/legacygroup/list/";
    const body = { "group_id": userDetail?.id }
    
    await axios.post(url, body, config).then((result) => {
      setGroupData(result.data.chat_list.data)

    });
  };
  const mentorData = async()=>{
    const url = "api/mentor-details/";
    if (isAuthorise !== null) {
      var body = { user_id: isAuthorise.id };
    }
    
    await axios.post(url, body, config).then((result) => {
      localStorage.setItem("userdata", JSON.stringify(result.data));
      setUserData(result.data);
    });
  }

  const onChange = (e) => {
    setMessage(e.target.value)
  }

  const sendUserMessage = async (e) => {
    e.preventDefault();
    if (!message || message.trim().length === 0) {
      console.log(message);
      setEmptyMsgAlert(true)
      setTimeout(() => {
        setEmptyMsgAlert(false)
      }, 1500)
    } else {
      const messagedata = {};
      messagedata["user_id"] = isAuthorise.id;
      messagedata["group_id"] = userDetail.id;
      messagedata["message"] = message;

      axios.post("api/legacygroup/add-chat/", messagedata,config).then((result) => {
        setMessage("")
        getData()
      })
    }
  }

  const reload = () => getData()
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }
  


  return (

<>
    <div className="legacy-group-page padding-top">
      <Header heading="Legacy Group" back={<FaChevronLeft />} path="/chatPage" />
      <div className="reload-btn" onClick={reload}> <GrRefresh /> </div>
      <div className="container-fluid">
        <div className="legacy-gropup-chat">
          <div className="chat-message-box">
            {
              groupData ?
                <div>
                  {
                    groupData.map((item, index) => {
                      return (
                        (item.user_id == isAuthorise.id) ?

                        <div className="senders-chat user-chat message-cont message-align">
                            <div class="chat-date"><span>{
                                    item.created_date.substr(11, 2) < 12 ? `${item.created_date.substr(11, 5)} AM` : `${item.created_date.substr(11, 5)} PM`
                                  }</span></div>


                            <div className=" sender-detail">
                              

                              
                            </div>

                            <div className="sender-message ">
                              
                              <p className="messages-hdg message-bg">
                              <span>You</span>
                                {item.message}
                                
                              </p>
                            </div>
                            
                          </div>
                          
                          :
                          <div className="senders-chat message-cont">
                            
                           
                           <div class="chat-date"><span>{
                                    item.created_date.substr(11, 2) < 12 ? `${item.created_date.substr(11, 5)} AM` : `${item.created_date.substr(11, 5)} PM`
                                  }</span></div>

                            <div className="sender-detail ">
                            
                              <div className="sender-profile">
                                <img src={userTwo} alt="sender profile" />
                              </div>
                              
                              
                              <div className="messages-hdg">
                              <span>{item.firstname}</span>
                              <p className="text-message ">
                                {item.message}
                                
                              </p>
                              </div>


                            </div>
                            
                            

                            
                          </div>
                          
                      );
                    })
                  }
                </div>
                : <Loader />

            }
            <div ref={messagesEndRef} />
          </div>
          <div className="message-input">
            <form onSubmit={sendUserMessage}>
              <div className="wrap">
                <div className="mesg ">
                  <div className={emptyMsgAlert ? "empty-alert show" : "empty-alert "}>Please Type a Message to continue...</div>
                  <textarea placeholder="Type a Message..." className="typing-input" value={message} name="message" onChange={onChange}></textarea>
                </div>
                <button type="submit" className="send-btn">
                  <RiSendPlaneFill />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    
    </>
  
  );
}
