import React ,{useEffect, useState}from 'react';

import Loader from './Loader';
import ProgressBar from 'react-bootstrap/ProgressBar'
import axios from 'axios';

const Pmlevelbar = () => {
    const [keyLevel, setKeyLevel] = useState(null)
    const [currentLevel, setCurrentLevel] = useState(0)
    const isAuthorise = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        getData()
    }, []);
    useEffect(() => {
        // console.log(currentLevel, keyLevel, "currentLevel,keyLevel");
    }, [currentLevel, keyLevel]);

    const getData = async () => {
        const token = isAuthorise.token
        const config = {
        headers: {
        "Content-Type": "Application/json ",
        "Authorization": `Token ${token}`
        },
    }

    await axios.get(`api/userone/${isAuthorise.id}/`,config).then((res)=>{
        setCurrentLevel(res.data.data.user.key_level)
    })
    await axios.post("api/listingPMlevel/", {}, config).then((result) => {
        setKeyLevel(result.data);
        // console.log(keyLevel, "ffff");
    });
        
    }
    const totalLevel = ((keyLevel)?.length)+1;
    const eachLevel = Math.floor(100/totalLevel)
    // console.log("abc",eachLevel);

    const percent = eachLevel * currentLevel

    return (
        keyLevel ?
        <div className="scripture-level-progress-bar">
            <h2>Scripture Level</h2>
            {
                <ProgressBar now={percent} />
            }
            <div className="level">
                {
                    keyLevel.map((item, index) => {
                        return (
                            <span key={index}>{index+1}</span>
                        )
                    })
                }
            </div>
        </div>
        :
        <Loader />
    );
}

export default Pmlevelbar;
