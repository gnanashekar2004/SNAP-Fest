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
import AddEvent from './components/admin/addevent';

import './App.css';
import Student_auth from './components/Auth/student/student';
import Organizer_auth from './components/Auth/organiser/organizer';
import Participant_auth from './components/Auth/ext_student/ext_student';
import Admin_auth from './components/Auth/admin/admin';
import Event_winners from './components/admin/Event_winners';
import AddOrg from './components/admin/addorg';
import AddExtPart from './components/admin/addextprt';
import AddStudent from './components/admin/addstudent';
import ExtProfilePage from './components/Profile/ext_part_profile';
import OrgProfilePage from './components/Profile/organizer_profile';
import StudentProfilePage from './components/Profile/student_profile';
import AdminProfilePage from './components/Profile/admin_profile';
import AccommodationPage from './components/accmodation/change_accom';

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
            <Route path="/admins/orgs" element={<OrganiserPage />} />
            <Route path="/admins/events" element={<EventPage />} />

            <Route path="/add/participants" element={<AddExtPart />} />
            <Route path="/add/events" element={<AddEvent />} />
            <Route path="/add/orgs" element={<AddOrg />} />
            <Route path="/add/students" element={<AddStudent />} />

            <Route path="/orgs/event_winners" element={<Event_winners />} />

            <Route path="/ext_part/profile" element={<ExtProfilePage />} />
            <Route path="/student/profile" element={<StudentProfilePage />} />
            <Route path="/organizer/profile" element={<OrgProfilePage />} />
            <Route path="/admin/profile" element={<AdminProfilePage />} />

            <Route path="/ext_part/profile/accomodation" element={<AccommodationPage />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
