import { Link, useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";

import Loader from "./Loader";
import axios from 'axios'

export default function WelcomeVideo() {
  const [getVideo, setGetVideo] = useState(null);
  const history = useHistory();

  let isAuthorise = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    if (!isAuthorise) {
      history.push("/login");
    }
    
  }, []);
  useEffect(() => {
    // console.log("data:",getVideo?.video);
    getData();
  }, []);
  // const getData = () => {
  //   fetch("https://act.cladev.com/api/listingIntroVideo/", {
  //     method: "post",
  //     headers: {
  //       "Content-Type": "Application/json",
  //     },
  //   }).then((response) => {
  //     response.json().then((result) => {
  //       console.log(result,"result");
  //       setGetVideo(result);
  //     });
  //   });
  // };

  const getData = async () => {
    const url = "api/listingIntroVideo/";
    if (isAuthorise !== null ){
      var token = isAuthorise.token
    }
    
    const config = {
      headers: {
        "Content-Type": "Application/json ",
        "Authorization": `Token ${token}`
      },
    }
    await axios.post(url,{}, config).then(result => {
        console.log("response", result.data);
         setGetVideo(result);

    }).catch(err => console.log("err =======>", err));
}


  return getVideo ? (
    <div className="container">
      <div className="welcome-video-page">
        <div>
          <h1>Welcome</h1>
          <h2>Everyday we learn something new</h2>
          <div className="welcome-video">
          {
            (getVideo.data).length === 0 ? 
            <h2 className="text-center mt-5">No Video Available Right Now</h2>
            :
            <video width="100%" height="100%" autoPlay={true} src={`http://act.cladev.com${getVideo.data[0]?.video}`} controls />
          }
          </div>
        </div>
        <div className="get-started">
          <Link to="/introVideo" className="primary-btn">
            Know Your Mentor
          </Link>
        </div>
      </div>
    </div>
  ) : (
    <Loader />
  );
}
