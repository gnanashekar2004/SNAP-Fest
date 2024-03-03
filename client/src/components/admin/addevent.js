import React, { useState } from 'react';
import { addEvent } from '../../api_helpers/api_helpers';

const AddEvent = ()=>{
  const [formData, setFormData] = useState({
        id: 0,
        name: "",
        dateofevent: "",
        location: "",
        description: ""
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
    formData.id = Number(formData.id);
    console.log('Form submitted:', formData);

    addEvent(formData).then((data)=>{
        alert(data);
    }).catch((err)=>console.log(err));
    // Reset form after submission
    setFormData({
        id: 0,
        name: "",
        dateofevent: "",
        location: "",
        description: ""
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Event id:
        <input
          type="number"
          name="id"
          value={formData.id}
          onChange={handleChange}
          required
        />
      </label>
      <br />
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
        location:
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Date of event:
        <input
          type="date"
          name="dateofevent"
          value={formData.dateofevent}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Description:
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddEvent;
