import react from 'react';
// import image from '../../assests/Admin.png';

function Card({source, title , onClick}) {

    const style1={
        backgroundColor: "#48AAAD",
        borderRadius: "0px 0px 15px 15px"
    };

    return (
    <div className="card" style={{width: "18rem", borderRadius: "15px", cursor: 'pointer'}} onClick={onClick}>
        <img src={source} class="card-img-top" alt={title} />
        <div className="card-body" style={style1}>
          <h3 className="card-text" style={{textAlign: "center" , color: "white"}}>{title}</h3>
        </div>
      </div>
    );
}

export default Card;