import { Link, useHistory, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";

import { FaChevronLeft, } from "react-icons/fa";
import Header from "./Header.js";
import Loader from "./Loader.js";
import Menu from "./Menu"
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import axios from "axios";
import userTwo from "../assets/images/userTwo.png";

export default function DiscipleProfile() {
  const [file, setFile] = useState()
  const history = useHistory();
  const isAuthorise = JSON.parse(localStorage.getItem("user"));
  var [discipleData, setDiscipleData] = useState(null);
  const [keyList, setKeyList] = useState(null)
  const [pmList, setPmList] = useState(null)
  const [currentKeylevel , setCurrentKeyLevel] = useState(1)
  const [currentPmlevel , setCurrentPmLevel] = useState(1)

  const params = useLocation().state?.discipleList;

  useEffect(() => {
    if (!isAuthorise) {
      history.push("/login")
    }
  }, [])

   useEffect(() => {
    if (isAuthorise !== null) {
      console.log(params,"params",discipleData,);
      if (params) {
        getUserData(params)
      }
      
    }
     
    }, []);
    
    useEffect(()=>{
      if (isAuthorise !== null ) {
        if(params){
          getPmData()
          getKeyData()
        }
        
      }
    
      

  },[currentKeylevel,discipleData,currentPmlevel]);
  if (isAuthorise !== null) {
    var token = isAuthorise.token
  }
  if (isAuthorise !== null ){
    var config = {
   
      headers: {
        "Content-Type": "Application/json ",
        "Authorization": `Token ${token}`
      },
    }
  }
  
 if (isAuthorise !== null && params ){

  var getUserData =  async(params) => {
    var url = `api/userone/${params.user_id}`
    await axios.get(url,config).then((res) => {
      setDiscipleData(res.data.data.user)
      const url = 'api/gift-exam-result/get/';
      const body = { }
      axios.post(url,body,config).then((result)=>{
          const object = result.data.find(obj => obj.user_id === res.data.data.user.id);
          setFile(object)
       }).catch(err => console.log("error rj"));

    })
  }
  var getKeyData = async () =>{
    setCurrentKeyLevel(discipleData?.key_level)
    await axios.post("api/listingKeyLevel/", {}, config).then((result) => {
      setKeyList(result.data.map((el,idx) => ({...el,isCheck:(currentKeylevel >= (idx+1) ) })));
    });
  } 
  
  var getPmData = async ()=>{
    setCurrentPmLevel(discipleData?.pm_level)
    await axios.post("api/listingPMlevel/", {}, config).then((result) => {
      setPmList(result.data.map((el,idx)=>({...el,isCheck:(currentPmlevel >= (idx+1))})))
    })
  }

  var onChecked = async (item,index)=>{
    try {
      var resp = await axios.post(`api/update/key_level/`,{
        "user_id":params.user_id,"key_level": index + 1
      },config)
      if (resp.status === 200)  {
        item.isCheck = !item.isCheck
        setKeyList(keyList.map(el => (
          el.id === item.id 
          ?  item 
          :  el 
        )))
      }
    } catch (error) {
      console.log(error.data.message);
    }
  }
  
  var onCheckedPm =async (item,index)=>{
    try{
      var resp = await axios.post(`api/update/pm_level/`,{
        "user_id":params.user_id,"pm_level": index + 1
      },config)
      if(resp.status === 200){
        item.isCheck = !item.isCheck

        setPmList(pmList.map(el => (
          el.id === item.id 
          ?  item 
          :  el 
        )))
      }
    }catch(error){
      console.log(error.data.message);
    }

  }

 }
 

  return (
    <div>
      <Header heading="Disciple Profile" path="discipleList" />
      {
        discipleData ?
          <div className="disciple-profile-page padding-top">
          <Link to='/home' className="back-btn"><FaChevronLeft /></Link>
            <div className="container">
              <div className="disciple-user-details">
                <div className="disciple-profile">
                  <div className="user-profile">
                    <div className="img">
                      <img src={userTwo} alt="profile" />
                    </div>
                    <h3>{discipleData.username}</h3>
                  </div>
                  <div className="personal-info">
                    <h4>Personal Info</h4>
                    <div className="d-flex align-items-center justify-content-between details">
                      <h5>Contact No.</h5>
                      <p>{discipleData.mobile}</p>
                    </div>
                   
                    <div className="d-flex align-items-center justify-content-between details">
                      <h5>Email ID</h5>
                      <p>{discipleData.email}</p>
                    </div>
                    <div className="d-flex align-items-center justify-content-between details">
                      <h5>Points</h5>
                      <p>{file?.mark}</p>
                    </div>
                   
                    <Link className="view-profile" to="/profile">View Profile</Link>
                  </div>
                </div>
                <div className="profile-tab">
                  <Tabs defaultActiveKey="scriptureKeyLevel" id="disciple-level">
                    <Tab eventKey="scriptureKeyLevel" title="Scripture key level">
                      {
                        keyList ?
                          <form>
                            {
                              keyList.map((item, index) => {
                                return (
                                  <div className="level-control" key={index}>
                                    <Link to="/scriptureKey" className="linking">
                                      <div className="pm-level">
                                        {item.name}
                                      </div>
                                    </Link>

                                    <label className="switch">
                                      <input type="checkbox" disabled={(index) >= (currentKeylevel+1)} checked={item.isCheck} onChange={(e)=>onChecked(item,index)}/>
                                      <span className={(index) >= (currentKeylevel+1)?"slider disable":"slider"}>
                                        <p>Yes</p>
                                        <p>No</p>
                                      </span>
                                    </label>
                                  </div>
                                )
                              })
                            }
                          </form>
                          :
                          <Loader />
                      }

                    </Tab>
                    <Tab eventKey="PMLevel" title="PM Level">
                      {
                        pmList ?
                          <form>
                            {
                              pmList.map((item, index) => {
                                return (
                                  <div className="level-control" key={index}>
                                    <Link to="/pmLevel" className="linking">
                                      <div className="pm-level">
                                        {item.name}
                                      </div>
                                    </Link>
                                    <label className="switch">
                                      <input type="checkbox" disabled={(index)>=(currentPmlevel+1)} checked={item.isCheck} onChange={(e)=>onCheckedPm(item,index)} />
                                      <span className="slider">
                                        <p>Yes</p>
                                        <p>No</p>
                                      </span>
                                    </label>
                                  </div>
                                )
                              })
                            }

                          </form>
                          :
                          <Loader />
                      }

                    </Tab>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
          :
          <Loader />
      }
      <Menu activeProfile="active" />
    </div>
  );
}
