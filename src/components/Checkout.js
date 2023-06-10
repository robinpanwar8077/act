import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Menu from './Menu'
import {  useHistory } from "react-router-dom";
import axios from 'axios';
import { Modal } from "react-bootstrap";
import {
    AiOutlineClose,
    AiOutlineEye,
    AiOutlineEyeInvisible,
  } from "react-icons/ai";
  import { GiCheckMark, GiTransparentTubes } from "react-icons/gi";
import Success from './Success';


function Checkout() {
  const history = useHistory();
  const isAuthorise = JSON.parse(localStorage.getItem("user"));
  
   const [cardnumber , setCardNo] = useState();
  // const [email , setEmail] = useState(isAuthorise.email);

  const [email , setEmail] = useState();
  const [amount , setAmount] = useState();
  const [plan , setPlan] = useState(localStorage.getItem('Plans'));
  const [expirymonth , setExpirym] = useState();
  const [expiryyear , setExpiryy] = useState();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const closePopup = () => setError(false);
  const closePopupp = () => setVError(false);
  const [cvc , setCVC] = useState();
  const [error, setError] = useState(false);
  const [verror, setVError] = useState(false);
  const [value, setValue] = useState('');

  const [response , setResponse] = useState("");
  const [colorSet,colorSetSet]=useState()
  const location =useLocation();
  
 const data = location.state
 console.log("asdfgjk",data)
 const button6=()=>{
  colorSetSet(data)
  
 
  }
  
  if(isAuthorise) {
    var token = isAuthorise.token
}
else{   
    var token = ""
}

useEffect(() => {
  if(plan === "1"){
    setAmount(0)
  }
  if (plan === "2") {
    setAmount(150)
  }
})



const config = {
    headers: {
    "Content-Type": "Application/json ",
    "Authorization": `Token ${token}`
            },
            };




    

         

  const handleChangeCARD = (e) => {
    setCardNo(e.target.value)
  }


  const handleChangeM = (e) => {
    setExpirym(e.target.value)
   }

   const handleChangeY = (e) => {
    setExpiryy(e.target.value)
   }
 
   const handleChangeCVC = (e) => {
    setCVC(e.target.value)
    const result = e.target.value.replace(/\D/g, '');
    setValue(result);
   }


   const navigate = (e) => {
    history.push("/home")
   }


  
  
  // if (isAuthorise == null) {
  //   history.push("/login")
  // }

    const handlePayment = (e) => {
    e.preventDefault()
    

    const obj = {"email" : email, "amount" : amount , "subscription_plan"  : plan, 
    "card_no" : cardnumber, "exp_month" : expirymonth , "exp_year" : expiryyear, "cvc":cvc }
    console.log(obj)
    if (cardnumber && expirymonth && expiryyear && cvc){
        axios.post("https://act.cladev.com/api/create-payment-intent/",obj,config)
        
        .then(response => setResponse(response.data.message))
        .then(dta => setShow(true) ) 
        setTimeout(() => 
          navigate()
          , 8000);      
    }
    else{
        setVError(true)
    }
    
  }

  const maxLengthCheckCARD = (object) => {
    if (object.target.value.length > object.target.maxLength) {
     object.target.value = object.target.value.slice(0, object.target.maxLength)
      }
    }

    const maxLengthCheckM = (object) => {
      if (object.target.value.length > object.target.maxLength) {
       object.target.value = object.target.value.slice(0, object.target.maxLength)
        }
      }


      const maxLengthCheckY = (object) => {
        if (object.target.value.length > object.target.maxLength) {
         object.target.value = object.target.value.slice(0, object.target.maxLength)
          }
        }

        const maxLengthCheckC = (object) => {
          
          
          if (object.target.value.length > object.target.maxLength) {
            console.log("lllllllllllllll")
            
           object.target.value = object.target.value.slice(0, object.target.maxLength)
            }
          }

         
  return (
<>
    <div className="payment-page">
    <header className="common-header">
      <div className="col">
        <Link to="/registrationFormCertification" onClick={button6}>Cancel</Link>
        
      </div>
      <div className="col">
        <h2>Checkout</h2>
      </div>
      <div className="col">
        <div className="pay-fee">
          
        </div>              
      </div>
    </header>
  </div>

   <div class="container-fluid container-mrg ">
    <div class="row px-5">
        <div class="col-md-6">
            <div class="row">
                <div class="col-md-12 card-txt">
                    <div class="formBlock">
                        <div>
                            <h4>Card Details</h4>
                        </div>
                        <div class="formControl static">
                            <label for="" class="formLabel">Card Number</label>
                            <div>
                                <input maxLength = "16" onInput={maxLengthCheckCARD}  onChange={handleChangeCARD} type="number" class="formControl formField" placeholder='XXXX XXXX XXXX XXXX' required/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="formBlock">
                        <div class="formControl static">
                            <label for="" class="formLabel">Expiry Month</label>
                            <div>
                                <input maxLength="2" onInput={maxLengthCheckM} onChange={handleChangeM} type="number" class="formControl formField" placeholder="MM" required/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="formBlock">
                        <div class="formControl static">
                            <label for="" class="formLabel">Expiry Year</label>
                            <div>
                                <input maxLength="4" onInput={maxLengthCheckY} onChange={handleChangeY}  type="number" class="formControl formField" placeholder="YYYY" required/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="formBlock">
                        <div class="formControl static">
                            <label for="" class="formLabel">CVV</label>
                            <div>
                                <input maxLength="3" id='input2' value={value} onInput={maxLengthCheckC} onChange={handleChangeCVC} type="password" class="formControl formField" placeholder="***" required/>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
        </div>
        <div class="col-md-6 card-txt">
            <div class="card card-topMrg">
                <div>
                    <h5>Shipping Details</h5>
                </div>
                <div class="shipping-dtls">
                    <span>Email Address</span>
                    {isAuthorise ? <p class="shhiping-para">{isAuthorise.email}</p> : <p class="shhiping-para"></p>}
                    
                </div>
                <div class="shipping-dtls">
                    <span>Mobile Number</span>
                    {isAuthorise ?<p class="shhiping-para">{isAuthorise.mobile}</p> : <p class="shhiping-para"></p>}
                    
                </div>
            </div>
            <div class="card card-topMrg card-middleMrg">
                <div>
                    <h5>Price Details</h5>
                </div>
                <div class="price-dtls">
                    <span>Price</span>
                    
                     {plan == 2 ?
                     <p class="shhiping-para">$150</p>:<p class="shhiping-para">$0</p>
                     }
                    
                    
                    
                </div>
                <div class="price-dtls">
                    <span>Convenience Fee</span>
                    <p class="shhiping-para">$ 0</p>
                </div>
            </div>
            <div class="card card-bottom">
                <div class="price-dtls total-dtls ">
                    <span className='card-txt'>Total</span>
                    {plan == 2 ?
                     <p class="shhiping-para">$150</p>:<p class="shhiping-para">$0</p>
                     }
                    
                </div>
            </div>
            <div class="btnBlock justify-content-end">
                <a onClick={handlePayment} class="btn btn-new btn-full">CHECK OUT</a>
            </div>
        </div>
    </div>
   </div>

   <Modal show={show} onHide={handleClose}>
          <div className="popup-content success">
          <span>
              <GiCheckMark />
            </span>
            <Success />
          </div>
        </Modal>
        <Modal show={error} onHide={closePopup}>
          <div className="popup-content error">
            <span onClick={closePopup}>
              <AiOutlineClose />
            </span>
            <h3>Payment Failed !!!</h3>
            <p>Please try again. </p>
          </div>
        </Modal>

        <Modal show={verror} onHide={closePopupp}>
          <div className="popup-content error">
            <span onClick={closePopupp}>
              <AiOutlineClose />
            </span>
            <h3>Validation Failed !!!</h3>
            <p>Please fill all fields. </p>
          </div>
        </Modal>

<Menu />
</>
  )
}

export default Checkout