import React ,{useEffect} from "react";
import logo from "../assets/images/logo";
import {  useHistory } from "react-router-dom";
export default function Splash() {
  const history = useHistory();

  useEffect(() => {
    setTimeout(() => {
      navigate()
    }, 2000);
  },[]);
  function navigate() {
    history.push("/Login");
  }

  return (
    <div className="splash-page">
      <div className="container">
        <div className="spash-background">
          <div className="animate__animated  animate__zoomInUp">
            <img  src={logo} alt="logo"/>
          </div>
        </div>
        </div>
    </div>
  );
}
