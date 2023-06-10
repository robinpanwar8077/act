import React, { useEffect, useState } from 'react'

import Loader from './Loader';
import ProgressBar from 'react-bootstrap/ProgressBar'
import axios from 'axios';

export default function ScriptureLevelBar() {
    const [keyLevel, setKeyLevel] = useState(null)
    const [pmLevel, setPmLevel] = useState(null)

    const [currentKeyLevel, setCurrentKeyLevel] = useState(0)
    const [currentPmLevel, setCurrentPmLevel] = useState(0)

    const isAuthorise = JSON.parse(localStorage.getItem("user"));

    

    useEffect(() => {
        getData()
    }, []);
    useEffect(() => {
        // console.log(currentLevel, keyLevel, "currentLevel,keyLevel");
    }, [currentKeyLevel, currentPmLevel, keyLevel]);

    const getData = async () => {
        if(isAuthorise) {
            var token = isAuthorise.token
          }
          else{   
              var token = ""
          }
        const config = {
            headers: {
                "Content-Type": "Application/json ",
                "Authorization": `Token ${token}`
            },
        }

        if (isAuthorise){

            await axios.get(`api/userone/${isAuthorise.id}/`, config).then((res) => {
                setCurrentKeyLevel(res.data.data.user.key_level)
                setCurrentPmLevel(res.data.data.user.pm_level)
                // console.log(currentPmLevel, "level");
            })
            await axios.post("api/listingKeyLevel/", {}, config).then((result) => {
                setKeyLevel(result.data);
                // console.log(keyLevel, "ffff");
            });
            await axios.post("api/listingPMlevel/", {}, config).then((result) => {
                setPmLevel(result.data);
                // console.log(pmLevel, "ffff");
            });
        }

        

    }
    const totalKeyLevel = ((keyLevel)?.length) + 1;
    const eachKeyLevel = Math.floor(100 / totalKeyLevel)
    const KeyPercent = eachKeyLevel * currentKeyLevel

    const totalPmLevel = ((pmLevel)?.length) + 1;
    const eachPmLevel = Math.floor(100 / totalPmLevel)
    const pmPercent = eachPmLevel * currentPmLevel
    // console.log(pmLevel, "%");

    return (

        <div className="scripture-level-progress-bar">
            <h2>Scripture Level</h2>
            {
                <ProgressBar now={KeyPercent} />
            }
            <div className="level">
                {
                    keyLevel?.map((item, index) => {
                        return (
                            <span key={index}>{index + 1}</span>
                        )
                    })
                }
            </div>
            <br />
            {
                pmLevel && 
                <div>
                    <h2>Pm Level</h2>
                    {
                        <ProgressBar now={pmPercent} />
                    }
                    <div className="level">
                        {
                            pmLevel?.map((item, index) => {
                                return (
                                    <span key={index}>{index + 1}</span>
                                )
                            })
                        }
                    </div>
                </div>
            }
        </div>

    )
}
