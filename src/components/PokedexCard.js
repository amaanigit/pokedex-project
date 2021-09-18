import { useEffect, useState } from 'react';

function PokedexCard(props) {
    const [cardCount, setCardCount] = useState(0);
  
    function handleCardClick() {
        if(props.cardInParty) {
            props.updateParty('remove', props);
            // props.updateErrorMessage(null);
        } else {
            if(props.partyCount < props.maxParty) {
                props.updateParty('add', props);
                setCardCount(cardCount + 1);
                // props.updateParty('add', props);
                // props.updateErrorMessage(null);
            } else {
                props.updateErrorMessage('You cannot have more than 6 pokemon in a party. Remove a pokemon to create more space.');
            }
        }
    }

    useEffect(() => {

    }, []);

    return (
        <div className="single-card-wrapper">
            <div className={'card pokedex-card' + (props.cardInParty ? ' active' : '')} onClick={() => handleCardClick()}>

                <div className="image-wrapper">
                    <img className='poke-image' src={props.sprite} alt='pokemon pic from API'/>
                </div>

                <h3>{props.name}</h3>

                <div className="poke-id">#{props.id}</div>

                <div className="types">
                    {props.types.map((item) => {
                        return (
                            <span key={item.type.name} className={'type ' + item.type.name}>{item.type.name}</span>
                        );
                    })}
                </div>

                {/* <p>party count: {props.partyCount}/{props.maxParty}</p> */}

                {(props.cardInParty) ? <p>added to party TEST { cardCount } times</p> : <p>added to TEST { cardCount } parties</p>}
            </div>
        </div>
    );
}

export default PokedexCard;
