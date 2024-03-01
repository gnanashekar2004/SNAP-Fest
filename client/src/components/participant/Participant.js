import react from "react";
import Navbar from "../navbar/Navbar";
import Event from "../event/Event";
import styles from "./Participant.module.css";

function Participant(){
    return (
        <>
            <Navbar prop="Accommodation"/>
            <div className={styles.eventRows}>
                <Event name="Hackathon" date="25-03-2024" time="16:00:00" button1="Register" button2=""/>
                <Event name="Hackathon" date="25-03-2024" time="16:00:00" button1="Register" button2=""/>
                <Event name="Hackathon" date="25-03-2024" time="16:00:00" button1="Register" button2=""/>
                <Event name="Hackathon" date="25-03-2024" time="16:00:00" button1="Register" button2=""/>
                <Event name="Hackathon" date="25-03-2024" time="16:00:00" button1="Register" button2=""/>
                <Event name="Hackathon" date="25-03-2024" time="16:00:00" button1="Register" button2=""/>
                <Event name="Hackathon" date="25-03-2024" time="16:00:00" button1="Register" button2=""/>
            </div>
        </>
    );
}

export default Participant;