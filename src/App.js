// -- external imports -- 
import { useState, useEffect } from 'react';
import { HashRouter } from "react-router-dom";

// -- local imports --
import './App.css';
import backgroundPokemon from './assets/background-pokemon.svg';
import HeaderNav from './components/HeaderNav';
import PokemonApp from './components/PokemonApp';

function App() {
  const GENERATION = 1; // change this to run the app with different generations (it will still work)
  const [genPokemon, setGenPokemon] = useState(null);
  const [error, setError] = useState(null);

  
  /**
   * Fetch all names, and ID's of gen 1 pokemon. Run once on load.
   */
  useEffect(() => {
    const apiUrl = 'https://pokeapi.co/api/v2/generation/' + GENERATION;

    fetch(apiUrl)
    .then(response => {
      if(!response.ok) {
        throw Error('could not fetch the data for that resource');
      }
      return response.json();
    })
    .then(data => {
      setGenPokemon(orderGenPokemon(data.pokemon_species))
      updateErrorMessage(null);
    })
    .catch(error => {
      console.log('error fetching api data: ', error.message);
      updateErrorMessage(error.message);
    });

  },[]);


  /**
   * Return an ordered list of pokemon by ID, extracting the ID from the pokemon species URL.
   */
  function orderGenPokemon(fetchedPokemon) {

    // -- extract the ID from the url --
    function extractIdFromUrl(item) {
      const idRegex = /\/([0-9]+)\//;
      let urlID = item.url.match(idRegex).pop();
      urlID = parseInt(urlID);
      return urlID;
    }
  
    // -- add and sort by ID --
    let pokemonIds = [];
    if(fetchedPokemon) {
      fetchedPokemon.map((item) => pokemonIds.push({ id: extractIdFromUrl(item), name: item.name}));
      pokemonIds.sort((a, b) => (a.id > b.id) ? 1 : -1);
    }

    return pokemonIds;
  }

  /**
   * Update the error message state which will output an error message in the app
   */
  function updateErrorMessage(message) {
    setError(message);
  }


  /**
   * Render the components
   */
  return (
    <div className="app">
        <HashRouter>
          <HeaderNav/>
          { error && <div className='error-message'>{error}</div>}

          { genPokemon && <PokemonApp genPokemonList={genPokemon} id={2} updateErrorMessage={updateErrorMessage}/>}
          
          <img className='background-image' src={backgroundPokemon} alt='background pokemon asset'/>
        </HashRouter>
    </div>
  );
}

export default App;
