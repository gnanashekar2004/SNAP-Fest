import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import { getStudentById } from '../../api_helpers/api_helpers';
import Navbar from '../navbar/Navbar';

const StudentProfilePage = () => {
  const [userData, setUserData] = useState(null);

  let pass = "****";
  let loggedInUserData = {
    id: 1,
    name: 'Student User',
    roll: 'roll',
    hall: 'hall',
    email: 'student@example.com',
    password: '********',
  };
  let user_id = Number(localStorage.getItem('student_id'));
  useEffect(() => {
    getStudentById(user_id).then((loggedInUserData)=>{
        setUserData(loggedInUserData);
    }).catch((err)=>console.log(err));
  }, [pass, loggedInUserData]);

  const handleShow = ()=>{
    pass = userData.password;
    alert(`password: ${pass}`);
  };
  
  return (
    <>
    <Navbar prop="" />
    <Paper
      style={{
        padding: '16px',
        margin: 'auto',
        maxWidth: '600px',
        backgroundColor: '#f0f0f0',
      }}
      elevation={3}
    >
      <Grid container direction="column" alignItems="center" spacing={2}>
        <Grid item>
          <Avatar
            style={{
              width: '96px',
              height: '96px',
              backgroundColor: '#ff4081',
              marginBottom: '16px',
            }}
          >
            SU
          </Avatar>
        </Grid>
        <Grid item>
          <Typography variant="h4" align="center" color="primary">
            {userData?.name}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body1" align="center">
            ID: {userData?.id}
          </Typography>
          <Typography variant="body1" align="center">
            Roll: {userData?.roll}
          </Typography>
          <Typography variant="body1" align="center">
            Hall: {userData?.hall}
          </Typography>
          <Typography variant="body1" align="center">
            Email: {userData?.email}
          </Typography>
          <Typography variant="body1" align="center">
            Password: {pass} <br/> <button onClick={()=>handleShow()} >Show</button>
          </Typography>
        </Grid>
      </Grid>
    </Paper>
    </>
  );
};

export default StudentProfilePage;
