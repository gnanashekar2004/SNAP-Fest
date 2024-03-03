import React from 'react';
import styles from './User.module.css';
import { approveOrg, declareWinners, deleteExt_part, deleteOrganizer, deleteStudent } from '../../api_helpers/api_helpers';

function User({id,name, hall, roll, type, email, button1, button2, button3}){
    
    const handleDelete = (id, b)=>{
        if (type == 1){
            // ext_part
            deleteExt_part({id:id}).then((data)=>{
                alert(`Deleted Student ${name}`);
            })
            .catch((err)=>console.log(err));
        }
        else if (type == 2){
            // student
            deleteStudent({id:id}).then((data)=>{
                alert(`Deleted Student ${name}`);
            })
            .catch((err)=>console.log(err));
        }
        else if (type == 3){
            // organizer
            deleteOrganizer({id:id}).then((data)=>{
                alert(`Deleted Organizer ${name}`);
            })
            .catch((err)=>console.log(err));
        }
        else if (type == 4){
            // set winners winners
            let org_id = Number(localStorage.getItem('org_id'));
            let eventid = Number(localStorage.getItem('eventid'));
            declareWinners({pid:id, eventid:eventid, position:b, orgid: org_id}).then((data)=>{
                alert(`${name} got position ${b}`);
            })
            .catch((err)=>console.log(err));
        }
        else if (type == 5){
            let input = {
                id: id
            }
            approveOrg(input).then((data)=>{
                alert(`${id} organizer got approved`);
            })
            .catch((err)=>console.log(err));
        }
        else {
            //

        }
    };
    return (
        <>
            <div className="card w-100 mb-3">
            <div className="card-body d-flex flex-column">
                <div className="d-flex justify-content-between">
                <h5 className="card-title">{id} - {name}</h5>
                {(type != 4) && <h6 className="card-title">{email}</h6>}
                { (type==2) && <><h6 className="card-title">Roll: {roll}</h6><h6 className="card-title">hall: {hall}</h6></> }
                <div className={styles.buttonGroup} style={{ width: "10%", flexDirection:"row" }}>
                    {button1 && <button className="btn btn-success" onClick={()=>handleDelete(id, 1)} style={{fontSize:"20px"}}>{button1}</button>}</div>
                    <div className={styles.buttonGroup} style={{ width: "10%", flexDirection:"row" }}>
                    {button2 && <button className="btn btn-primary" onClick={()=>handleDelete(id, 2)} style={{fontSize:"20px"}}>{button2}</button>}</div>
                    <div className={styles.buttonGroup} style={{ width: "10%", flexDirection:"row" }}>
                    {button3 && <button className="btn btn-danger" onClick={()=>handleDelete(id, 3)} style={{fontSize:"20px"}}>{button3}</button>}
                </div>
                </div>
            </div>
            </div>
        </>
    );
}

export default User;