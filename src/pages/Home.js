import { Link, useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";

import DiscipleList from "../components/DiscipleList";
import { FaChevronRight } from "react-icons/fa";
import { HiOutlineChevronRight } from "react-icons/hi";
import HomeScriptureStudyMaterial from "../components/HomeScriptureStudyMaterial"
import Loader from "../components/Loader";
import Menu from "../components/Menu";
import PmlevelBar from "../components/pmLevelBar";
import ScriptureLevelBar from "../components/ScriptureLevelBar";
import axios from "axios";
import mentorImg from "./../assets/images/mentorImg.png";
import userOne from "../assets/images/userOne.png";

export default function Home(props) {
  const history = useHistory();

  const isAuthorise = JSON.parse(localStorage.getItem("user"));
  const userDetail = JSON.parse(localStorage.getItem("userdata"));
  const [discipleList, setDiscipleList] = useState(null)
  const [mentor_pic, setMP] = useState("")
  // const [mentorUser, setMentorUser] = useState(null);
  // const [descipleUser, setDescipleUser] = useState(null);
  
  useEffect(() => {
    if (!isAuthorise) {
      history.push("/login")
    }
    //  else {
    //   setMentorUser(isAuthorise.user_type === "2");
    //   setDescipleUser(isAuthorise.user_type === "1");
    // }
  }, []);
  
  useEffect(() => {
    console.log("disciple list", (discipleList));
  }, [discipleList])


  useEffect(() => {
    getData()
  }, [])

  
  const getData = async () => {
    try {
      if (isAuthorise.user_type === "2") {
        const url = "api/legacygroup/userlist/"
        const body = { "mentor_id": isAuthorise.id }
        const token = isAuthorise.token
        const config = {
          headers: {
            "Content-Type": "Application/json ",
            "Authorization": `Token ${token}`
          },
        }
        await axios.post(url, body, config).then((result) => {
          console.log(result.data.data, "result");
          setDiscipleList(result.data)
          console.log("disciple list", (result.data));
        })
        
      }
    } catch (err) {
      console.log(err);
    }
  }
  

 
  const getUser = async () => {
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
            localStorage.setItem("userdata", JSON.stringify(res.data));
        }
    } catch (err) {
        console.log(err, "error");
        
    }
};
useEffect(() => {
  getUser();

  const url = `https://act.cladev.com/api/get-profile/${userDetail?.created_by}/`;
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
        console.log("shantanu",result)
        setMP(result.data.data.user.profile_pic)
      }).catch(err => console.log("error rj",err));
    }, []);
  
  const discipleProfile =(e,item)=>{
    
    
    history.push("/discipleProfile",{"discipleList":item});
  }
  const sendData =(e)=>{
    history.push("/discipleList", { discipleList: discipleList });

  }

  return (
    isAuthorise != null ?
      <div className="home-page padding-top">
        <section className="banner-section"></section>
        <div className="profile-wrap">
          <div className="container">
            <div className="profile-card">
              <div className="your-mentor">
                <div className="box">
                  <div className="mentor-details">
                    <div className="mentor-img">
                      
                      <img src={"https://act.cladev.com" + mentor_pic} alt="mentor" />

                    </div>

                    {
                      isAuthorise && isAuthorise.user_type === "2" ?
                        <div className="mentor-name">
                          <p>{isAuthorise.first_name} {isAuthorise.last_name}</p>
                          <span>Mentor</span>
                        </div>
                        :
                        <div className="mentor-name">
                          <span>Your Mentor</span>
                          <p>{`${userDetail?.firstname} ${userDetail?.lastname}`}</p>
                        </div>
                    }
                  </div>
                  <Link className="icon" to="mentorProfile">
                    <HiOutlineChevronRight />
                  </Link>
                </div>

                <div className="test-button">
                  <Link to="/scriptureKey" className="scripture-key">
                    Scripture key level
                  </Link>
                  <Link to="pmlevel" className=" pm-level">
                    PM Level
                  </Link>
                </div>

              </div>
            </div>
            {
              (isAuthorise && isAuthorise.user_type === "2") &&
              <div className="disciple-list">
                <div className="d-flex align-items-center justify-content-between">
                  <h3>View your Disciples</h3>
                  <button className="icon"  onClick={(e)=>{sendData(e)}}>
                    <HiOutlineChevronRight />
                  </button>
                </div> 
                {
                  ((discipleList?.data[1] ))?
                  <ul className="disciple-listing">
                    <li className="list">
                      {
                        discipleList?.data?.slice(1, 6).map((item, index) => {
                          return (
                            <button onClick={(e) => discipleProfile(e, item)} key={index}>
                              <div className="listing">
                                <div className="user-profile">
                                  <div className="img">
                                    <img src={userOne} alt="profile" />
                                  </div>
                                  <div className="disciple-detail">
                                    <h3>{item.username}</h3>
                                    <span>Scripture key level {item.scriptureLevel}</span>
                                  </div>
                                </div>
                                <div className="arrow">
                                  <FaChevronRight />
                                </div>
  
                              </div>
                            </button>
                          )
                        })
  
                      }
                    </li>
                  </ul> :
                  <p>No Disciple assigned yet</p>
                }

              </div>
            }
          </div>
        </div>
        {
          (isAuthorise && isAuthorise.user_type === "1") &&
          <div className="scripture-level">
            <div className="container">
              <ScriptureLevelBar/>
            </div>
          </div>
        }
      
        {
          (isAuthorise && isAuthorise.user_type === "1") &&
          <HomeScriptureStudyMaterial studyHeading="Study Material" />
        }

        <Menu activeHome="active" />
      </div>
      :
      <Loader />
  );
}
