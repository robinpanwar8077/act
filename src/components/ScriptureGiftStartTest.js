import { Link, useHistory } from "react-router-dom";
import React ,{useEffect}from "react";

import { FaChevronLeft } from "react-icons/fa";
import Header from "./Header";

export default function ScriptureGiftStartTest() {
  const isAuthorise = JSON.parse(localStorage.getItem("user"));
  const history = useHistory()
  useEffect(() => {
    if (!isAuthorise) {
      history.push("/login");
    }
  }, []);
  return (
    <div className="pm-test-result-page scripture-gift-test scripture-gifttest padding-top">
      <Header heading="Scripture Gift Test" back={<FaChevronLeft />} path="scriptureKey" />
      <div className="container">
        <div className="result-content">
          <div className="">
            <h3>Sample Myers-Briggs Personality Test </h3>
            <span>38 Questions</span>
            <p>
              A function-based sample assessment to determine which of the 16
              personality types reflects your natural tendencies. This test
              shall not only disclose your personality type but also help you to
              improve your weaknesses.
            </p>
            <p>
              You shall find a few statements very obvious and others confusing.
              Your task is to select the one which you can associate the most.
              There are no wrong or right answers. Enjoy!
            </p>
          </div>
          <div className="go-to-home">
            <Link className="primary-btn" to="/scriptureGiftTest">
              START
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
