import react from "react";
import Navbar from "../navbar/Navbar";
import Event from "../event/Event";
import styles from './Organiser.module.css';

function Organizer(){
    return (
        <>
            <Navbar prop="Profile"/>
            <div className={styles.eventRows}>
                    <Event name="Hackathon" date="25-03-2024" time="16:00:00" desc="Prepare a Data model" button1="Volunteers" button2="Organise"/>
                    <Event name="Hackathon" date="25-03-2024" time="16:00:00" desc="Prepare a Data model" button1="Volunteers" button2="Announce"/>
                    <Event name="Hackathon" date="25-03-2024" time="16:00:00" desc="Prepare a Data model" button1="Volunteers" button2="Organise"/>
                    <Event name="Hackathon" date="25-03-2024" time="16:00:00" desc="Prepare a Data model" button1="Volunteers" button2="Organise"/>
                    <Event name="Hackathon" date="25-03-2024" time="16:00:00" desc="Prepare a Data model" button1="Volunteers" button2="Announce"/>
                    <Event name="Hackathon" date="25-03-2024" time="16:00:00" desc="Prepare a Data model" button1="Volunteers" button2="Organise"/>
                    <Event name="Hackathon" date="25-03-2024" time="16:00:00" desc="Prepare a Data model" button1="Volunteers" button2="Organise"/>
            </div>
        </>
    );
}

export default Organizer;