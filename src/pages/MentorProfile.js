import { FaChevronLeft, FaEnvelope } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { BsFillChatFill } from "react-icons/bs";
import Header from "../components/Header";
import { IoCall } from "react-icons/io5";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import React, { useEffect, useState } from 'react'
import mentorImg from '../assets/images/mentorImg.png'
import axios from "axios";

export default function MentorProfile() {

  const userDetail = JSON.parse(localStorage.getItem("userdata"))
  console.log(localStorage)
  const history = useHistory();
  const isAuthorise = JSON.parse(localStorage.getItem("user"));
    const [userData, setUserData] = useState(null);
    const [loggedOut, setLoggedOut] = useState(false)

//   useEffect(() => {
    

//     if (userDetail == null) {
//       history.push("/login")
//     }
//   }, [])


const getData = async () => {
    const url = "api/mentor-details/";
    if (isAuthorise !== null ){
        var body = { user_id: isAuthorise.id };
        var token = isAuthorise.token;
    }
    
    const config = {
        headers: {
            "Content-Type": "Application/json ",
            Authorization: `Token ${token}`,
        },
    };
    try {
        const res = await axios.post(url, body, config);
        if (res.status === 200) {
            console.log(res.status, "userData");
            localStorage.setItem("userdata", JSON.stringify(res.data));
            setUserData(res.data);
        }
    } catch (err) {
        console.log(err, "error");
        
    }
};
useEffect(() => {
    getData();
}, []);

    return (
      
            <div className="intro-video-page mentor-profile-page">          
            <Header back={<FaChevronLeft />}  path="home" />
                <section className="mentor-details">
                </section>
                <div className="container">
                    <div className="your-mentor">
                        <div className="mentor-img">
                            <img src={mentorImg} alt="mentor" />
                            { userDetail ? 
                            <h2>{`${userDetail.firstname} ${userDetail.lastname}`}</h2> :
                            <h2>hello</h2>
                            }
                        </div>   
                        <div className="personal-info">
                            <h2>Personal Info</h2>
                            <div className="personal-info-content">
                                <div className="contact-info">
                                    <h5>Contact No.</h5>
                                    <div className="number">
                                        
                                        { userDetail ? 
                            <p>{`${userDetail.mobile}`}</p> :
                            <h2>hello</h2>
                            }
                                        <div className="icons">
                                            <a href="sms:9899860149"><BsFillChatFill /></a>
                                            <a href="tel:9899860149">
                                                <IoCall />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="email-info contact-info">
                                    <h5>Email ID</h5>
                                    <div className="number">
                                    { userDetail ? 
                            <p>{`${userDetail.email}`}</p> :
                            <h2>hello</h2>
                            }
                                        
                                        <div className="icons">
                                            <a href="tel:9899860149"><FaEnvelope /></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-5">
                            {
                                //<Link to="#" className="primary-btn">Message </Link>
                            }
                        </div>
                    </div>
                </div>
            </div>

       
        
    )
}
