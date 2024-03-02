import React, { useEffect, useState } from 'react';
import Navbar from "../navbar/Navbar";
import User from "../user/User";
import { getEventParticipants } from '../../api_helpers/api_helpers';

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

function Event_winners (){
    let eventid = Number (localStorage.getItem('eventid'));
    const [event_parts, setevent_parts] = useState([]);
    useEffect(()=>{
        getEventParticipants(eventid).then((data)=>setevent_parts(data))
        .catch((err)=>console.log(err));
    }, []);
    console.log(event_parts);

    return (
        <>
            <Navbar prop="Profile"/>
            <div style={customStyle}>
                { event_parts && event_parts.map((event_part, index)=>
                    <User id={event_part.id} name={event_part.name} type={4} email="" button1={"1"} button2={"2"} button3={"3"}/>
                )}
            </div>
        </>
    );
}

export default Event_winners;