import React, { useState } from 'react';
import { addOrg } from '../../api_helpers/api_helpers';
import styles from './Forms.module.css';
import { useNavigate } from 'react-router-dom';

const AddOrg = () => {
  const [formData, setFormData] = useState({
    name:'',
    email: '',
    password: ''
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
    addOrg(formData).then((data)=>{
        alert(`success`);
        navigate("/admins/orgs");
    }).catch((err)=>console.log(err));
    // Reset form after submission
    setFormData({
      name:'',
      email: '',
      password: ''
    });
  };

  return (
    <>
    <div className={styles.formContainer}>
    <form className={styles.formBox} onSubmit={handleSubmit}>
    <h2 className={styles.formTitle}>Add An Organiser</h2>
    <div className={styles.formFields} style={{height: "50%"}}>
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
    </div>
      <button className={styles.formButton} type="submit">Submit</button>
    </form>
    </div>
    </>
  );
};

export default AddOrg;
