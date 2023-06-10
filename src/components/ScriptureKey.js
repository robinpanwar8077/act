import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link, useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";

import Header from "./Header";
import Loader from "./Loader";
import axios from "axios";
import parse from "html-react-parser"

export default function ScriptureKey() {
  const history = useHistory();
  const [keyList, setKeyList] = useState(null);
  const [testCheck, setTestCheck] = useState(false)
  const [currentlevel, setCurrentLevel] = useState(0)
  const isAuthorise = JSON.parse(localStorage.getItem("user"));
  const descipleUser = isAuthorise.user_type == "1";
  const token = isAuthorise.token
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
    getData();
  }, [currentlevel]);

  useEffect(() => {

    // console.log(keyLevel,"keyLevel");

  }, [currentlevel]);

  const getData = async () => {

    await axios.post("api/listingKeyLevel/", {}, config).then((result) => {
      setKeyList(result.data);
    });
    await axios.get(`api/userone/${isAuthorise.id}/`, config).then((res) => {
      setCurrentLevel(res.data.data.user.key_level)
      console.log("shantanu",currentlevel)
      let gm=currentlevel
        localStorage.setItem('usr',gm)

      setTestCheck(res.data.data.user.scripture_test)
      console.log(testCheck,"dsgdgfdhf")
    })
  };



  
  

  const [isActive, setActive] = useState(false);
  const handleToggle = () => {
    setActive(!isActive);
  };

  console.log("keyLis",keyList);

  return (
    <div className="pm-level-page scripture-key-page padding-top">
      <Header heading="Scripture Keys" back={<FaChevronLeft />} path="home" />
      {
        !keyList ? <Loader /> :
          <div className="pm-level-list">
            <div className="container">
              {
                (descipleUser) &&
                <Link
                  className={testCheck ? "pm-level active disable" : "pm-level"}
                  to={!testCheck ? "/scriptureGiftStartTest" : "#"}
                >
                  {testCheck &&
                    <span className="test-passed">Test Passed</span>
                  }
                  <div className="content">
                    <h3>Scripture Gift Test</h3>
                    <p>This is the Discription of Scripture Gift Test </p>
                  </div>
                  <div className="arrow">
                    <FaChevronRight />
                  </div>
                </Link>
                }
                   {
                    console.log(currentlevel,"sdfsgf")}
              {keyList.map((event, index) => {
            
                return (
                  <Link
                    className={(currentlevel >= (index + 1)) ? ((currentlevel > (index + 1)) ?`pm-level active` : `pm-level`) :`pm-level disable `  }
                    to={(currentlevel >= (index + 1)) ? `/scriptureStudyMaterial/${event.id}` : `#`}
                    onClick={handleToggle}
                    key={index}
                  >
                    <div className="content">
                      <h3>{event.name}</h3>
                      <p>{parse(event.description.substring(0, 50))}<span>..........<u>view more</u></span> </p>
                    </div>
                    <div className="arrow">
                      <FaChevronRight />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
      }
    </div>
  );
}
