import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { FaChevronLeft, FaFilePdf } from "react-icons/fa";
import { Link, useHistory, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

import Header from "./Header";
import { HiOutlineChevronRight } from "react-icons/hi";
import Loader from "./Loader";
import Slider from "react-slick";
import axios from "axios";
import parse from "html-react-parser"
export default function PmStudyMaterial(props) {
  const history = useHistory();
  let params = useParams();
  const [pmStudyData, setPmStudyData] = useState(null);
  const [dynamic_data, setDData] = useState({});
  const isAuthorise = JSON.parse(localStorage.getItem('user'));
  if (isAuthorise !== null) {
    var descipleUser = isAuthorise.user_type == "1";
    console.log(descipleUser,"user")
    var token = isAuthorise.token
    var config = {
        headers: {
          "Content-Type": "Application/json ",
          "Authorization": `Token ${token}`
        },
      }
  }
  

  console.log(pmStudyData,"dsadtratddtradadadcsxchagsxcash")
  
  
  useEffect(() => {
    if (!isAuthorise) {
      history.push('/login');
    }

    getData();
  }, []);

  useEffect(() => {
    console.log('data ', pmStudyData);
  }, [pmStudyData]);

  const getData = () => {
    const url = 'api/pm-level/get/';
    const body = JSON.stringify({ id: params.id });
    console.log("shantanu",body)
    
    axios.post(url,body,config).then((result)=>{
      if (result.data) {
     
        if(result.data.id === 1) {
          const obj = {
            "heading" : "PM 1 Study Material",
            "test" : "Take the test for PM 1"
          }
          setDData(obj)
        }
        if(result.data.id === 2) {
          const obj = {
            "heading" : "PM 2 Study Material",
            "test" : "Take the test for PM 2"
          }
          setDData(obj)
        }
        if(result.data.id === 3) {
          const obj = {
            "heading" : "PM 3 Study Material",
            "test" : "Take the test for PM 3"
          }
          setDData(obj)
        }
        if(result.data.id === 4) {
          const obj = {
            "heading" : "PM 4 Study Material",
            "test" : "Take the test for PM 4"
          }
          setDData(obj)
        }
      }
      
      setPmStudyData(result.data)
    }).catch(err => console.log("error rj",err));
  };
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
  };

  console.log(dynamic_data,"dynamic datatatata")


  const data = pmStudyData?.file_path;
  console.log(params,"rajat" , data);
  return (
    <div className="pm-study-material-page padding-top">
      <Header
        heading={dynamic_data.heading}
        back={<FaChevronLeft />}
        path="/pmLevel"
      />
      
      

      {pmStudyData ? (
        <div className="wrap">
          <div className="container">
           
            <div className="pm-study-materials">
              <h2 className="study-heading">What you'll learn</h2>
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h2>{props.studyHeading}</h2>
                <Link className="icon" to="scriptureKeyOneStudyMaterial">
                  <HiOutlineChevronRight />
                </Link>
              </div>
              <div className="learning-content">    
                <p>{parse(
                  pmStudyData.description)
                }</p>
              </div>

            </div>
            {
              (data)  ?
              <div className="video-slider pdf-slider">
                <h2>Pdf ({
                  (data)&& data?.pdf_data ?
                  data?.pdf_data?.length : `0`
                
                })</h2>
                
                {
                  (data?.pdf_data?.length < 1) ? <p className="no-data">No Pdf available  </p> :
                    <Slider {...settings} >
                      {
                        data?.pdf_data?.map((event, index) => {
                          return (
                            <div key={index} className="pdf">
                              <a href={data?.pdf_data[index]} className="download-pdf" target="_blank" rel="noreferrer" download>
                                <FaFilePdf />
                              </a>
                            </div>
                          )
                        })
                      }
                    </Slider>
    
                }
                <h2>Videos ({data?.video_data?.length})</h2>
                
                
                {
                  (data?.video_data?.length < 1) ? <p className="no-data">No Video available</p> :
                    <Slider {...settings}>
                      {
                        data?.video_data?.map((event, index) => {
    
                          return (
                            <div key={index} className="video-slide">
                              <div className="video">
                                {
                                  <video
                                    width="100%"
                                    height="100%"
                                    src={data?.video_data[index]}
                                    controls
                                  />
                                }
                              </div>
                            </div>
                          )
                        })
                      }
                    </Slider>
                }


               {
                  (descipleUser) &&
                  <div className="start-test">
                    <Link to={`/PmTest/${params.id}`} className="primary-btn">
                      {dynamic_data?.test}
                    </Link>
                  </div>
                }
              </div>
                :
                <p>no data</p>
            }
          </div>
        </div>
      ) : (
        <Loader/>
      )}
    </div>
  );
}
