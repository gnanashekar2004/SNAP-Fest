import React from "react";
import styles from "./Event.module.css";

function Event ({id, name,date,location, desc, button1, button2, button3}) {

    const numButtons = [button1, button2, button3].filter(Boolean).length;
    const buttonGroupWidth = `${10 * numButtons}%`;    

    return (
        <>
            <div className="card w-100 mb-3">
            <div className="card-body d-flex flex-column">
                <div className="d-flex justify-content-between">
                <h5 className="card-title">{name}</h5>
                <div className={styles.buttonGroup} style={{ width: buttonGroupWidth }}>
                    {button2 && <button className="btn btn-primary" style={{fontSize:"20px"}}>{button2}</button>}
                    {button1 && <button className="btn btn-success" style={{fontSize:"20px"}}>{button1}</button>}
                    {button3 && <button className="btn btn-danger" style={{fontSize:"20px"}}>{button3}</button>}
                </div>
                </div>
                <p className="card-text" style={{color: "grey"}}>{date} </p>
                <p className="card-text" style={{color: "grey"}}>{location} </p>
                {desc && <p className="card-text" style={{color: "grey"}}>{desc}</p>}
            </div>
            </div>
        </>
    );
}

export default Event;