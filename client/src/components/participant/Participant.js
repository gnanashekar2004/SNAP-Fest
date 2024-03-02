import react, { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import { Box, Typography } from "@mui/material";
import Event from "../event/Event";
import styles from "./Participant.module.css";
import { getAllEVents, getEventsParticipated } from "../../api_helpers/api_helpers";

function Participant(){
    const [events, setevents] = useState([]);
    useEffect(()=>{
        getAllEVents().then((data)=>setevents(data))
        .catch((err)=>console.log(err));
    }, []);
    console.log(events);

    let id = localStorage.getItem('ext_part_id');
    const [ext_part_events, set_ext_part_events] = useState([]);
    useEffect(()=>{
        getEventsParticipated(id).then((data)=>set_ext_part_events(data))
        .catch((err)=>console.log(err));
    }, [ext_part_events]);
    console.log(ext_part_events);
    
    return (
        <>
        <Navbar prop="Profile"/>
        <Box margin={"auto"} marginTop={0}>
            <Typography variant={"h4"} width={"100%"} bgcolor="lightgreen" textAlign={"center"} padding={2}>All Events</Typography>
            <Box width={"80%"} margin="auto" display={"flex"} justifyContent="center" flexWrap={"wrap"}>
                {events && events.map((event, index)=><Event id={event.id} name={event.name} date={event.dateofevent} location={event.location} desc={event.description} button1="register" button2="winners" button3="" />)}
            </Box> 
        </Box>
        <Box margin={"auto"} marginTop={0}>
            { (ext_part_events.length!=0) && <Typography variant={"h4"} width={"100%"} bgcolor="lightblue" textAlign={"center"} padding={2}>Events Participated</Typography>}
            <Box width={"80%"} margin="auto" display={"flex"} justifyContent="center" flexWrap={"wrap"}>
                {ext_part_events && ext_part_events.map((event, index)=><Event id={event.id} name={event.name} date={event.dateofevent} location={event.location} desc={event.description} button1="" button2="" button3="De-register" />)}
            </Box> 
        </Box>
        </>
    );

}

export default Participant;