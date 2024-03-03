import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import { getAccom, getExtPartById } from '../../api_helpers/api_helpers';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Navbar from '../navbar/Navbar';

const ExtProfilePage = () => {
  const [userData, setUserData] = useState(null);

  let pass = "****";
  
  let loggedInUserData = {
    id: 1,
    name: 'extternal participant',
    email: 'external@example.com',
    password: '********',
  };
  let user_id = Number(localStorage.getItem('ext_part_id'));
  let loggedInAccomodation = {
    id: user_id,
    hall: "hall",
    food: "food"
  }
  const [Accomodation, setAccomodation] = useState({
    id: user_id,
    hall:'',
    food:''
  });


  useEffect(()=>{
    getExtPartById(user_id).then((loggedInUserData)=>{
        setUserData(loggedInUserData);
    }).catch((err)=>console.log(err));
  }, [pass]);

  useEffect(() => {
    getAccom(user_id).then((loggedInAccomodation)=>{
        setAccomodation(loggedInAccomodation);
    }).catch((err)=>console.log(err));
    console.log(user_id);
  }, [Accomodation]);
  
  const handleShow = ()=>{
    pass = userData.password;
    alert(`password: ${pass}`);
  };
  let navigate = useNavigate();
  const handleChangeAccomodation = ()=>{
    navigate("/ext_part/profile/accomodation");
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
            EP
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
            Email: {userData?.email}
          </Typography>
          <Typography variant="body1" align="center">
            Password: {pass} <br/> <button onClick={()=>handleShow()} >Show</button>
          </Typography>
        </Grid>

        <Grid item alignContent={"center"}>
          <Typography variant="body1" align="center">
            Your Accomodation
          </Typography>
          <Typography variant="body1" align="center">
            Stay: {Accomodation.hall}
          </Typography>
          <Typography variant="body1" align="center">
            Food: {Accomodation.food}
          </Typography>
        </Grid>
        <Button onClick={()=>handleChangeAccomodation()} >Change Accomodation</Button>
      </Grid>
    </Paper>
    </>
  );
};

export default ExtProfilePage;
