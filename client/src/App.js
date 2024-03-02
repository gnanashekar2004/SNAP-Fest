import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Homepage from './components/Homepage/Homepage';
import Participant from './components/participant/Participant';
import Student from './components/student/Student';
import Organizer from './components/organizer/Organizer';
import Admin from './components/admin/Admin';
import ParticipantPage from './components/admin/ParticipantPage';
import StudentPage from './components/admin/StudentPage';
import OrganiserPage from './components/admin/OrganiserPage';
import EventPage from './components/admin/EventPage';

import './App.css';
import Student_auth from './components/Auth/student/student';
import Organizer_auth from './components/Auth/organiser/organizer';
import Participant_auth from './components/Auth/ext_student/ext_student';
import Admin_auth from './components/Auth/admin/admin';

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route exact path="/" element = {<Homepage />} />
            <Route path="/ext_part/home" element = {<Participant />} />
            <Route path="/ext_part/auth" element = {<Participant_auth />} />
            <Route path="/students/home" element = {<Student />} />
            <Route path="/students/auth" element = {<Student_auth />} />
            <Route path="/orgs/home" element = {<Organizer />} />
            <Route path="/orgs/auth" element = {<Organizer_auth />} />
            <Route path="/admin/home" element = {<Admin />} />
            <Route path="/admin/auth" element = {<Admin_auth />} />
            <Route path="/participants" element = {<Participant />} />
            <Route path="/students" element = {<Student />} />
            <Route path="/organizers" element = {<Organizer />} />
            <Route path="/admins" element = {<Admin />} />
            <Route path="/admins/participants" element={<ParticipantPage />} />
            <Route path="/admins/students" element={<StudentPage />} />
            <Route path="/admins/organisers" element={<OrganiserPage />} />
            <Route path="/admins/events" element={<EventPage />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
