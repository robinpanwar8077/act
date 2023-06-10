import { Link, useHistory } from "react-router-dom";
import React,{useEffect, useState} from "react";

import { BsChevronRight } from "react-icons/bs";
import Menu from "../components/Menu";
import RequestChangeMentor from "./RequestChangeMentor"
import ScriptureLevelBar from "../components/ScriptureLevelBar";
import mentorImg from "../assets/images/mentorImg.png";
import axios from 'axios';

const Profilepage = ({props}) => {
  const user = JSON.parse(localStorage.getItem("user"));
  
  const history = useHistory(); 
  const [loggedOut, setLoggedOut] = useState(false)
  const isAuthorise = JSON.parse(localStorage.getItem("user"));
  
  useEffect(() => {
    if (!user) {
      history.push("/login");
    }
    // console.log(user.user_type)
    
  }, []);
  const handleLogout = () => {
    localStorage.clear()
    setLoggedOut(true)
  }

  if (loggedOut) {
    history.push("/login");
  }
  const [file, setFile] = useState();
 var usr = JSON.parse(localStorage.getItem('user'))
 if(isAuthorise) {
  var token = isAuthorise.token
}
else{   
    var token = ""
}

 




 const handleChange = (e) => {

  
   const url = `https://act.cladev.com/api/ProfileUpdate/${usr.id}/`;
    if (isAuthorise !== null) {
  var token = isAuthorise.token
}
else{
  var token = null
}
const profile_pic =e.target.files[0]
let form_data = new FormData()
form_data.append('profile_pic', profile_pic, profile_pic.name);

  
   
  const config = {
    headers: {
      "Content-Type": "multipart/form-data ",
      "Authorization": `Token ${token}`
    },
  }
   axios.post(url,form_data,config).then((result)=>{
    console.log("shantanu",result)
   }).catch(err => console.log("error rj",err));


     
    
     setTimeout(() => 
     getdata()
     , 1000);
 };
// const [file, setFile] = useState();
// function handleChange(e) {
//     console.log(e.target.files);
//     setFile(URL.createObjectURL(e.target.files[0]));
// }

//  if(isAuthorise !== null) {
//   if(isAuthorise.user_type === "2"){
//       history.push("/home")
//      }
// }

const [data,setData] = useState();

const config = {
  headers:{
    "Content-Type":"Application/json",
    "Authorization": `Token ${token}`
  },}

  
const getdata =()=>{


  
  const url = `https://act.cladev.com/api/get-profile-image/${usr.id}/`;
  
  
  axios.get(url,config).then((result)=>{
    setData(result.data.data.profile_pic)
    console.log("sucess",data)
    
  
    
  }).catch((error) => {
    console.log("error from api", error)

    
  })
 
  console.log("shnatbju",data)
}
console.log("asdfghijkl",data)

useEffect (()=>{
  const url = `https://act.cladev.com/api/get-profile-image/${usr.id}/`;
  
  
  axios.get(url,config).then((result)=>{
    setData(result.data.data.profile_pic)
    
  
    
  }).catch((error) => {
    console.log("error from api", error)

    
  })

},[])
  return (
    <>
      <div className="profile-page padding-top">
        <section className="header-banner"></section>
        <div className="desciple-profile">
          <div className="container">
            <div className="profile-content">
              <div className="mentor-details">
                <div className="mentor-img">
                  <div>
                  <img src= {"https://act.cladev.com" + data} />
                  
          <input class="image" type="file" onChange={handleChange} ></input>
                </div>
                </div>
                <div className="mentor-name">
                    <span>{`${user?.first_name} ${user?.last_name}`}</span>
                  <p>Scripture key Level 1</p>
                </div>
              </div>
              <div className="scripture-level">
                <ScriptureLevelBar />
              </div>
              <div className="test-button">
                <Link to="/scriptureKey" className="scripture-key">
                  Scripture Key Test
                </Link>
                <Link to="pmlevel" className="pm-level">
                  PM Level Test
                </Link> 
              </div>
            </div>
            <div className="listing">
              <ul>
                <li className="list">
                 { 
                  //  <Link to="/scriptureKeyLevel" className="linking">
                  //   <p>Scripture Key Level</p>
                  //   <BsChevronRight />
                  // </Link>
                }
                  <Link to="#" className="linking disable">
                    <p>Pm Level</p>
                    <BsChevronRight />
                  </Link>
                  <Link to="/payment" className="linking">
                    <p>Payment Information</p>
                    <BsChevronRight />
                  </Link>
                  {
                    (user && user?.user_type === '2') ?
                    <Link to="/requestChangeDesciple" className="linking">
                    <p>Request to change Disciple</p>
                    <BsChevronRight />
                    </Link>
                    :
                    <Link to="/requestChangeMentor" className="linking">
                      <p>Request to change Mentor</p>
                      <BsChevronRight />
                    </Link>
                  }
                   
                 
                  <Link to="/about" className="linking">
                    <p>About Us</p>
                    <BsChevronRight />
                  </Link>
                  <Link to="/privacy" className="linking">
                    <p>Privacy Policies</p>
                    <BsChevronRight />
                  </Link>
                  <Link to="/changePassword" className="linking">
                    <p>Change Password</p>
                    <BsChevronRight />
                  </Link>
                  <Link to="/termsAndCondition" className="linking">
                    <p>Terms & Conditions</p>
                    <BsChevronRight />
                  </Link>
                  <Link to="/faq" className="linking">
                    <p>FAQs</p>
                    <BsChevronRight />
                  </Link>
                </li>
              </ul>
            </div>
            <div className="logout">
              <button  className="primary-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
      <Menu activeProfile="active" />
    </>
  );
};

export default Profilepage;
