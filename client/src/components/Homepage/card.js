import react from 'react';
// import image from '../../assests/Admin.png';

function Card({source, title , onClick}) {
    return (
    <div className="card" style={{width: "18rem"}} onClick={onClick}>
        <img src={source} class="card-img-top" alt={title} />
        <div className="card-body">
          <h3 className="card-text" style={{textAlign: "center"}}>{title}</h3>
        </div>
      </div>
    );
}

export default Card;