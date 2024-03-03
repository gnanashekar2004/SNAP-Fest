import react, { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import Event from "../event/Event";
import styles from './Organiser.module.css';
import { getAllEVents, getEventsOrganized } from "../../api_helpers/api_helpers";
import { Box, Typography } from "@mui/material";

function Organizer(){
    const [events, setevents] = useState([]);
    useEffect(()=>{
        getAllEVents().then((data)=>setevents(data))
        .catch((err)=>console.log(err));
    }, []);
    console.log(events);
    let id = localStorage.getItem('org_id');
    const [org_events, set_org_events] = useState([]);
    useEffect(()=>{
        getEventsOrganized(id).then((data)=>set_org_events(data))
        .catch((err)=>console.log(err));
    }, [org_events]);
    console.log(org_events);

    
    return (
        <>
        <Navbar prop="Profile"/>
        <Box margin={"auto"} marginTop={0}>
            <Typography variant={"h4"} width={"100%"} bgcolor="lightgreen" textAlign={"center"} padding={2}>All Events</Typography>
            <Box width={"80%"} margin="auto" display={"flex"} justifyContent="center" flexWrap={"wrap"}>
                {events && events.map((event, index)=><Event id={event.id} name={event.name} date={event.dateofevent} location={event.location} desc={event.description} button1="organize" button2="view volunteers" button3="" />)}
            </Box> 
        </Box>
        <Box margin={"auto"} marginTop={0}>
            <Typography variant={"h4"} width={"100%"} bgcolor="lightgreen" textAlign={"center"} padding={2}>Events organized</Typography>
            <Box width={"80%"} margin="auto" display={"flex"} justifyContent="center" flexWrap={"wrap"}>
                {org_events && org_events.map((event, index)=><Event id={event.id} name={event.name} date={event.dateofevent} location={event.location} desc={event.description} button1="remove as organizer" button2="" button3="Anounce winners" />)}
            </Box> 
        </Box>
        </>
    );
}

export default Organizer;