import react from 'react';
import { useNavigate } from 'react-router-dom';

import Card from './card';
import image1 from '../../assests/participants.png'; 
import image2 from '../../assests/student.png'; 
import image3 from '../../assests/Organiser.png'; 
import image4 from '../../assests/Admin.png';
import styles from './Homepage.module.css';

function Homepage (){
    let navigate = useNavigate();

    const handleCardClick = (route) => {
        navigate(route);
    };

    return(
        <div className={styles.cardBox}>
            <Card source={image1} title="Participant"  onClick={() => handleCardClick('/participants')}/>
            <Card source={image2} title="Student"  onClick={() => handleCardClick('/students')}/>
            <Card source={image3} title="Organizer"  onClick={() => handleCardClick('/organizers')}/>
            <Card source={image4} title="Admin"  onClick={() => handleCardClick('/admins')}/>
        </div>
    );
}

export default Homepage;