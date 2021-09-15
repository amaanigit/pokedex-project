import './App.css';
import backgroundPokemon from './assets/background-pokemon.svg'
import HeaderNav from './components/HeaderNav';
import PokedexPage from "./components/PokedexPage";
import PartyPage from "./components/PartyPage";

import { Route, HashRouter } from "react-router-dom";
import React, { useEffect, useState } from 'react';

// add state for mobile menu, to add class to app

function App() {
  // initialising the app state
  const [appState, setAppState] = useState({
    genPokemon: null
  });

  // getting the api for gen 1 pokemons
  useEffect(() => {
    const genApiUrl = 'https://pokeapi.co/api/v2/generation/1/';
    fetch(genApiUrl)
      .then((res) => res.json())
      .then((apiData) => {
        setAppState({ genPokemon: apiData.pokemon_species });
      }).catch(console.log('error fetching data from api'));
      
  }, [setAppState]);
  
  const pokemonIds = [];

  function extractAndAddId(item) {
    const idRegex = /\/([0-9]+)\//; // to get numbers between the / / in the url - should just be the IDs 
    let urlID = item.url.match(idRegex).pop();
    urlID = parseInt(urlID);
    return urlID;
  }

  // add and sort by IDs
  if(appState.genPokemon) {
    appState.genPokemon.map((item) => pokemonIds.push({ id: extractAndAddId(item), name: item.name}));
    pokemonIds.sort((a, b) => (a.id > b.id) ? 1 : -1);
    console.log(pokemonIds);
  }

  // setAppState({genPokemon: pokemonIds});

  

  // returing the app
  return (
    <div className="app">
      
      <HashRouter>
        <HeaderNav/>
        
        <div className="page-container">
        <Route path="/" exact component={PokedexPage}/>
        <Route path="/pokedex" component={PokedexPage}/>
        <Route path="/party" component={() => <PartyPage testData={"testing parsing through props"}/>}/>
        </div>

        <img className='background-image' src={backgroundPokemon} alt='background pokemon asset'/>
      </HashRouter>
      
    </div>
  );
}

export default App;
