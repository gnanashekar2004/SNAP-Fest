import react from 'react';
import Card from './card';
import image1 from '../../assests/participants.png'; 
import image2 from '../../assests/student.png'; 
import image3 from '../../assests/Organiser.png'; 
import image4 from '../../assests/Admin.png';
import styles from './Homepage.module.css';

function Homepage (){
    return(
        <div className={styles.cardBox}>
            <Card source={image1} title="Participant"/>
            <Card source={image2} title="Student"/>
            <Card source={image3} title="Organizer"/>
            <Card source={image4} title="Admin"/>
        </div>
    );
}

export default Homepage;