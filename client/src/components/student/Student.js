import react, { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import Event from "../event/Event";
import styles from "./Student.module.css";
import { getAllEVents, getEventsParticipated, getEventsVolunteered } from "../../api_helpers/api_helpers";
import { Box, Typography } from "@mui/material";

function Student(){
    const [events, setevents] = useState([]);
    useEffect(()=>{
        getAllEVents().then((data)=>setevents(data))
        .catch((err)=>console.log(err));
    }, []);
    console.log(events);

    let id = localStorage.getItem('student_id');
    const [student_events, set_student_events] = useState([]);
    useEffect(()=>{
        getEventsParticipated(id).then((data)=>set_student_events(data))
        .catch((err)=>console.log(err));
    }, [student_events]);
    console.log(student_events);

    const [volunteer_events, set_volunteer_events] = useState([]);
    useEffect(()=>{
        getEventsVolunteered(id).then((data)=>set_volunteer_events(data))
        .catch((err)=>console.log(err));
    }, [volunteer_events]);
    console.log(volunteer_events);
    
    return (
        <>
        <Navbar prop="Profile"/>
        <Box margin={"auto"} marginTop={0}>
            <Typography variant={"h4"} width={"100%"} bgcolor="lightgreen" textAlign={"center"} padding={2}>All Events</Typography>
            <Box width={"80%"} margin="auto" display={"flex"} justifyContent="center" flexWrap={"wrap"}>
                {events && events.map((event, index)=><Event id={event.id} name={event.name} date={event.dateofevent} location={event.location} desc={event.description} button1="register" button2="winners" button3="volunteer"/>)}
            </Box> 
        </Box>
        <Box margin={"auto"} marginTop={0}>
            { (student_events.length!=0) && <Typography variant={"h4"} width={"100%"} bgcolor="lightblue" textAlign={"center"} padding={2}>Events Participated</Typography>}
            <Box width={"80%"} margin="auto" display={"flex"} justifyContent="center" flexWrap={"wrap"}>
                {student_events && student_events.map((event, index)=><Event id={event.id} name={event.name} date={event.dateofevent} location={event.location} desc={event.description} button1="deregister" button2="" button3="" />)}
            </Box> 
        </Box>
        <Box margin={"auto"} marginTop={0}>
            <Typography variant={"h4"} width={"100%"} bgcolor="lightgreen" textAlign={"center"} padding={2}>Events Volunteered</Typography>
            <Box width={"80%"} margin="auto" display={"flex"} justifyContent="center" flexWrap={"wrap"}>
                {volunteer_events && volunteer_events.map((event, index)=><Event id={event.id} name={event.name} date={event.dateofevent} location={event.location} desc={event.description} button1="" button2="" button3="deregister as volunteer" />)}
            </Box> 
        </Box>
        </>
    );
}

export default Student;