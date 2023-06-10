import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { FaChevronLeft, FaFilePdf } from "react-icons/fa";
import { Link, useHistory, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

import Header from "./Header";
import { HiOutlineChevronRight } from "react-icons/hi";
import Loader from "./Loader";
import Slider from "react-slick";
import axios from 'axios'

export default function ScriptureStudyMaterial(props) {
  const history = useHistory();
  const [keyStudyData, setKeyStudyData] = useState(null);
  let params = useParams();

  // console.log('Params ====>', params, '====>', params.id);
  let isAuthorise = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    if (!isAuthorise) {
      history.push("/login"); 
    }
    getData();
  }, []);

  useEffect(() => {
    // console.log("Study material data is ", keyStudyData);
  }, [keyStudyData]);

  const getData = () => {
    if (isAuthorise !== null) {
      var token = isAuthorise.token
      console.log(token);
      var config = {
        headers: {
          "Content-Type": "Application/json ",
          "Authorization": `Token ${token}`
        },
      }
      var body = JSON.stringify({ id:params.id });
    }
    
    axios.post("api/key-level/get/",body , config).then((result)=>{
      setKeyStudyData(result.data);
    })
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
  };
  const data = keyStudyData?.file_path;
  return (
    <div className="pm-study-material-page padding-top">
      <Header
        heading="Scripture key study Material"
        back={<FaChevronLeft />}
        path="/scriptureKey"
      />
      {keyStudyData ? (
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
                <p>{keyStudyData.description}</p>
              </div>

            </div>
            {
              (data)&& data?.pdf_data && data?.video_data ?
              <div className="video-slider pdf-slider">
                <h2>Pdf ({
                  (data)&& data?.pdf_data ?
                  data?.pdf_data.length : `0`
                
                })</h2>
                
                {
                  (data?.pdf_data.length < 1) ? <p className="no-data">No Pdf available  </p> :
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
                <h2>Videos ({data?.video_data.length})</h2>
                {
                  (data?.video_data.length < 1) ? <p className="no-data">No Video available</p> :
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
                <div className="start-test">
                  <Link to="/legacyGroup" className="primary-btn">
                  POST SUMMARY TO LEGACY GROUP
                  </Link>
                </div>
              </div>
                :
                <p>no data</p>
            }
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}
