import { Link, useHistory, useLocation } from "react-router-dom";
import React ,{useEffect, useState} from "react";
import { GiConsoleController } from "react-icons/gi";
import axios from "axios";

export default function PmTestResult() {

  const [score, setScore] = useState("");
  const location = useLocation();
  const params = location.state?.pmTestResult;
  console.log("siohiguasfgu",params)
  const params2 = location.state?.questionList;
  const isAuthorise = JSON.parse(localStorage.getItem("user"));
  const history = useHistory();


  useEffect(() => {
    if (!isAuthorise) {
      history.push('/login');
    }
  }, [isAuthorise]);

  useEffect(() => {
    getScore();
  }, [score]);

  const getScore=()=>{
    console.log("question",params2)
    // console.log(params,params2.passing_percentage, "data", typeof params);

    if (params) {
      var result  = params.reduce((acc, cur) => {
        return (
          acc += cur.answer_status
        )
      
      }, 0);
    }
    
    console.log(result,"aa")
  

    if (params) {
      var percentage = (result/params.length)*100
      console.log(percentage);
      setScore(percentage);
    }

  const navigate = () => {
    history.push(`/pmStudyMaterial/${params[0].page_id?.id}`);
  };
    
if (percentage<=75){

  

  setTimeout(() => 
            navigate()
            , 2000);
 
  
}
    
  }

  return (
    <div className="pm-test-result-page">
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
          {params2 ? <h2>{
            (score < params2.passing_percentage) ? "You are Fail" :"You are Pass"
          }</h2> : 
          <h2></h2>
          }

   

          
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
