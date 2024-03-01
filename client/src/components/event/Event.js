import React from "react";
import styles from "./Event.module.css";

function Event ({name,date,time,button1,button2}) {
    return (
        <>
            <div className="card w-100 mb-3">
            <div className="card-body d-flex flex-column">
                <div className="d-flex justify-content-between">
                <h5 className="card-title">{name}</h5>
                <div className={styles.buttonGroup} style={{ width: (button1 && button2) ? '20%' : '10%' }}>
                    {button2 && <button className="btn btn-primary" style={{fontSize:"20px"}}>{button2}</button>}
                    {button1 && <button className="btn btn-success" style={{fontSize:"20px"}}>{button1}</button>}
                </div>
                </div>
                <p className="card-text" style={{color: "grey"}}>{date} {time}</p>
            </div>
            </div>
        </>
    );
}

export default Event;