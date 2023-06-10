import { Link, useHistory, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";

import {
  AiOutlineClose
} from "react-icons/ai";
import Loader from "./Loader";
import { Modal } from "react-bootstrap";
import Header from "./Header";

export default function GenralArticle() {
  const [checkedItems, setCheckedItems] = useState([
    {
      id: 1,
      value:
        " We believe in the Triune God. God created and loves all of His creation - the earth and all of the world's inhabitants. We believe that God's Son, Jesus Christ, transforms lives through his death on the cross, his victory over death by resurrection, and his Great Commission for all believers, as God's Spirit is active in the world.",
      isChecked: false,
    },
    {
      id: 2,
      value:
        "We are all part of God's purposeful plan as we gather for fellowship, worship, and connect with believers everywhere. When we meditate on the Holy Scriptures or hear God's word in worship, we are drawn more deeply into God's saving grace.",
      isChecked: false,
    },
    {
      id: 3,
      value:
        "The convictions shared by Christians from many different traditions are expressed in the church statements of belief called creeds. These ecumenical creeds that Christianity affirms and uses in worship, confess the faith of the Christian Church through the ages and around the world.",
      isChecked: false,
    },
    {
      id: 4,
      value:
        "The Confession of Faith in Christ and the activation of that faith in the Acts Ministry is the greatest calling and ministry commitment to Jesus Christ. The Acts Ministry accepts the following creeds as true declarations of the Christian faith and historical progression of God's church:",
      isChecked: false,
    },
  ]);
  const [error, setError] = useState(false);
  const closePopup = () => setError(false);
  const history = useHistory();
  const location = useLocation();
  const isDescipler = location.state?.descipleData;
  const isMentor = location.state?.mentorData;
 console.log("shant",isMentor)
 
 console.log(location.state,"state")

 useEffect(() => {
  getUser()
}, [isDescipler,isMentor]);

  const getUser = () => {
    console.log("params", isDescipler);
    console.log("params2", (isMentor));
  }

  const navigateDisciple = () => {
    history.push("/registrationFormCertification",{"descipleData":isDescipler});
  };
  const navigateMentor = () => {
    history.push("/registrationFormCertification",{"mentorData":isMentor});
  };
  
  const onSubmit = (e) => {
    e.preventDefault();
    if(checkedItems.findIndex(ele => ele.isChecked === false)  === -1 && isDescipler){
      navigateDisciple();
   
    }else if(checkedItems.findIndex(ele => ele.isChecked === false)  === -1  && isMentor){
      navigateMentor()
 
    }else {
      setError(true)
    }
  };
  useEffect(() => {
    console.log("checkedItems: ", checkedItems);

  }, [checkedItems]);
  
  const onChange = (e,item) => {
    let tempTerm  = [...checkedItems];
    const index = tempTerm.findIndex(ele =>  item.id === ele.id);
    tempTerm[index].isChecked = !tempTerm[index].isChecked;
    setCheckedItems(tempTerm);
  };
  
  
  return checkedItems ? (
    <div className="genral-article-page RegistrationForm">
      <form onSubmit={onSubmit}>
       
              <Header heading="  Acts Ministry General Articles of Belief" />
        <Modal show={error} onHide={closePopup}>
          <div className="popup-content error">
            <span onClick={closePopup} className="cursor-pointer">
              <AiOutlineClose />
            </span>
            <h3>Please agree to articles of belief.</h3>
            <p>We are only accepting applicants that agree with all articles of belief of Acts. </p>
          </div>
        </Modal>
        <div className="container">
          <div className="form-body">
            {checkedItems.map((item, index) => {
              return (
                <div className="terms" key={index}>
                  <p><span>{item.id} ) </span> {item.value}</p>
                  <div className="agree-btn">
                    <div className="wrap">
                      <input
                        type="checkbox"
                        name="terms"
                        onChange={(e)=> onChange(e,item)}
                        checked={item.isChecked}
                      />
                      <label>Agreed</label>
                    </div>
                  </div>
                </div>
              );
            })}
    
     <Link to="login">  <button type="button" class="btn btn-secondary canc" >Cancel</button></Link>
       
<button type="submit" class="btn btn-secondary subm" > <p style={{"color":"#fbbb00"}}>Submit</p></button>
          </div>
        </div>
        
        
      </form>
    </div>
  ) : (
    <Loader />
  );
}
