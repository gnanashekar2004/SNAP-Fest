import React, { useEffect, useState } from 'react';
import Navbar from "../navbar/Navbar";
import User from "../user/User";
import { getAllStudents } from '../../api_helpers/api_helpers';
import { useNavigate } from 'react-router-dom';

const customStyle = {
    paddingLeft:"10%",
    paddingRight: "10%",
    paddingTop: "100px",
    paddingBottom: "50px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around"
}

const buttonStyle= {
    marginLeft: "20%",
    width: "60%",
    fontSize: "25px"
}

function StudentPage (){

    const [students, setstudents] = useState([]);
    useEffect(()=>{
        getAllStudents().then((data)=>setstudents(data))
        .catch((err)=>console.log(err));
    }, [students]);
    console.log(students);
    let navigate = useNavigate();
    return (
        <>
            <Navbar prop="Profile"/>
            <div style={customStyle}>
                { students && students.map((student, index)=>
                    <User id={student.id} roll={student.roll} hall={student.hall} name={student.name} type={2} email={student.email} button1={"delete"}/>
                )}
            </div>
            <button className="btn btn-success" onClick={()=>navigate("/add/students")}  style={buttonStyle}>Add a new Student</button>
        </>
    );
}

export default StudentPage;