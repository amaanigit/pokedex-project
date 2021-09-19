import { useState } from 'react';

function PokedexCard(props) {
    const [cardCount, setCardCount] = useState(0);
  
    function handleCardClick() {
        if(props.cardInParty) {
            props.updateParty('remove', props);
            props.updateErrorMessage(null);
        } else {
            if(props.partyCount < props.maxParty) {
                setCardCount(cardCount + 1); // need to store this in the parent component??
                props.updateParty('add', props);
                props.updateErrorMessage(null);
            } else {
                props.updateErrorMessage('You cannot have more than 6 pokemon in a party. Remove a pokemon to create more space.');
            }
        }
    }

    return (
        <div className="single-card-wrapper">
            <div className={'card pokedex-card' + (props.cardInParty ? ' active' : '')} onClick={() => handleCardClick()}>

                <div className="image-wrapper">
                    <img className='poke-image' src={props.sprite} alt='pokemon pic from API'/>
                </div>

                <div className="poke-id">#{props.id}</div>

                <h3 className="card-title">{props.name}</h3>

                <div className="types">
                    {props.types.map((item) => {
                        return (
                            <span key={item.type.name} className={'type ' + item.type.name}>{item.type.name}</span>
                        );
                    })}
                </div>

                {/* <p>party count: {props.partyCount}/{props.maxParty}</p> */}

                {(props.cardInParty) ? <p>FIX ME added to party { cardCount } times</p> : <p>FIX ME added to { cardCount } parties</p>}
            </div>
        </div>
    );
}

export default PokedexCard;
