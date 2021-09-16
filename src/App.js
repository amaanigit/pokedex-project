// extermal imports
import { Route, HashRouter } from "react-router-dom";
import React, { Component } from "react";

// local imports
import './App.css';
import backgroundPokemon from './assets/background-pokemon.svg'
import HeaderNav from './components/HeaderNav';
import PokedexPage from "./components/PokedexPage";
import PartyPage from "./components/PartyPage";
import PokemonList from "./components/PokemonList";



class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      genPokemon: null
    }
  }

  componentDidMount() {
    this.fetchGenPokemon();
  }

  // get the species of all gen 1 pokemon from the pokeAPI: https://pokeapi.co/ and update the component state
  fetchGenPokemon() {
    const genApiUrl = 'https://pokeapi.co/api/v2/generation/1/';

    fetch(genApiUrl)
    .then(response => response.json())
    .then(data => this.setState({genPokemon: this.orderGenPokemon(data.pokemon_species)}))
    .catch(error => {
      console.log('error fetching pokemon data: ', error)
    });
  }

  // return an ordered list of gen 1 pokemon by ID, using the fetched data from the API call
  orderGenPokemon(fetchedPokemon) {

    // extract the ID from the url
    function extractIdFromUrl(item) {
      const idRegex = /\/([0-9]+)\//; // numbers between / / in the URL
      let urlID = item.url.match(idRegex).pop();
      urlID = parseInt(urlID);
      return urlID;
    }
    
    // loop through the existing fetched list of pokemon, add the ID, and sort by ID
    let pokemonIds = [];
    if(fetchedPokemon) {
      fetchedPokemon.map((item) => pokemonIds.push({ id: extractIdFromUrl(item), name: item.name}));
      pokemonIds.sort((a, b) => (a.id > b.id) ? 1 : -1);
    }

    return pokemonIds;
  }



  

  render() {
    // any dymiac things that causes the app to get re rendered is done in here


    return (
      <div className="app">
        <HashRouter>
          <HeaderNav/>

          <PokemonList genPokemon={this.state.genPokemon}/>
          
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
}


export default App;
