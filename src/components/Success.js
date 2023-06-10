import React from 'react'
import payment_successfully from "../assets/images/payment_successfully.png";
function Success() {
  return (
    
    <>
     <section class="main main-lft">
        

        <div class="container-fluid container-mrg">
            <div class="row">
              <div class="col-md-12">
                <div class="payment-logo">
                    <figure>
                        <img src={payment_successfully} alt="" />
                    </figure>
                    <div class="mt-4">
                        <h1 class="h1p">Payment Successfully</h1>
                        <h4 style={{"font-weight" : "900"}}>You will be redirected soon....</h4>
                    </div>
                </div>
              </div>
              <div class="col-md-12">
                
              </div>
            </div>
        </div>
    </section>
      </>
  )
}

export default Success