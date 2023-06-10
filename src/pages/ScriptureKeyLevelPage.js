import { FaChevronLeft } from "react-icons/fa";
import Header from "../components/Header";
import React from "react";

function ScriptureKeyLevelPage() {
  return (
    <div className="scripture-key-level-page padding-top">
      <Header
        heading="scripture key level"
        back={<FaChevronLeft />}
        path="profile"
      />

      <div className="container">
        <div className="key-levels">
          <div className="single-level">
            <div className="level-name">
              <p>Scripture key 1</p>
            </div>
            <div className="level-access pass-test">
              <span>Pass</span>
            </div>
          </div>
          <div className="single-level">
            <div className="level-name">
              <p>Scripture key 2</p>
            </div>
            <div className="level-access give-test">
              <span>Give the Test</span>
            </div>
          </div>
          <div className="single-level">
            <div className="level-name">
              <p>Scripture key 3</p>
            </div>
            <div className="level-access disable">
              <span>Give the Test</span>
            </div>
          </div>
          <div className="single-level">
            <div className="level-name">
              <p>Scripture key 4</p>
            </div>
             <div className="level-access disable">
              <span>Give the Test</span>
            </div>
          </div>
          <p className="access-pm-level">Reached the scripture key level 4, you can access PM level study materials</p>
          <div className="single-level">
            <div className="level-name">
              <p>Scripture key 5</p>
            </div>
             <div className="level-access disable">
              <span>Give the Test</span>
            </div>
          </div>
          <div className="single-level">
            <div className="level-name">
              <p>Scripture key 6</p>
            </div>
             <div className="level-access disable">
              <span>Give the Test</span>
            </div>
          </div>
          <div className="single-level">
            <div className="level-name">
              <p>Scripture key 7</p>
            </div>
             <div className="level-access disable">
              <span>Give the Test</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScriptureKeyLevelPage;
