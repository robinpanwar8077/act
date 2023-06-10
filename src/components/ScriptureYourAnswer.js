import React, { useEffect, useState } from "react";

import { FaChevronLeft } from "react-icons/fa";
import Header from "./Header";
import Loader from "./Loader";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function ScriptureYourAnswer() {
    const [data, setData] = useState(null);
  const isAuthorise = JSON.parse(localStorage.getItem("user"));
  if (isAuthorise !== null ){
    var token = isAuthorise.token
  }
  else{
    var token = ""
  }
  

  useEffect(() => {
    if (!isAuthorise) {
      history.push("/login");
    }
  }, []);
    
    
    const config = {
      headers: {
        "Content-Type": "Application/json ",
        "Authorization": `Token ${token}`
      },
    }
    const history = useHistory()
    
    const params = useLocation().state?.scriptureGiftResult;

console.log(params);
    useEffect(() => {
        getData()
    }, []);

    const getData = async () => {
        const url = "api/question/list/"
        await axios.post(url, {}, config ).then(res => {
            console.log("response", res.data);
            setData(res.data);
        }).catch(err => console.log("err =======>", err));
    }

    const goBack =()=> {
        history.push("/scriptureGiftResult",  {"scriptureGiftResult":params})
    }
    if(isAuthorise !== null) {
        if(isAuthorise.user_type === "2"){
            history.push("/home")
           }
    }

    
    return (
        data ?
            <div className="your-answer-page padding-top">
                <Header heading="Your answers"   />
                <div className="container">
                <span onClick={goBack} className="back-btn"><FaChevronLeft /></span>
                    <div className="answers-container">
                    {console.log(data.data,"dataaaa")}
                        {
                            
                            data.data.map((item, index) => {
                                
                                return (
                                    <div className="question-answer" key={index}>
                                        <div className="question">
                                            <h3>{index + 1}.  {item.question}</h3>
                                        </div>
                                        {console.log(item.option,"Llllllllllllllllllllllllllll")}
                                        {
                                            
                                            item.option?.map((item, i) => {
                                                return (
                                                    <>
                                                    <div></div>
                                                    <div className="answer" >
                                                        {
                                                            <p className={(item.id === params[index].option_id) ? "right-answer" : ""} key={i}>
                                                                {i + 1}.<span>{((item.id === params[index].option_id) && item.option_name) ? `${item.option_name} (your answer)` : `${item.option_name}`}</span>
                                                            </p>
                                                        }
                                                    </div>
                                                    </>
                                                )
                                            })
                                        }
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
            :
            <Loader />
    );
}
