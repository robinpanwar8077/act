import {React, useEffect, useState} from "react";
import { useHistory, useLocation } from "react-router-dom";

import { Link } from "react-router-dom";
import axios from "axios";

export default function ScriptureGiftResult(props) {
  const [score, setScore] = useState("");
  const [scriptureGiftResult, setScriptureGiftResult] = useState(null);
  const history = useHistory();
  const location = useLocation();
  const params = location.state?.scriptureGiftResult;
  const isAuthorise = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    if (!isAuthorise) {
      history.push("/login");
    }
  }, []);

  useEffect(() => {
    getScore();
  }, [score]);

  const getScore=()=>{
    console.log(params, "data", typeof params);
    if (params) {
      var result  = params.reduce((acc, cur) => {return acc += cur.option_number}, 0);
    }
    
    
    setScore(result);

  }

  const seeAnswer = () => {
    history.push("/scriptureYourAnswer", {"scriptureGiftResult":params})
  }

 

  return (
    <div className="pm-test-result-page test-result-page scripture-gifttest padding-top">
      {/* <Header heading="Test Result" back={<FaChevronLeft />} /> */}
      <div className="container">
        <div className="result-content">
            <div>         
          <p>
            You are a natural leader and you strive for order. You prefer
            making, enforcing, and following the rules.
          </p>
          <p>
            You're good at making objective decisions and telling others what to
            do. You're traditional and you rely on experience. Even though
            you're very practical, you do have an imaginative, creative side.
            You may not be completely in touch with your feelings, but you will
            find that you have very deep personal values.
          </p>
          </div>
          <h2>
            <span>{score}</span>
                Your Score
            <span className="see-answer" onClick={seeAnswer} >See your answers</span>
          </h2>
          <div className="go-to-home">
            <Link className="primary-btn" to="/home">
              Go To Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
