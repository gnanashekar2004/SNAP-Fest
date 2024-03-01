
import { useNavigate } from "react-router-dom";

import Card from "./card";
import image1 from "../../assests/participants.png";
import image2 from "../../assests/student.png";
import image3 from "../../assests/Organiser.png";
import image4 from "../../assests/Admin.png";
import styles from "./Homepage.module.css";

function Homepage() {
  let navigate = useNavigate();

  const handleCardClickforExternalParticipants = (route) => {
    let ext_part_id=localStorage.getItem('ext_part_id');
    if (!ext_part_id){
      route = '/ext_part/auth';
    }
    else {
      route = '/ext_part/home';
    }
    navigate(route);
  };
  const handleCardClickforStudents = (route) => {
    let student_id=localStorage.getItem('student_id');
    if (!student_id){
      route = '/students/auth';
    }
    else {
      route = '/students/home';
    }
    navigate(route);
  };
  const handleCardClickforOrganizers = (route) => {
    let org_id=localStorage.getItem('org_id');
    if (!org_id){
      route = '/orgs/auth';
    }
    else {
      route = '/orgs/home';
    }
    navigate(route);
  };
  const handleCardClickforAdmins = (route) => {
    let admin_id=localStorage.getItem('admin_id');
    if (!admin_id){
      route = '/admin/auth';
    }
    else {
      route = '/admin/home';
    }
    navigate(route);
  };

  return (
    <div className={styles.cardBox}>
      <Card
        source={image1}
        title="Participant"
        onClick={() => handleCardClickforExternalParticipants("")}
      />
      <Card
        source={image2}
        title="Student"
        onClick={() => handleCardClickforStudents("")}
      />
      <Card
        source={image3}
        title="Organizer"
        onClick={() => handleCardClickforOrganizers("")}
      />
      <Card
        source={image4}
        title="Admin"
        onClick={() => handleCardClickforAdmins("")}
      />
    </div>
  );
}

export default Homepage;
