import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link, useHistory, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";

import Header from "./Header";
import Loader from "./Loader";
import axios from "axios";
import parse from "html-react-parser"
export default function PmLevel(props) {
  const [pmList, setPMList] = useState(null);
  const [currentlevel, setCurrentLevel] = useState(null)
  

  const history = useHistory();
  var level = localStorage.getItem('usr')
  console.log("sgahgj",level)

  
  const isAuthorise = JSON.parse(localStorage.getItem("user"));
  if(isAuthorise) {
    var token = isAuthorise.token
  }
  else{   
      var token = ""
  }

  const config = {
    headers: {
      "Content-Type": "Application/json ",
      "Authorization": `Token ${token}`
    },
  }



  useEffect(() => {
    //  console.log(pmList);
  }, [pmList]);
  useEffect(() => {
    console.log(isAuthorise);

    if (isAuthorise == null) {
      history.push("/login")
    }
    const getData = async () => {
      const url = "api/listingPMlevel/";

      await axios.post(url, {}, config).then((result) => {
        setPMList(result.data)
      
 
        console.log(result);
      })
      await axios.get(`api/userone/${isAuthorise.id}/`, config).then((res) => {
        setCurrentLevel(res.data.data.user.pm_level)
        console.log(currentlevel,"asdfghijkl")
      })
    };
    getData();
  }, [])

  const [isActive, setActive] = useState(false);
  const handleToggle = () => {
    setActive(!isActive);

  };
  return (
    pmList ?
      <div className="pm-level-page  padding-top">
        <Header heading="PM Level" back={<FaChevronLeft />} path="home" />
        <div className="pm-level-list">
          <div className="container">
            {pmList.map((event, index) => {
              console.log(pmList,"gfyfdyf")
              console.log(currentlevel,"dfsadfs")
              console.log(index,"dsafsfsafs")
              return (
                <Link
                  className={(level >= 5) ? (currentlevel >= (index + 1))? `pm-level active` : `pm-level` : `pm-level disable`}
                  to={(currentlevel >= (index + 1)) ? `/pmStudyMaterial/${event.id}` : `#`}
                 


                  onClick={handleToggle}
                  key={index}
                >
              
                  <div className="content">
                    <h3>{event.name}</h3>
                    <p>{parse(event.description)}</p>
                  </div>
          
                  <div className="arrow">
                    <FaChevronRight />
                  </div>
                </Link>
              );
            })}

          </div>
        </div>
      </div>
      : <Loader />
  );
}
