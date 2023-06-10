import React,{useEffect, useState} from 'react'

import { Link } from "react-router-dom";
import axios from 'axios';
import mentorImg from '../assets/images/mentorImg.png'

export default function HereIsYourMentor() {
   

    return (
        <div className="intro-video-page">
            <section className="mentor-details">
            </section>
            <div className="container">
                <div className="your-mentor">
                    <div className="mentor-img">
                    <h2>Brandon flynn</h2>
                        <img src={mentorImg} alt="mentor"/>
                    </div>
                    <h3>Here is your Mentor</h3>
                    <p>lorem ipsum dolor sit amet consecteture adipiscing elit</p>
                    <div className="change-mentor">
                        <Link to="/requestChangeMentor" >request to change mentor</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
