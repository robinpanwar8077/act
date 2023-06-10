import { Link, useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";

import { FaChevronRight } from "react-icons/fa";
import Loader from "./Loader";
import axios from 'axios'
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import userOne from "../assets/images/userOne.png";
import userTwo from "../assets/images/userTwo.png";

export default function DiscipleList(props) {
  const isAuthorise = JSON.parse(localStorage.getItem("user"));
  
  const history = useHistory();
  const location = useLocation()
  const discipleList = location.state?.discipleList;

  
 
  
  useEffect(() => {
    console.log("params1",discipleList);

  }, [discipleList]);


  useEffect(() => {
    if (!isAuthorise) {
      history.push("/login")
    }
  }, [])

  const discipleProfile =(e,item)=>{
    history.push("/discipleProfile",{"discipleList":item});
  }


  return (
  
      (discipleList?.data[1] )?
      <ul className="disciple-listing">
        <li className="list">
          {
            discipleList?.data?.slice(1, 13, discipleList?.data?.length).map((item, index) => {
              return (
                <div onClick={(e) => discipleProfile(e, item)} key={index}>
                     <div className="img">
                      <img src={userOne} alt="profile" />
                      </div>
                  <div className="listing">
                    <div className="user-profile">
                   
                      <div className="disciple-detail">
                        <h3>{item.username}</h3>
                        <span>Scripture key level {item.scriptureLevel}</span>
                      </div>
                    </div>
                    <div className="arrow">
                      <FaChevronRight />
                    </div>

                  </div>
                </div>
              )
            })

          }
        </li>
      </ul> :
      <p className="text-center padding-top h2">No Disciple assigned yet</p>
    

    
  );
}
