import React, { useEffect, useState } from "react";

import { FaChevronLeft } from "react-icons/fa";
import Header from "./Header";
import Loader from "./Loader"
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function ScriptureGiftTest(props) {
  const [questionList, setQuestionList] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedoption, setSelectedOption] = useState("");
  const [answerT, setAnswerT] = useState([]);
  const history = useHistory();
  const isAuthorise = JSON.parse(localStorage.getItem("user"));
  if (isAuthorise !== null) {
    var token = isAuthorise.token
    var config = {
      headers: {
        "Content-Type": "Application/json ",
        "Authorization": `Token ${token}`
      },
    }
  } 
  
  
  useEffect(() => {
    if (!isAuthorise) {
      history.push("/login")
    }
    getData()
  }, [])

  useEffect(() => {
    console.log("selected option :",selectedoption);
    console.log("question list", questionList);
    console.log("current question", currentQuestion); 
    console.log("answer is ", answerT)
  }, [selectedoption, questionList, currentQuestion,answerT]);
  
  const getData = async () => { 
    const url = "api/question/list/";
   
    await axios.post(url,{},config).then((res)=>{
        setQuestionList(res.data)
    })
   
  } 


  useEffect(() => {
      if(currentQuestion === answerT.length-1){
        handleFormSubmit();
      }
  }, [answerT]);

  const onChange = async (e,item) => {
    console.log(item);
    const {id,option_number,question_id } = item;
   await setSelectedOption({id, option_number,question_id})
  };

  const handleFormSubmit = async () => {
    const url = "api/gift-test/add/";
    const res = await axios.post(url, answerT, config);
    history.push("/scriptureGiftResult", {scriptureGiftResult: answerT});
  }

  
  const nextQustion = async (e)=>{
    e.preventDefault()
      if(selectedoption !== ""){
        let result = selectedoption;
        result['option_id'] = result.id;
        result.user_id = isAuthorise.id;
        // result.status = true;
        delete result['id'];
        setAnswerT([...answerT, result]);
        if( currentQuestion !== questionList?.total_question-1){
          setCurrentQuestion(currentQuestion + 1);
          setSelectedOption(null);
        }
      }
  }
  return (
    questionList ? 
    <div className="pm-test-page scripture-gifttest padding-top ">
      <Header heading="Scripture Gift Test" back={<FaChevronLeft />} path="scriptureGiftStartTest" />
      <div className="container">
        <div className="steps">
          <span className="current-page">{currentQuestion + 1}</span>
          <span>/</span>
          <span className="total-page">{questionList?.total_question}</span>
        </div>
        <form className="pm-level-test" >

          <div>
            <h5 className="question">
              {currentQuestion + 1}. <span>{questionList.data[currentQuestion].question}</span>
            </h5>
            {
              questionList?.data[currentQuestion].option.map((item, i) => {
                return (
                  <label className="radio-custom" key={i}>
                    <input
                      type="radio"
                      name="options"
                      checked = {selectedoption?.id === item.id }
                      onChange={(e)=>{onChange(e,item)}}
                    />
                    {item.option_name}
                    <span className="checkmark"></span>
                  </label>
                )
              })
            }
          </div>
          <div className="next">
            {
              <button
                type={currentQuestion === questionList?.total_question - 1 ? "submit" : ""}
                className= "primary-btn"
                onClick={nextQustion}
                >
                {currentQuestion === questionList?.total_question - 1 ? "SUBMIT" : "NEXT"}
              </button>
            }
          </div>
        </form>
      </div>
    </div>
      : <Loader/>
  );
}
