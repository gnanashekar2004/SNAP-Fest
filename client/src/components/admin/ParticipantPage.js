import React, { useEffect, useState } from 'react';
import Navbar from "../navbar/Navbar";
import User from "../user/User";
import { getAllExt_parts } from '../../api_helpers/api_helpers';
import { useNavigate } from 'react-router-dom';

const customStyle = {
    paddingLeft:"10%",
    paddingRight: "10%",
    paddingTop: "100px",
    paddingBottom: "50px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around"
}

const buttonStyle= {
    marginLeft: "20%",
    width: "60%",
    fontSize: "25px"
}

function ParticipantPage (){

    const [ext_parts, setext_parts] = useState([]);
    useEffect(()=>{
        getAllExt_parts().then((data)=>setext_parts(data))
        .catch((err)=>console.log(err));
    }, [ext_parts]);
    console.log(ext_parts);

    let navigate = useNavigate();

    return (
        <>
            <Navbar prop="Profile"/>
            <div style={customStyle}>
                { ext_parts && ext_parts.map((ext_part, index)=>
                    <User id={ext_part.id} roll="" hall="" name={ext_part.name} type={1} email={ext_part.email} button1={"delete"}/>
                )}
            </div>
            <button className="btn btn-success" onClick={()=>navigate("/add/participants")}  style={buttonStyle}>Add a new Participant</button>
        </>
    );
}

export default ParticipantPage;