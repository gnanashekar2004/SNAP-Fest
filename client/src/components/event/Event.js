import React, { useEffect, useState } from "react";
import styles from "./Event.module.css";
import { de_registerAsVolunteer, de_registerForEvent, deleteEvent, deorganizeEvent, getEventParticipants, getEventVolunteers, getEventWinners, organizeEvent, registerAsVolunteer, registerForEvent } from "../../api_helpers/api_helpers";
import { Navigate, useNavigate } from "react-router-dom";
import Event_winners from "../admin/Event_winners";

function Event ({id, name,date,location, desc, button1, button2, button3}) {

    const numButtons = [button1, button2, button3].filter(Boolean).length;
    const buttonGroupWidth = `${10 * numButtons}%`;    
    let navigate = useNavigate();
    const On_button2_click = (event_name)=>{
        let user_type = localStorage.getItem('user_type');
        if (user_type == 1){
            let out = `EVENT: ${event_name}\nWINNERS:\n `;
            getEventWinners(id).then((data)=>{
                if (data.length == 0){
                    alert("No winners yet");
                }
                else {
                    let i=0;
                    for (i=0; i<data.length; i++){
                        out = out + `Name: ${data[i].name}\n Position: ${data[i].position}\n\n`
                    }
                    alert(out);
                }
            })
            .catch((err)=>console.log(err));
        }
        else if (user_type == 2){
            let out = `EVENT: ${event_name}\nWINNERS:\n `;
            getEventWinners(id).then((data)=>{
                if (data.length == 0){
                    alert("No winners yet");
                }
                else {
                    let i=0;
                    for (i=0; i<data.length; i++){
                        out = out + `Name: ${data[i].name}\n Position: ${data[i].position}\n\n`
                    }
                    alert(out);
                }
            })
            .catch((err)=>console.log(err));

        }
        else if (user_type == 3){
            // organizer view volunteers
            let out = `EVENT: ${event_name}\nVOLUNTEERS:\n `;
            getEventVolunteers(id).then((data)=>{
                if (data.length == 0){
                    alert("No volunteers yet");
                }
                else {
                    let i=0;
                    for (i=0; i<data.length; i++){
                        out = out + `Name: ${data[i].name}\n Email: ${data[i].email}\n\n`
                    }
                    alert(out);
                }
            })
            .catch((err)=>console.log(err));
        }
        else if (user_type == 4){
            // admin
            let out = `EVENT: ${event_name}\nPARTICIPANTS:\n `;
            getEventParticipants(id).then((data)=>{
                if (data.length == 0){
                    alert("No participants yet");
                }
                else {
                    let i=0;
                    for (i=0; i<data.length; i++){
                        out = out + `id: ${data[i].id}\nName: ${data[i].name}\n`
                    }
                    alert(out);
                }
            })
            .catch((err)=>console.log(err));
        }
        else {
             
        }
    };

    const On_button1_click = ()=>{
        let user_type = localStorage.getItem('user_type');
        if (user_type == 1){
            let pid = Number( localStorage.getItem('ext_part_id'));
            registerForEvent({pid:pid, eventid:id}).then((data)=>{
                alert(`Registered for ${name} Successfully`);
            })
            .catch((err)=>console.log(err));
        }
        else if (user_type == 2){
            // students
            let pid =Number (localStorage.getItem('student_id'));
            if (button1 == "register"){
                registerForEvent({pid:pid, eventid:id}).then((data)=>{
                    alert(`Registered for ${name} Successfully`);
                })
                .catch((err)=>console.log(err));
            }
            else {
                // deregister
                de_registerForEvent({pid:pid, eventid:id}).then((data)=>{
                    alert(`De-Registered for ${name} Successfully`);
                })
                .catch((err)=>console.log(err));
            }
            
        }
        else if (user_type == 3){
            // organizer
            let pid =Number (localStorage.getItem('org_id'));
            if (button1 == "organize"){
                // organize
                organizeEvent({orgid:pid, eventid:id}).then((data)=>{
                    alert(`Organizing the event ${name}`);
                })
                .catch((err)=>console.log(err));
            }
            else {
                // remove as organizer
                deorganizeEvent({orgid:pid, eventid:id}).then((data)=>{
                    alert(`removed as organizer from event ${name}`);
                })
                .catch((err)=>console.log(err));
            }
        }
        else if (user_type == 4){
            // admin
            
        }
        else {

        }
    };
    const On_button3_click = ()=>{
        let user_type = localStorage.getItem('user_type');
        if (user_type == 1){
            let pid = Number( localStorage.getItem('ext_part_id'));
            de_registerForEvent({pid:pid, eventid:id}).then((data)=>{
                alert(`De-Registered for ${name} Successfully`);
            })
            .catch((err)=>console.log(err));
        }
        else if (user_type == 2){
            // students
            let pid = Number (localStorage.getItem('student_id'));
            if ( button3 == "volunteer"){
                // register as volunteer
                registerAsVolunteer({studentid:pid, eventid:id}).then((data)=>{
                    alert(`Registered as Volunteer for ${name}`);
                })
                .catch((err)=>console.log(err));
            }
            else {
                // de-register as volunteers
                de_registerAsVolunteer({studentid:pid, eventid:id}).then((data)=>{
                    alert(`De-registered as Volunteer for ${name}`);
                })
                .catch((err)=>console.log(err));
            }
        }
        else if (user_type == 3){
            // organizer
            let org_id = Number (localStorage.getItem('org_id'));
            // anounce winners
            localStorage.setItem("eventid", id);
            navigate("/orgs/event_winners");
        }
        else if (user_type == 4){
            // admin
            deleteEvent({id:id}).then((data)=>{
                alert(`Deleted event ${name} Successfully`);
            })
            .catch((err)=>console.log(err));
        }
        else {

        }
    };
    
    return (
        <>
            <div className="card w-100 mb-3">
            <div className="card-body d-flex flex-column">
                <div className="d-flex justify-content-between">
                <h5 className="card-title">{name}</h5>
                <div className={styles.buttonGroup} style={{ width: buttonGroupWidth }}>
                    {button1 && <button className="btn btn-success" onClick={()=>On_button1_click()} style={{fontSize:"20px"}}>{button1}</button>}
                    {button2 && <button className="btn btn-primary" onClick={()=>On_button2_click(name)} style={{fontSize:"20px"}}>{button2}</button>}
                    {button3 && <button className="btn btn-danger" onClick={()=>On_button3_click()} style={{fontSize:"20px"}}>{button3}</button>}
                </div>
                </div>
                <p className="card-text" style={{color: "grey"}}>{date} </p>
                <h6>Location</h6>
                <p className="card-text" style={{color: "grey"}}>{location} </p>
                {desc && <> <h6>Description & logistics</h6> <p className="card-text" style={{color: "grey"}}>{desc}</p></>}
            </div>
            </div>
        </>
    );
}

export default Event;