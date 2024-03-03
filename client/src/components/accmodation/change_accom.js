import { Paper } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { getAllHalls, setAccom } from '../../api_helpers/api_helpers';
import { useNavigate } from 'react-router-dom';

const AccommodationPage = () => {
  const [halls, setHalls] = useState([]);
  const [selectedHall, setSelectedHall] = useState('');
  const [selectedFood, setSelectedFood] = useState('');

  // Function to fetch halls and their details
  const fetchHalls = async () => {
    getAllHalls().then((data)=>{
        setHalls(data);
    }).catch((err)=>console.log(err));
  };

  let navigate = useNavigate();
  // Function to handle accommodation setting
  const setAccommodation = async () => {
    let user_id = Number(localStorage.getItem('ext_part_id'));
    let accom = {
        id : user_id,
        hall : selectedHall,
        food : selectedFood
    }
    console.log(accom);
    setAccom(accom).then((data)=>{
        alert(data);
        navigate("/ext_part/profile");
    }).catch((err)=>console.log(err));
  };

  useEffect(() => {
    fetchHalls();
  }, []);

  return (
    <Paper
      style={{
        padding: '16px',
        margin: 'auto',
        maxWidth: '600px',
        backgroundColor: '#f0f0f0',
      }}
      elevation={3}
    >
    <div style={{ padding: '20px', maxWidth: '600px', margin: '20px auto' }}>
      <h2>Select Accommodation</h2>
      <div>
        <label>Select Hall:</label>
        <select value={selectedHall} onChange={(e) => setSelectedHall(e.target.value)}>
          <option value="">--Select Hall--</option>
          {halls.map((hall) => (
            <option key={hall.id} value={hall.id}>{hall.name}</option>
          ))}
        </select>
      </div>
      <div>
        <p>Select Food:</p>
        <button
          onClick={() => setSelectedFood('Veg')}
          style={{ marginRight: '10px', backgroundColor: selectedFood === 'Veg' ? '#2196f3' : '#ffffff' }}
        >
          Veg
        </button>
        <button
          onClick={() => setSelectedFood('Non-Veg')}
          style={{ backgroundColor: selectedFood === 'Non-Veg' ? '#2196f3' : '#ffffff' }}
        >
          Non-Veg
        </button>
      </div>
      <button
        onClick={setAccommodation}
        style={{ marginTop: '10px', backgroundColor: selectedHall && selectedFood ? '#4caf50' : '#9e9e9e', color: '#ffffff', padding: '10px 20px', borderRadius: '5px', border: 'none', cursor: selectedHall && selectedFood ? 'pointer' : 'not-allowed' }}
        disabled={!selectedHall || !selectedFood}
      >
        Set Accommodation
      </button>
    </div>
    </Paper>
  );
};

export default AccommodationPage;
