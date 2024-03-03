import React, { useState } from 'react';
import { addExtPart } from '../../api_helpers/api_helpers';

const AddExtPart = () => {
  const [formData, setFormData] = useState({
    name:'',
    email: '',
    password: '',
    college: ''
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
    addExtPart(formData).then((data)=>{
        alert(data);
    }).catch((err)=>console.log(err));
    // Reset form after submission
    setFormData({
      name:'',
      email: '',
      password: '',
      college: ''
    });
  };

  return (
    <form onSubmit={handleSubmit}>
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
        College:
        <input
          type="text"
          name="college"
          value={formData.college}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddExtPart;
