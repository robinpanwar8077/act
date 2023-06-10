// import { Link, useHistory } from "react-router-dom";

import React, { useEffect, useRef, useState } from "react";

import { FaChevronLeft } from "react-icons/fa";
import { GrRefresh } from "react-icons/gr";
import Header from "../components/Header";
import Loader from "../components/Loader";
import { RiSendPlaneFill } from "react-icons/ri";
import axios from 'axios'
import { useHistory } from "react-router-dom";
import userOne from "../assets/images/userOne.png";
import userTwo from "../assets/images/userTwo.png";

const Singlechatpage = () => {
    const isAuthorise = JSON.parse(localStorage.getItem("user"))
    const history = useHistory();
    const [chatData, setChatData] = useState(null)
    const [message, setMessage] = useState("");
    const [emptyMsgAlert, setEmptyMsgAlert] = useState(false)
    const userDetail = JSON.parse(localStorage.getItem("userdata"))
    
    useEffect(() => {
      if (isAuthorise == null) {
        history.push("/login");
      }
    }, []);
    console.log(userDetail)
    

    useEffect(() => {
        console.log(chatData, "useeff");
    }, [chatData])
  

    const messagesEndRef = useRef(null)
    if (isAuthorise !== null) {
        var getData = async () => {
            const url = "api/chatbot/list/"
            const body = {
                "sender_id": isAuthorise.id,
                "receiver_id": userDetail.created_by
            }
            await axios.post(url, body).then((res) => {
                console.log(res.data.data, "result");
                setChatData(res.data.data)
            })
        }
    }
    useEffect(() => {
        if (isAuthorise !== null){
            getData()
        }
        
    }, [])
    
    const sendUserMessage = async (e) => {
        e.preventDefault();
        if ((!message || message.trim().length === 0)) {
            setEmptyMsgAlert(true)
            setTimeout(() => {
                setEmptyMsgAlert(false)
            }, 1500)
        } else {
            const messagedata = {};
            messagedata["sender_id"] = isAuthorise.id;
            messagedata["receiver_id"] = userDetail.created_by;
            messagedata["message"] = message;

            axios.post("api/chatbot/add-chat/", messagedata).then((result) => {
                console.log(result, "res");
                setMessage("")
                getData()
            })

        }

    }
    const onChange = (e) => {
        setMessage(e.target.value)
    }
    const reload = () => {
        getData()
    }
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
    useEffect(() => {
        scrollToBottom()
    }, [chatData])

    return (
        <div className="legacy-group-page padding-top">
            <Header heading="chat" back={<FaChevronLeft />} path="chatPage" />
            <div className="reload-btn" onClick={reload}> <GrRefresh /> </div>
            <div className="container">
                <div className="legacy-gropup-chat">
                    <div className="chat-message-box">
                        {
                            chatData ?
                                <div>
                                    {
                                        chatData?.map((item, index) => {
                                            return (
                                                (item.sender_id == isAuthorise.id) ?
                                                    <div className="senders-chat">
                                                        <div className="sender-detail">
                                                            <div className="sender-profile">
                                                                <img src={userTwo} alt="sender profile" />
                                                            </div>
                                                            <h5>E .a. Siblu</h5>
                                                        </div>
                                                        <div className="sender-message">
                                                            <p className="text-message">
                                                                {item.message}
                                                            </p>
                                                            <span className="message-time">
                                                                {
                                                                    item.created_date.substr(11, 2) < 12 ? `${item.created_date.substr(11, 5)} AM` : `${item.created_date.substr(11, 5)} PM`
                                                                }
                                                            </span>
                                                        </div>
                                                    </div>
                                                    :
                                                    <div className="senders-chat user-chat">
                                                        <div className=" sender-detail">
                                                            <h5>Neilson</h5>
                                                            <div className=" sender-profile">
                                                                <img src={userOne} alt="user profile" />
                                                            </div>
                                                        </div>
                                                        <div className="sender-message">
                                                            <div className="text-message">
                                                                <p>
                                                                    {item.message}
                                                                </p>
                                                            </div>
                                                            <span className="message-time">
                                                                {
                                                                    item.created_date.substr(11, 2) < 12 ? `${item.created_date.substr(11, 5)} AM` : `${item.created_date.substr(11, 5)} PM`
                                                                }
                                                            </span>
                                                        </div>
                                                    </div>
                                            )
                                        })
                                    }


                                </div>
                                : <Loader />
                        }
                        <div ref={messagesEndRef}></div>
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
    );
}

export default Singlechatpage;
