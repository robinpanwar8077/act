import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { FaChevronLeft, FaFilePdf } from "react-icons/fa";
import { Link, useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";

import Header from "./Header";
import { HiOutlineChevronRight } from "react-icons/hi";
import Loader from "./Loader";
import Slider from "react-slick";
import axios from 'axios'
import parse from "html-react-parser"
export default function HomeScriptureStudyMaterial(props) {
  const history = useHistory();
  const [studyMaterial, setStudyMaterial] = useState(null);
  const [currentLevel, setCurrentLevel] = useState(null)
  const isAuthorise = JSON.parse(localStorage.getItem("user"));
  const [keyLevel, setKeyLevel] = useState(null)
  const token = isAuthorise.token
  const config = {
    headers: {
      "Content-Type": "Application/json ",
      "Authorization": `Token ${token}`
    },
  };


  useEffect(() => {
    if (!isAuthorise) {
      history.push("/login");
    }else {
      getData();
      getLevel();
    }
  }, []);

  useEffect(()=> {
    if(currentLevel && keyLevel){
      let studyMaterialId = keyLevel[currentLevel-1].id;
      getKeyData(studyMaterialId);
    }
  },[currentLevel, keyLevel])

  const getLevel = async ()=>{
    await axios.post("api/listingKeyLevel/", {}, config).then((result) => {
      setKeyLevel(result.data)
      console.log("get level Key level",result.data)
      // const index = currentLevel - 1
      // const currentLevelData = keyLevel[index]?.id
      // console.log(index,"index");
    });
  }
  
  const getData = async () => {
    await axios.get(`api/userone/${isAuthorise.id}/`, config).then((res) => {
      setCurrentLevel(res.data.data.user.key_level)
      console.log("get Data currentLevel  ==>",currentLevel);
    })
  };
  // const index = currentLevel - 1
  // const currentLevelData = keyLevel[index]?.id
  // console.log(currentLevelData,"index");
  const getKeyData = async (id) => {
    const url = `api/key-level/get/`
    const body = JSON.stringify({ "id": id });
    console.log("get study material", id)
    await axios.post(url, body, config).then((result) => {
      setStudyMaterial(result.data)
      console.log("get Key data, key study", result.data)
    })
  }
 

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
  };
  const data = studyMaterial?.file_path;

  return (
    <div className="pm-study-material-page">
     
      {studyMaterial ? (
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
                <p>{parse(studyMaterial.description)}</p>
              </div>

            </div>
            {
              (data) && data?.pdf_data && data?.video_data ?
                <div className="video-slider pdf-slider">
                  <h2>Pdf  ({data?.pdf_data.length})</h2>
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
                    (data?.video_data.length < 1) ? <p className="no-data">No Pdf Video </p> :
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
                      RESPONSE TO LEGACY GROUP
                    </Link>
                  </div>
                </div>
                :
                <div className="video-slider pdf-slider">
                  <h2>Pdf  (0)</h2>
                  <p className="no-data">No Pdf available  </p>
                  <h2>Videos  (0)</h2>
                  <p className="no-data">No Pdf available  </p>
                </div>
            }
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}
