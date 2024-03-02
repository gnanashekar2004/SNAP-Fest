import React from "react";
import styles from "./AdminCard.module.css";

function AdminCard({name, color}) {
    return (
        <>
            <div className={styles.card} >
                <div className={styles.cardOverlay} style={{backgroundColor: color}}></div>
                <div className={styles.cardContent}>
                    {name}
                </div>
            </div>
        </>
    );
}

export default AdminCard;