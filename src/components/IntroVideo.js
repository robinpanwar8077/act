import { Link, useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";

import Loader from "./Loader";
import axios from "axios";
import mentorImg from "../assets/images/mentorImg.png";

// import Loader from "./Loader";



export default function IntroVideo() {
    const history = useHistory();
    const isAuthorise = JSON.parse(localStorage.getItem("user"));
    const [userData, setUserData] = useState(null);
    const [loggedOut, setLoggedOut] = useState(false)
    const [assignMentor , setAssignMentor] = useState(false)
    const [mentor_id , setMI] = useState("")


    const handleLogout = () => {
        localStorage.clear()
        setLoggedOut(true)
    }

    if (loggedOut) {
        history.push("/login");
    }

    useEffect(() => {
        if (!isAuthorise) {
            history.push("/login");
        }
    }, []);

    useEffect(() => {
        getData();
    }, []);

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
                console.log(res, "userData");
                localStorage.setItem("userdata", JSON.stringify(res.data));
                setUserData(res.data);
                const url = `https://act.cladev.com/api/get-profile/${res.data.created_by}/`;
                    if (isAuthorise !== null) {
                        var token = isAuthorise.token
                    }
                    else{
                        var token = null
                    }
                    const config = {
                        headers: {
                            "Content-Type": "Application/json ",
                            Authorization: `Token ${token}`,
                        },
                            };
                    axios.post(url,{},config).then((result)=>{
                        console.log("shantanu",result.data.data.user)
                        setMI(result.data.data.user.profile_pic)
                    }).catch(err => console.log("error rj",err));
            }
        } catch (err) {
            console.log(err, "error");
            setAssignMentor(true)
        }
    };
    return (
        
            <div className="intro-video-page">
                <section className="mentor-details"></section>
                <div className="container">
                    {userData ? (
                        <div className="your-mentor">
                            <div>
                                <div className="mentor-img">
                                    <h2>{
                                        `${userData?.firstname} ${userData?.lastname}`}</h2>
                                    <img src={"https://act.cladev.com" + mentor_id} alt="mentor" />
                                </div>
                                <h3>Here is your Mentor</h3>
                            </div>
                            <div className="watch-video">
                                <Link to="/home" className="primary-btn">
                                    GET STARTED
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="your-mentor">
                            <p className="mt-3">No Mentor assigned yet</p>
                            <div>
                                <h3>Contact your admin to assign a Mentor</h3>
                            </div>
                            <div className="watch-video">
                                <button to="/login" onClick={handleLogout} className="primary-btn">
                                    Logout
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
    );
}
