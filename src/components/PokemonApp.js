// -- external imports --
import React, { useEffect, useState } from 'react';
import { Route } from 'react-router';

// -- local imports --
import PokedexPage from './PokedexPage';
import PartyPage from './PartyPage';


/**
 * A parent component that manages all pokemon related data (pokedex & party pages)
 */
function PokemonApp(props) {
    const MAX_PARTY = 6;

    const [partyList, setPartyList] = useState([]);
    const [pokemon, setPokemon] = useState(null);
    const [loadedPokemonList, setLoadedPokemons] = useState([
        {id: 1, name: 'Bulbasaur', sprites: 'add sprite here', types: 'add types here'},
        {id: 2, name: 'Ivysaour', sprites: 'add sprite here', types: 'add types here'},
        {id: 3, name: 'venusaur', sprites: 'add sprite here', types: 'add types here'},
        {id: 4, name: 'charmander', sprites: 'add sprite here', types: 'add types here'},
        {id: 5, name: 'charmeleon', sprites: 'add sprite here', types: 'add types here'},
        {id: 6, name: 'charizard', sprites: 'add sprite here', types: 'add types here'},
        {id: 7, name: 'squirtle', sprites: 'add sprite here', types: 'add types here'},
        {id: 8, name: 'wartortle', sprites: 'add sprite here', types: 'add types here'},
    ])
  
    /**
     * A function to add or remove pokemon from the global party 
     */
    function updateParty(action, pokemon) {
        if(action === 'add') {
        if(partyList.length < MAX_PARTY) { 
            const addPartyList = partyList.filter(item => 1 != 2); // loop through & populate array while condition is true (1 != 2 is always true)
            addPartyList.push(pokemon);
            setPartyList(addPartyList);
            // isInParty(pokemon.id);
            props.updateErrorMessage(null);
        } else {
            props.updateErrorMessage('you cannot have more than 6 pokemon in a party');
            console.log('you cannot have more than 6 in a party');
        }
        } else { // remove from party
            const removePartyList = partyList.filter(item => item.id !== pokemon.id); // loop through & populate array, except if item has matching ID
            setPartyList(removePartyList);
            // isInParty(pokemon.id);
            props.updateErrorMessage(null);
        }
    }

    /**
     * A function to check if a pokemon is in the global party, based on the pokemon ID
     */
    function isInParty(pokeID) {
        if(partyList.find(({id}) => id === pokeID)) {
            return true;
        } else {
            return false;
        }
    }

  
    // function FetchPokemon(id) {
        // const url = 'https://pokeapi.co/api/v2/pokemon/' + props.id;
        // // const pokemons = null;

        // useEffect(() => {
        //     console.log('pokemon use effect ran');
        //     fetch(url)
        //     .then(response => {
        //     if(!response.ok) {
        //         throw Error('could not fetch the data for that resource');
        //     }
        //     return response.json();
        //     })
        //     .then(data => {
        //         console.log(data);
        //         setPokemon(data);
        //         props.updateErrorMessage(null);
        //     })
        //     .catch(error => {
        //         console.log('error fetching api data: ', error.message);
        //         props.updateErrorMessage(error.message);
        //     });
        // },[props, url]);
    // }

    
    

    


    return (
    <div className="pokemon-app">

        <div className="page-container">
            <Route path="/" exact component={() => 
                <PokedexPage loadedPokemonList={loadedPokemonList} maxParty={MAX_PARTY} updateParty={updateParty} partyList={partyList} 
                isInParty={(id) => isInParty(id)} updateErrorMessage={(message) => props.updateErrorMessage(message)} />} />
            <Route path="/pokedex" component={() => 
                <PokedexPage loadedPokemonList={loadedPokemonList} maxParty={MAX_PARTY} updateParty={updateParty} partyList={partyList} 
                isInParty={(id) => isInParty(id)} updateErrorMessage={(message) => props.updateErrorMessage(message)} />} />
            <Route path="/party" component={() => <PartyPage maxParty={MAX_PARTY} partyList={partyList} updateParty={updateParty}/>}/>
        </div>
        
        {/* get pokemon api data working */}
        { props.genPokemonList && <ul>
            <li>GEN POKEMON</li>
                {props.genPokemonList.map((item) => {
                return (
                    <p key={item.id}>{item.id} {item.name}</p>
                );
            })}
        </ul>}

        <p>testing fetch: {pokemon && pokemon.name}</p>

    </div>
  );
}

export default PokemonApp;
