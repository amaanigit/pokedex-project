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
    const FIRST_POKEMON = props.genPokemonList[0].id;
    const PAGE_INCREMENT = 12;


    const [pageLoadMax, setPageLoadMax] = useState(FIRST_POKEMON + 12);
    const [canLoadMore, setCanLoadMore] = useState(true);

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

    function loadPokemon() {
        if(pageLoadMax + PAGE_INCREMENT <= FIRST_POKEMON + props.genPokemonList.length) { // if it can be incremented by 12
            setPageLoadMax(pageLoadMax + PAGE_INCREMENT);
        } else {
            setPageLoadMax(props.genPokemonList.length + 1);
            setCanLoadMore(false);
        }
        console.log(canLoadMore);
    } 
    

    
    useEffect(() => {
        const urls = [];
        for(let i = FIRST_POKEMON; i < pageLoadMax; i ++) {
            const pokemon = (props.genPokemonList.find(({id}) => id === i));
            console.log(pokemon.name);
            urls.push('https://pokeapi.co/api/v2/pokemon/' + pokemon.name);

        }

        Promise.all(urls.map(url =>
            fetch(url).then(resp => resp.json())
        )).then(data => {
            console.log(data);
            setPokemon(data);
        })
    }, [pageLoadMax]);



    return (
    <div className="pokemon-app">

        <div className="page-container">
            <Route path="/" exact component={() => 
                <PokedexPage loadedPokemonList={loadedPokemonList} maxParty={MAX_PARTY} updateParty={updateParty} partyList={partyList} 
                isInParty={isInParty} updateErrorMessage={props.updateErrorMessage} />} 
            />
            
            <Route path="/pokedex" component={() => 
                <PokedexPage loadedPokemonList={loadedPokemonList} maxParty={MAX_PARTY} updateParty={updateParty} partyList={partyList} 
                isInParty={isInParty} updateErrorMessage={props.updateErrorMessage} />} 
            />
            
            <Route path="/party" component={() => 
                <PartyPage maxParty={MAX_PARTY} partyList={partyList} updateParty={updateParty}/>}
            />
        </div>
        
        {/* get pokemon api data working */}
        {/* { props.genPokemonList && <ul>
            <li>GEN POKEMON</li>
                {props.genPokemonList.map((item) => {
                return (
                    <p key={item.id}>{item.id} {item.name}</p>
                );
            })}
        </ul>} */}

        { pokemon && <ul>
            <li>TESTING POKEMON PAGINATION</li>
                {pokemon.map((item) => {
                return (
                    <p key={item.id}>{item.id} {item.name}</p>
                );
            })}
        </ul>}

        {canLoadMore &&
            <p onClick={loadPokemon}>loadmore</p>
        }
        

        {/* <p>testing fetch: {pokemon && pokemon.name}</p> */}

    </div>
  );
}

export default PokemonApp;
