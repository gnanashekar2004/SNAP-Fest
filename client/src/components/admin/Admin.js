import react from "react";
import { Routes, Route, Link } from "react-router-dom";

import Navbar from "../navbar/Navbar";
import AdminCard from "./AdminCard";
import styles from "./Admin.module.css";
import StudentPage from "./StudentPage";
import ParticipantPage from "./ParticipantPage";
import OrganiserPage from "./OrganiserPage";
import EventPage from "./EventPage";

function Admin(){
    return (
        <>
            <Navbar prop="Profile" />
            <div className={styles.gridbox}>
                <div className={styles.row}>
                <Link to="/admins/participants" style={{ textDecoration: 'none' }}>
                    <AdminCard name="Participants" color="rgb(255, 0, 0 , 0.5)" />
                </Link>
                <Link to="/admins/students" style={{ textDecoration: 'none' }}>
                    <AdminCard name="Students" color="rgb(0, 0, 255,0.5)" />
                </Link>
                </div>
                <div className={styles.row}>
                <Link to="/admins/orgs" style={{ textDecoration: 'none' }}>
                    <AdminCard name="Organisers" color="rgb(0, 255, 0, 0.5)" />
                </Link>
                <Link to="/admins/events" style={{ textDecoration: 'none' }}>
                    <AdminCard name="Events" color="rgb(172, 172, 134, 0.5)" />
                </Link>
                </div>
            </div>
        </>
    );
}

export default Admin;