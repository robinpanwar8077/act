import { Link, useHistory } from "react-router-dom";
import React,{useEffect} from "react";
import { FaChevronLeft } from "react-icons/fa";
import Header from "../components/Header";
import Menu from "../components/Menu";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import mentorImg from "../assets/images/mentorImg.png";

export default function ChatPage() {

  const history = useHistory();
    const userDetail = JSON.parse(localStorage.getItem("userdata"))
    const isAuthorise = JSON.parse(localStorage.getItem("user"))
    console.log(isAuthorise)
    console.log(userDetail)


    
    useEffect(() => {
      if (isAuthorise === null) {
        history.push("/login");
      }
    }, []);

  return (
    <div className="chat-screen-pages">
    <Header heading="Message" back={<FaChevronLeft />} path="/home" hell="www.google.com"/>
      <div className="chat-tab padding-top">


      

        <Tabs defaultActiveKey="group">
        {
          // <Tab eventKey="chat" title="Chat">
            //   <div className="container">
            //     <Link to="/singlechat" className="single-chat">
            //       <div className="message">
            //         <div className="profile-pic">
            //           <img src={mentorImg} alt="profile pic" />
            //         </div>
            //         <div>
            //           <p>Darell Steward</p>
            //         </div>
            //       </div>
            //       <div className="time">
            //         <span>20 min ago</span>
            //       </div>
            //     </Link>
            //   </div>
            // </Tab>

        } 


          {/* <Tab eventKey="group" title="Group">
          
            <div className="container">
              <Link to="/legacygroup" className="single-chat">
                <div className="message">
                  <div className="profile-pic">
                    <img src={mentorImg} alt="profile pic" />
                  </div>
                  <div className="msg-detail">
                  { userDetail ? 
                            <p>{userDetail.group_name}</p> :
                            <h2>hello</h2>
                            }
                    
                  </div>
                </div>
                <div className="time">
                  <span>{userDetail.updated_date}</span>
                </div>
              </Link>
            </div>
          </Tab> */}

          <Tab eventKey="group" title="Group">
          <Link to="/legacygroup" className="single-chat">
          <div class="container-fluid">
                        <div class="">
                            <div class="sltMsg-grp">
                                <div class="sltMsg-grp-cont">
                                    <figure class="profImg">
                                        <img style={{"height":"68px" , "width" : "68px" }} src={mentorImg} alt="" />
                                    </figure>
                                    <div class="profTxt">
                                        <h5>{userDetail?.group_name}</h5>
                                        
                                    </div>
                                </div>
                                <div class="Msg-grpDate">
                                    <span>{userDetail?.updated_date.slice(11,19)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    </Link>
            
          </Tab>
        </Tabs>
      </div>
      <Menu activeChat="active"/>
    </div>
  );
}
