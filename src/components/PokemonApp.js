// -- external imports --
import React, { useCallback, useEffect, useState } from 'react';
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
    const [pokemon, setPokemon] = useState([]); // maybe change this to loaded pokemon
  
    /**
     * A function to add or remove pokemon from the global party 
     */
    function updateParty(action, pokemonItem) {
        if(action === 'add') {
            if(partyList.length < MAX_PARTY) { 
                const addPartyList = partyList.filter(item => 1 != 2); // loop through & populate array while condition is true (1 != 2 is always true)
                
                // create a new item, and update the card count value
                let updatedPartyItem = {
                    ...pokemonItem,
                    cardCount: pokemonItem.cardCount + 1
                }
                
                addPartyList.push(updatedPartyItem);
                setPartyList(addPartyList);
                isInParty(pokemonItem.id);
                props.updateErrorMessage(null);

                // update the count value in pokemon list so it is in sync globally
                let updatedPokemons = [...pokemon];
                let index = pokemon.findIndex(item => item.id === pokemonItem.id );
                let updatedItem = {
                    ...pokemon[index],
                    cardCount: pokemonItem.cardCount + 1
                }
                updatedPokemons[index] = updatedItem;
                setPokemon(updatedPokemons);
            } else {
                props.updateErrorMessage('you cannot have more than 6 pokemon in a party');
            }
        } else { // remove from party
            const removePartyList = partyList.filter(item => item.id !== pokemonItem.id); // loop through & populate array, except if item has matching ID
            setPartyList(removePartyList);
            isInParty(pokemonItem.id);
            props.updateErrorMessage(null);
        }
    }

    /**
     * A function to update the nickname of a pokemon (if it has been changed in the party card)
     */
    function setNickname(id, newNickname) {
        // update the nickname value in the party list
        let updatedPokemons = [...partyList];
        let index = partyList.findIndex(item => item.id === id );
        let updatedItem = {
            ...partyList[index],
            partyNickname: newNickname
        }
        updatedPokemons[index] = updatedItem;
        setPartyList(updatedPokemons);

        // update the nickanme value in pokemon list so it's in sync (if its removed and added it will still show the nickname)
        updatedPokemons = [...pokemon];
        index = pokemon.findIndex(item => item.id === id );
        updatedItem = {
            ...pokemon[index],
            partyNickname: newNickname
        }
        updatedPokemons[index] = updatedItem;
        setPokemon(updatedPokemons);
        
        // TO DO - add focus field to the input that was last clicked, so it's not laggy
        // document.getElementById('inputField' + id).focus();
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

    /**
     * Loading the pokemon in pagination increments of 12, wrapped in a use callback function
     */
    const loadPokemon = useCallback(() => { 
        // wrapped it around a 250ms timeout function to demostrate it's working (otherwise it's too fast). This can be removed.
        setTimeout(() => {
            if(pageLoadMax + PAGE_INCREMENT <= FIRST_POKEMON + props.genPokemonList.length) { // if it can be incremented by 12
                setPageLoadMax(pageLoadMax + PAGE_INCREMENT);
            } else {
                setPageLoadMax(FIRST_POKEMON + props.genPokemonList.length);
                setCanLoadMore(false);
            }
        }, 250);      
    }, [props.genPokemonList, FIRST_POKEMON, pageLoadMax]);


    /**
     * If there's more pokemon to load, load more once the user has scrolled to the bottom, wrapped in a used callback function
     */
    const handleScroll = useCallback(() => {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            if(canLoadMore) {
                loadPokemon();
            }
        }
    }, [canLoadMore, loadPokemon]);

   
    /**
     * Add scroll event listeners if there are more items to load
     */
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll); 
    }, [handleScroll]); 


    // function returnCountFromPokemon(currentItem) {
    //     let index = pokemon.findIndex(item => item.id === currentItem.id );
    //     if(pokemon.findIndex(item => item.id === currentItem.id )) {
    //         if(pokemon[index]) {
    //             return pokemon[index].cardCount;
    //         } else {
    //             return 0;
    //         }
    //     } else{
    //         return 0;
    //     }
    // }

    /**
     * On scroll, load more pokemon by fetching data from the API, using the names from the list of generation pokemons
     */
    useEffect(() => {
        const urls = [];
        for(let i = FIRST_POKEMON; i < pageLoadMax; i ++) {
            const pokemon = (props.genPokemonList.find(({id}) => id === i));
            urls.push('https://pokeapi.co/api/v2/pokemon/' + pokemon.name);
        }

        Promise.all(urls.map(url =>
            fetch(url).then(resp => resp.json())
        )).then(data => {
            // fetch the objects & add 2 new fields to handle nickname and card party count
            let dataWithAddedFields = data.map(item => ({...item, cardCount: 0, partyNickname: item.name}));
            
            // do nickname and count in seperate array

            setPokemon(dataWithAddedFields);
        })
        // add some error handling TO DO
    }, [pageLoadMax, FIRST_POKEMON, props.genPokemonList]);


    return (
        <div className="pokemon-app">

            {pokemon && 
            
                <div className="page-container">
                    <Route path="/" exact component={() => 
                        <PokedexPage loadedPokemonList={pokemon} totalPokemon={props.genPokemonList.length} maxParty={MAX_PARTY} updateParty={updateParty} 
                        partyList={partyList} isInParty={isInParty} updateErrorMessage={props.updateErrorMessage} setNickname={setNickname} canLoadMore={canLoadMore}/>}  
                    />
                    
                    <Route path="/pokedex" component={() => 
                        <PokedexPage loadedPokemonList={pokemon} totalPokemon={props.genPokemonList.length} maxParty={MAX_PARTY} updateParty={updateParty} 
                        partyList={partyList} isInParty={isInParty} updateErrorMessage={props.updateErrorMessage} setNickname={setNickname} canLoadMore={canLoadMore}/>} 
                    />
                    
                    <Route path="/party" component={() => 
                        <PartyPage maxParty={MAX_PARTY} partyList={partyList} updateParty={updateParty} setNickname={setNickname}/>}
                    />
                </div>
            }
        </div>
  );
}

export default PokemonApp;
