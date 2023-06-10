import Accordion from "react-bootstrap/Accordion";
import { BsChevronRight } from "react-icons/bs";
import { FaChevronRight } from "react-icons/fa";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import Menu from "../components/Menu";
import React from "react";

const StudyMaterial = () => {
  return (
    <>
    <Header heading="Study material" path="home" />
    <div className="profile-page study-material-page padding-top">
        <div className="">
          <div className="container">
            <Accordion className="study-material-accordian">
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <div className="pm-level">
                    <div className="content">
                      <h3>Scripture Key </h3>
                      <p>
                        Lorem ipsum dolor sit amet, labore et dolore magna
                        aliqua.
                      </p>
                    </div>
                   
                  </div>
                </Accordion.Header>
                <Accordion.Body>
                  <div className="listing">
                    <ul>
                      <li className="list">
                        <Link to="#" className="linking">
                          <p>Scripture Key Level</p>
                          <BsChevronRight />
                        </Link>
                        <Link to="#" className="linking">
                          <p>Scripture Key 1</p>
                          <BsChevronRight />
                        </Link>
                        <Link to="#" className="linking">
                          <p>Scripture Key 2</p>
                          <BsChevronRight />
                        </Link>
                        <Link to="#" className="linking">
                          <p>Scripture Key 3</p>
                          <BsChevronRight />
                        </Link>
                        <Link to="#" className="linking">
                          <p>Scripture Key 4</p>
                          <BsChevronRight />
                        </Link>
                        <Link to="#" className="linking">
                          <p>Scripture Key 5</p>
                          <BsChevronRight />
                        </Link>
                        <Link to="#" className="linking">
                          <p>Scripture Key 6</p>
                          <BsChevronRight />
                        </Link>
                        <Link to="#" className="linking">
                          <p>Scripture Key 7</p>
                          <BsChevronRight />
                        </Link>
                      </li>
                    </ul>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1" className="disable">
                <Accordion.Header >
                  <div className="pm-level ">
                    <div className="content">
                      <h3>PM Level</h3>
                      <p>
                        Lorem ipsum dolor sit amet, labore et dolore magna
                        aliqua.
                      </p>
                    </div>
                  </div>
                </Accordion.Header>
                <Accordion.Body>
                <div className="listing">
                <ul>
                  <li className="list">
                    <Link to="#" className="linking">
                      <p>Scripture Key Level</p>
                      <BsChevronRight />
                    </Link>
                    <Link to="#" className="linking">
                      <p>Scripture Key 1</p>
                      <BsChevronRight />
                    </Link>
                    <Link to="#" className="linking">
                      <p>Scripture Key 2</p>
                      <BsChevronRight />
                    </Link>
                    <Link to="#" className="linking">
                      <p>Scripture Key 3</p>
                      <BsChevronRight />
                    </Link>
                    <Link to="#" className="linking">
                      <p>Scripture Key 4</p>
                      <BsChevronRight />
                    </Link>
                    <Link to="#" className="linking">
                      <p>Scripture Key 5</p>
                      <BsChevronRight />
                    </Link>
                    <Link to="#" className="linking">
                      <p>Scripture Key 6</p>
                      <BsChevronRight />
                    </Link>
                    <Link to="#" className="linking">
                      <p>Scripture Key 7</p>
                      <BsChevronRight />
                    </Link>
                  </li>
                </ul>
              </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </div>
      </div>
      <Menu activeStudy="active" />
    </>
  );
};

export default StudyMaterial;
