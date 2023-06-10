import { FaChevronLeft } from "react-icons/fa";
import Header from "../components/Header";
import React from "react";
import axios from "axios";
import  { useState,useEffect } from "react";
import parse from "html-react-parser";
import { Accordion, AccordionSummary, AccordionDetails, Typography } 
from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';



const Faq = () => {
  const [show, setShow] = useState([]);

  useEffect(() => {
  const url = 'api/faqlisting/';
  const config = {
    headers:{
      "Content-Type":"Application/json",
    },}
   axios.post(url,config).then((result)=>{
    console.log("shantanu",result)
    setShow(result.data)
   
   }).catch(err => console.log("error rj",err));
 },[]);
 console.log("shantanu",show)
  return (
    <div className="about-us-page privacy-policy-page padding-top">
      <Header
        heading="FAQs"
        back={<FaChevronLeft />}
        path="profile"
      />

      <div className="about-us-content">
        <div className="container">
        {show.map((event) => {

        console.log("shantanu",show)
        return (
          <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography><b className="parse">{parse(event.question)}</b></Typography>
          </AccordionSummary>
          <AccordionDetails >
              <h3> {parse(event.answer)}</h3>
          </AccordionDetails>
      </Accordion>
      ) 
        })}
         
        </div>
      </div>
    </div>
  );
};

export default Faq;
