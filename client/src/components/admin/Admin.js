import react from "react";
import Navbar from "../navbar/Navbar";
import AdminCard from "./AdminCard";
import styles from "./Admin.module.css";

function Admin(){
    return (
        <>
            <Navbar prop="Profile"/>
            <div className={styles.gridbox}>
                <div className={styles.row}>
                    <AdminCard name="Participants" color="red"/>
                    <AdminCard name="Students" color="blue"/>
                </div>
                <div className={styles.row}>
                    <AdminCard name="Organisers" color="green"/>
                    <AdminCard name="Events" color="grey"/>
                </div>
            </div>
            
            
            
        </>
    );
}

export default Admin;