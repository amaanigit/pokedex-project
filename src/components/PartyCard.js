// import { useState } from 'react';

import '../styles/Card.css';
import '../styles/PartyCard.css';
import closeIcon from '../assets/x-icon.svg';


function PartyCard(props) {
    // const [nickname, setNickname] = useState(props.name);

    function removeFromParty() {
        props.updateParty('remove', props);
    }

    // if have time, move this function up to be more 'global'
    /**
     * Takes in a number (num), and adds leading 0's for a given size. Returns it as a string.
     */
    function formatId(num, size) {
        num = num.toString();
        while (num.length < size) num = "0" + num;
        return num;
    }

    return (
        <div className='single-card-wrapper'>
            <div className='card party-card'>
                <div className="image-wrapper">
                    <img className='poke-image' src={props.sprite} alt='pokemon pic from API'/>
                </div>

                <div className="poke-id">#{formatId(props.id, 3)}</div>

                <form className='card-title-form'>
                    <input id={'inputField' + props.id} type="text" placeholder={props.name} value={props.partyNickname} onChange={(e) => props.setNickname(props.id, e.target.value)}/>
                    <hr/>
                </form>

                <div className="types">
                    {props.types.map((item) => {
                        return (
                            <span key={item.type.name} className={'type ' + item.type.name}>{item.type.name}</span>
                        );
                    })}
                </div>

                {<p>Added to party { props.cardCount } times</p>}
                
                <p className='close-button' onClick={removeFromParty}><img className='icon' src={closeIcon} alt='close icon'/></p>
            </div>
        </div>
    );
}

export default PartyCard;