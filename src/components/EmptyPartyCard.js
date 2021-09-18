import '../styles/Card.css';
import defaultImg from '../assets/card-pokeball.svg';

function EmptyCard() {
    return(
        <div className="single-card-wrapper">
            <div className="card">
                <img className='default-image' src={defaultImg} alt='no pokemon'/>
            </div>
        </div>
    );
}

export default EmptyCard;