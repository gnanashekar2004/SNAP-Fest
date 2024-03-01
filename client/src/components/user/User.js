import React from 'react';
import styles from './User.module.css';

function User({id,name,button}){
    return (
        <>
            <div className="card w-100 mb-3">
            <div className="card-body d-flex flex-column">
                <div className="d-flex justify-content-between">
                <h5 className="card-title">{id} - {name}</h5>
                <div className={styles.buttonGroup} style={{ width: "10%" }}>
                    {button && <button className="btn btn-danger" style={{fontSize:"20px"}}>{button}</button>}
                </div>
                </div>
            </div>
            </div>
        </>
    );
}

export default User;