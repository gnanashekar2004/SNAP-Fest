import react, { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import Event from "../event/Event";
import { getAllEVents } from "../../api_helpers/api_helpers";
import { Box, Typography } from "@mui/material";

function EventPage (){
    const [events, setevents] = useState([]);
    useEffect(()=>{
        getAllEVents().then((data)=>setevents(data))
        .catch((err)=>console.log(err));
    }, []);
    console.log(events);

    return (
        <>
        <Navbar prop="Profile"/>
        <Box margin={"auto"} marginTop={0}>
            <Typography variant={"h4"} width={"100%"} bgcolor="lightgreen" textAlign={"center"} padding={2}>All Events</Typography>
            <Box width={"80%"} margin="auto" display={"flex"} justifyContent="center" flexWrap={"wrap"}>
                {events && events.map((event, index)=><Event id={event.id} name={event.name} date={event.dateofevent} location={event.location} desc={event.description} button1="" button2="Modify" button3="Delete"/>)}
            </Box> 
        </Box>
        </>
    );
}

export default EventPage;