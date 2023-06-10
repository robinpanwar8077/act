import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { FaChevronLeft } from 'react-icons/fa';
import Header from './Header';
import { Link } from "react-router-dom";
import Loader from './Loader';
import axios from "axios";

export default function PmTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedoption, setSelectedOption] = useState(null);
  const [questionList, setQuestionList] = useState('');
  const [totalAnswer, setTotalAnswer] = useState([]);
  const params = useParams();
  console.log("SHAJHHB",params)
  const history = useHistory();
  const isAuthorise = JSON.parse(localStorage.getItem("user"));
  if (isAuthorise !== null ){
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
      history.push('/login');
    }
  }, [isAuthorise]);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
console.log(questionList.data);
  }, [questionList, currentQuestion, selectedoption, totalAnswer]);

  const getData = () => {
    const url = 'api/pm-level-question/list/';
    const body = {};

    axios.post(url, body, config).then((result) => {
      const output = {
        data: result.data.data.filter(el => el.pm_level == params.id),
        total_question: result.data.data.filter(el => el.pm_level == params.id)
          .length,
        passing_percentage: result.data.passing_percentage
      };
      setQuestionList(output);
    })
  };

  const onChange = async (e, value) => {
    await setSelectedOption(value);
  };



  useEffect(() => {
    if (totalAnswer.length == questionList.total_question) {
      handleFormSubmit();
    }
  }, [totalAnswer]);


  const nextQustion = async (e) => {

    e.preventDefault();
    const answer = {};
    
    answer["user_id"] = isAuthorise.id;
    answer["page_id"] = params;
    answer["pm_question_id"] = questionList?.data[currentQuestion]?.id;
    answer["user_answer"] = selectedoption;
    answer["answer_status"] = questionList?.data[currentQuestion]?.correct_answer == selectedoption ? 1 : 0;
    await setTotalAnswer([...totalAnswer, answer]);
    console.log("shantanu",totalAnswer)
    if (selectedoption !== "") {
      if (currentQuestion < questionList.total_question - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedOption(null);
      
      }
    }
  };

  const handleFormSubmit = async () => {

    const url = "api/pm-test/add/";
    const body = {"data": totalAnswer}
    const res = await axios.post(url,body, config,);
    history.push("/pmTestResult", { pmTestResult: totalAnswer, questionList: questionList });
  };


  return questionList ? (
    <div className="pm-test-page padding-top">
      <Header heading="PM  Test" back={<FaChevronLeft />} path="/pmLevel" />

      <div className="container">
        <div className="steps">
          <span className="current-page">{currentQuestion + 1}</span>
          <span>/</span>
          <span className="total-page">{questionList?.total_question}</span>
        </div>
        {!(questionList.data.length === 0)?
        <form className="pm-level-test">
          <div>
            <h5 className="question">
              {currentQuestion + 1}.
              {questionList?.data[currentQuestion]?.question}
            </h5>

            <label className="radio-custom">
              <input type="radio" name="options" onChange={e => onChange(e, 1)} checked={selectedoption === 1} />
              {questionList?.data[currentQuestion]?.op1}
              <span className="checkmark"></span>
            </label>
            <label className="radio-custom">
              <input type="radio" name="options" onChange={e => onChange(e, 2)} checked={selectedoption === 2} />
              {questionList?.data[currentQuestion]?.op2}
              <span className="checkmark"></span>
            </label>
            <label className="radio-custom">
              <input type="radio" name="options" onChange={e => onChange(e, 3)} checked={selectedoption === 3} />
              {questionList?.data[currentQuestion]?.op3}
              <span className="checkmark"></span>
            </label>
            <label className="radio-custom">
              <input type="radio" name="options" onChange={e => onChange(e, 4)} checked={selectedoption === 4} />
              {questionList?.data[currentQuestion]?.op4}
              <span className="checkmark"></span>
            </label>
          </div>
          <div className="next">
            {
              <button
                type={
                  currentQuestion === questionList?.total_question - 1
                    ? 'submit'
                    : ''
                }
                className="primary-btn"
                onClick={nextQustion}
              >
                {currentQuestion === questionList?.total_question - 1
                  ? 'SUBMIT'
                  : 'NEXT'}
              </button>
              
            }
          </div>
        </form>
        :
        <div className="no-test">
          <h2 className="text-center h2 pt-4">No Test Available </h2>
          <Link to="/pmLevel" className='primary-btn'>Go Back</Link>
        </div>
          }
      </div>
    </div>
  ) : (
    <Loader/>

  );
}
