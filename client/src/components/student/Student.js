import react from "react";
import Navbar from "../navbar/Navbar";
import Event from "../event/Event";
import styles from "./Student.module.css";

function Student(){
    return (
        <>
            <Navbar prop="Profile"/>
            <div className={styles.eventRows}>
                <Event name="Hackathon" date="25-03-2024" time="16:00:00" desc="" button1="Register" button2="Volunteer"/>
                <Event name="Hackathon" date="25-03-2024" time="16:00:00" desc="" button1="Register" button2="Volunteer"/>
                <Event name="Hackathon" date="25-03-2024" time="16:00:00" desc="" button1="Register" button2="Volunteer"/>
                <Event name="Hackathon" date="25-03-2024" time="16:00:00" desc="" button1="Register" button2="Volunteer"/>
                <Event name="Hackathon" date="25-03-2024" time="16:00:00" desc="" button1="Register" button2="Volunteer"/>
                <Event name="Hackathon" date="25-03-2024" time="16:00:00" desc="" button1="Register" button2="Volunteer"/>
                <Event name="Hackathon" date="25-03-2024" time="16:00:00" desc="" button1="Register" button2="Volunteer"/>
            </div>
        </>
    );
}

export default Student;