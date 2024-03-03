import React, { useState } from 'react';
import {  addStudents } from '../../api_helpers/api_helpers';
import styles from './Forms.module.css';
import { useNavigate } from 'react-router-dom';

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
  
  let navigate = useNavigate();
  const handleSubmit = e => {
    e.preventDefault();
    // Handle form submission, e.g., send data to server
    console.log('Form submitted:', formData);
    addStudents(formData).then((data)=>{
        alert(`success`);
        navigate("/admins/students");
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
    <div className={styles.formContainer}>
    <form className={styles.formBox} onSubmit={handleSubmit}>
    <h2 className={styles.formTitle}>Add A Student</h2>
    <div className={styles.formFields}>
    <label className={styles.fieldColumn}>
        <input
          type="text"
          name="name"
          className={styles.inputField}
          value={formData.name}
          onChange={handleChange}
          placeholder='Name'
          required
        />
      </label>
      <br />
      <label className={styles.fieldColumn}>
        <input
          type="email"
          name="email"
          className={styles.inputField}
          value={formData.email}
          onChange={handleChange}
          placeholder='Email'
          required
        />
      </label>
      <br />
      <label className={styles.fieldColumn}>
        <input
          type="password"
          name="password"
          className={styles.inputField}
          value={formData.password}
          onChange={handleChange}
          placeholder='Password'
          required
        />
      </label>
      <br />
      <label className={styles.fieldColumn}>
        <input
          type="text"
          name="hall"
          className={styles.inputField}
          value={formData.hall}
          onChange={handleChange}
          placeholder='Hall'
          required
        />
      </label>
      <br />
      <label className={styles.fieldColumn}>
        <input
          type="text"
          name="roll"
          className={styles.inputField}
          value={formData.roll}
          onChange={handleChange}
          placeholder='Roll'
          required
        />
      </label>
    </div>
      <button className={styles.formButton} type="submit">Submit</button>
    </form>
    </div>
    </>
  );
};

export default AddStudent;
