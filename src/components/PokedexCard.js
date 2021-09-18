import { useEffect, useState } from 'react';

function PokedexCard(props) {
    const [cardCount, setCardCount] = useState(0);
  
    function handleCardClick() {
        
        
        if(props.cardInParty) {
            props.updateParty('remove', props);
            props.updateErrorMessage(null);
        } else {
            if(props.partyCount < props.maxParty) {
                props.updateParty('add', props);
                setCardCount(cardCount + 1);
                props.updateErrorMessage(null);
            } else {
                props.updateErrorMessage('you cannot have more than 6 pokemon in a party - from pokedex card');
            }
        }
    }

    // useEffect(() => {
    //     console.log('use effect ran');
    // }, [cardCount]);

    return (
        <div className="single-card-wrapper">
            <div className={'card pokedex-card' + (props.cardInParty ? ' active' : '')} onClick={() => handleCardClick()}>
                {/* <img className='default-image' src={defaultImg} alt='no pokemon'/> */}
                <p>{props.sprites}</p>

                <h3>{props.name}</h3>

                <div className="poke-id">#{props.id}</div>

                <div className="types">
                    <span className="type grass">{props.types}</span>
                    {/* <span className="type poison">Poison</span> */}
                </div>

                {/* <p>party count: {props.partyCount}/{props.maxParty}</p> */}

                {(props.cardInParty) ? <p>added to party TEST { cardCount } times</p> : <p>added to TEST { cardCount } parties</p>}
            </div>
        </div>
    );
}

export default PokedexCard;