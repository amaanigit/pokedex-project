import { useState } from 'react';

import '../styles/Card.css';
import '../styles/PartyCard.css';
import closeIcon from '../assets/x-icon.svg';


function PartyCard(props) {
    const [nickname, setNickname] = useState(props.name);

    function removeFromParty() {
        props.updateParty('remove', props);
    }

    return (
        <div className='single-card-wrapper'>
            <div className='card party-card'>
                <div className="image-wrapper">
                    <img className='poke-image' src={props.sprite} alt='pokemon pic from API'/>
                </div>

                <div className="poke-id">#{props.id}</div>

                <form className='card-title-form'>
                    <input type="text" placeholder={props.name} value={nickname} onChange={(e) => setNickname(e.target.value)}/>
                    <hr/>
                </form>

                <div className="types">
                    {props.types.map((item) => {
                        return (
                            <span key={item.type.name} className={'type ' + item.type.name}>{item.type.name}</span>
                        );
                    })}
                </div>
                
                <p className='close-button' onClick={removeFromParty}><img className='icon' src={closeIcon} alt='close icon'/></p>
            </div>
        </div>
    );
}

export default PartyCard;