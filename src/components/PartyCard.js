import '../styles/Card.css';
import { useState } from 'react';

function PartyCard(props) {
    const [nickname, setNickname] = useState(props.name);

    function removeFromParty() {
        props.updateParty('remove', props);
    }

    return (
        <div className='single-card-wrapper'>
            <div className='card party-card'>
                <div className="image-wrapper">
                    <p>{props.sprites}</p>
                    {/* <img className='poke-image' src={pokemonImg} alt='testing'/> */}
                </div>

                <form>
                    <input type="text" placeholder={props.name} value={nickname} onChange={(e) => setNickname(e.target.value)}/>
                </form>

                <p>{nickname}</p>

                <div className="poke-id">#{props.id}</div>

                <div className="types">
                      <span className="type grass">{props.types}</span>
                      {/* <span className="type poison">Poison</span> */}
                </div>
                
                <p className='close-button' onClick={removeFromParty}>X</p>
            </div>
        </div>
    );
}

export default PartyCard;