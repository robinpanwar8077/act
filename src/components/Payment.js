

import { Link } from "react-router-dom";
import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import {  useHistory } from "react-router-dom";



export default function Payment(props) {

  const history = useHistory();
  const isAuthorise = JSON.parse(localStorage.getItem("user"));
  
  var [email , setEmail] = useState(isAuthorise?.email);
  
  
  const [amount , setAmount] = useState(0);
  const [button , setButton ] = useState("")

  console.log(isAuthorise,"ppppppppppppppppppppppppppppp")

  const after_plan = JSON.parse(localStorage.getItem("subscription_plan"));

  
  
  if (isAuthorise == null) {
    history.push("/login")
  }

  if(isAuthorise !== null) {
    var token = isAuthorise.token
    var config = {
        headers: {
        "Content-Type": "Application/json ",
        "Authorization": `Token ${token}`
                },
                };
  }
    

    const [plans , setPLans] = useState([])

    function fetchPLans () {

      axios.post('https://act.cladev.com/api/subscription/list/' , {} , config)
      .then(response => setPLans(response.data.data) )
      

    }
    console.log(plans.data)
    

    useEffect(() => {
      fetchPLans();
    },[]);

    function navigate() {
      history.push("/home")
    }

    

    function handleChange(e){
      console.log(e.target.value)
      const val = e.target.value
      
      if (val == 1) {
        localStorage.setItem("Plans" , val)
        setButton("Join")
      }
      if (val == 2) {
        localStorage.setItem("Plans" , val)
        setButton("Pay & Join")
      }
    }

    const handleStatus = (e) => {

    }

    const handleSubmit = (e) => {
      e.preventDefault()
      const plns = localStorage.getItem('Plans')
      console.log(plns,"ppppppppp")

      if (plns == 1 ){

        const obj = {"email" : email, "amount" : amount , "subscription_plan"  : plns, 
        "card_no" : "", "exp_month" : "" , "exp_year" : "", "cvc":"" }
        axios.post("https://act.cladev.com/api/create-payment-intent/",obj,config)
        .then(response => console.log(response))
        .then(setTimeout(() => 
        navigate()
        
        , 3000))
        localStorage.setItem("subscription_plan",1)
        
        
      }
      else if (plns == 2 ){
        localStorage.setItem("subscription_plan",2)
        window.location.href = "/checkout"
      }

    }



  return (
    
    <div className="payment-page">
      <header className="common-header">
        <div className="col">
          <Link to="/profile">Cancel</Link>
        </div>
        <div className="col">
          <h2>Payment</h2>
        </div>
        <div className="col">
          <div className="pay-fee">
            <input type="submit" form="payment_form" value={button} />
          </div>
        </div>
      </header>

      <div className="payment-method">
        <div className="container">
          <form onSubmit={handleSubmit} id="payment_form" method="post">
            <h3>How do you want to pay?</h3>
            <div className="payment-method">



            {


after_plan ?

after_plan == "1"  ? 
  <label class="radio-custom">
                <input checked  name="question1"  type="radio" />
                <span className="plan-time">
                Veterans
                  <b>This Plan is Active</b>
                </span>
                <span class="checkmark"></span>
              </label> : 
              <label class="radio-custom">
              <input checked    name="question1"  type="radio" />
              <span className="plan-time">
              Non-Veterans
                <b>This Plan is Active</b>
              </span>
              <span class="checkmark"></span>
            </label>

:


 


  


  isAuthorise?.subscription_plan ?
  
  isAuthorise?.subscription_plan == "1"  ? 
    <label class="radio-custom">
                  <input checked  name="question1"  type="radio" />
                  <span className="plan-time">
                  Veterans
                    <b>This Plan is Active</b>
                  </span>
                  <span class="checkmark"></span>
                </label> : 
                <label class="radio-custom">
                <input checked    name="question1"  type="radio" />
                <span className="plan-time">
                Non-Veterans
                  <b>This Plan is Active</b>
                </span>
                <span class="checkmark"></span>
              </label>
  
  :
  
  
    plans.map ((item) => (
  
      <label class="radio-custom">
            <input  onChange={handleChange}  name="question1" value={item.id}  type="radio" />
            <span className="plan-time">
            {item.title}
              <b>{item.description}</b>
            </span>
            <span class="checkmark"></span>
          </label>
  
    ))
          
          
          }
        
        
            





              
            </div>
          </form>
        </div>
      </div>
      
      
    </div>
  );
}


















// import { Link } from "react-router-dom";
// import React from "react";

// export default function Payment(props) {

//   return (
//     <div className="payment-page">
//       <header className="common-header">
//         <div className="col">
//           <Link to="/profile">Cancel</Link>
//         </div>
//         <div className="col">
//           <h2>Payment</h2>
//         </div>
//         <div className="col">
//           <div className="pay-fee">
//             <input type="submit" form="payment_form" value="Pay Fee" />
//           </div>
//         </div>
//       </header>

//       <div className="payment-method">
//         <div className="container">
//           <form id="payment_form">
//             <h3>How do you want to pay?</h3>
//             <div className="payment-method">
//               <label class="radio-custom">
//                 <input type="radio" name="question1" />
//                 <span className="plan-time">
//                   Weekly
//                   <b>$28/week for 3 months</b>
//                 </span>
//                 <span class="checkmark"></span>
//               </label>
//               <label class="radio-custom">
//                 <input type="radio" name="question1" />
//                 <span className="plan-time">
//                   Monthly
//                   <b>Monthly $112/month for 3 months</b>
//                 </span>

//                 <span class="checkmark"></span>
//               </label>
//               <label class="radio-custom">
//                 <input type="radio" name="question1" />
//                 <span className="plan-time">
//                   One Time
//                   <b>$336 or more as a total one-time offering</b>
//                 </span>
//                 <span class="checkmark"></span>
//               </label>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }
