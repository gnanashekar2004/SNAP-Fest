import React from "react";
import styles from "./AdminCard.module.css";

function AdminCard({name, color}) {
    return (
        <>
            <div className={styles.card} style={{backgroundColor: color}}>
                {name}
            </div>
        </>
    );
}

export default AdminCard;