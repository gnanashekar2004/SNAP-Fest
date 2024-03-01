import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from './components/Homepage/Homepage';
import Participant from './components/participant/Participant';
import Student from './components/student/Student';
import Organizer from './components/organizer/Organizer';
import Admin from './components/admin/Admin';
import './App.css';

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route exact path="/" element = {<Homepage />} />
            <Route path="/participants" element = {<Participant />} />
            <Route path="/students" element = {<Student />} />
            <Route path="/organizers" element = {<Organizer />} />
            <Route path="/admins" element = {<Admin />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
