import { Link, useHistory } from "react-router-dom";
import React, { useEffect } from "react";

import DiscipleList from "../components/DiscipleList"
import { FaChevronLeft, } from "react-icons/fa";
import Header from "../components/Header";

export default function DiscipleListPage(props) {
  const history = useHistory();
  let isAuthorise = JSON.parse(localStorage.getItem("user"));
  if (isAuthorise !== null ){
    var mentorUser = isAuthorise.user_type;
  }
  

  useEffect(() => {
    // console.log(isAuthorise)
    if (!isAuthorise) {
      history.push("/login")
    }
  }, [])

  return (
    <div className="disciple-list-page padding-top">
      <Header heading="Disciple List" back={<FaChevronLeft />} path="home" />
      <div className="disciple-list">
        <div className="container">
            <DiscipleList/>
        </div>
        </div>
      </div>
  );
}
