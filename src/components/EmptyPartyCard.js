import { Link } from "react-router-dom";

import '../styles/Card.css';
import '../styles/EmptyPartyCard.css';
import defaultImg from '../assets/card-pokeball.svg';
import plusIcon from '../assets/x-icon.svg';

function EmptyCard() {
    return(
        <div className="single-card-wrapper">
            <div className="card empty-card">
                <img className='default-image' src={defaultImg} alt='no pokemon'/>
                
                <Link className="plus-button" to='/pokedex'><img className='icon' src={plusIcon} alt='plus icon'/></Link>
            </div>
        </div>
    );
}

export default EmptyCard;