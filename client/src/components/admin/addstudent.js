import React, { useState } from 'react';
import {  addStudents } from '../../api_helpers/api_helpers';

const AddStudent = () => {
  const [formData, setFormData] = useState({
    name:'',
    email: '',
    password: '',
    hall: '',
    roll: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Handle form submission, e.g., send data to server
    console.log('Form submitted:', formData);
    addStudents(formData).then((data)=>{
        alert(data);
    }).catch((err)=>console.log(err));
    // Reset form after submission
    setFormData({
        name:'',
        email: '',
        password: '',
        hall: '',
        roll: ''
    });
  };

  return (
    <>
    <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }} onSubmit={handleSubmit}>
      <label>
        name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        password:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Hall:
        <input
          type="text"
          name="hall"
          value={formData.hall}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Roll:
        <input
          type="text"
          name="roll"
          value={formData.roll}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      
      <button type="submit">Submit</button>
    </form>
    </>
  );
};

export default AddStudent;
