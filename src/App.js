// extermal imports
import { Route, HashRouter } from "react-router-dom";
import React, { Component } from "react";

// local imports
import './App.css';
import backgroundPokemon from './assets/background-pokemon.svg'
import HeaderNav from './components/HeaderNav';
import PokedexPage from "./components/PokedexPage";
import PartyPage from "./components/PartyPage";

const paginationIncrement = 12;
const basePokemonApiUrl = 'https://pokeapi.co/api/v2/pokemon/' ;

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      genPokemon: null,
      loadedCounter: paginationIncrement,
    }
  }

  componentDidMount() {
    this.fetchGenPokemon();
    console.log(this);
  }

  // get the species of all gen 1 pokemon from the pokeAPI: https://pokeapi.co/ and update the component state
  fetchGenPokemon() {
    const genApiUrl = 'https://pokeapi.co/api/v2/generation/1/';

    fetch(genApiUrl)
    .then(response => response.json())
    .then(data => this.setState({genPokemon: this.orderGenPokemon(data.pokemon_species)}))
    .catch(error => {
      console.log('error fetching data from https://pokeapi.co/: ', error)
    })
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

// function App() {
//   // initialising the app state
//   const [appState, setAppState] = useState({
//     genPokemon: null
//   });

//   // getting the api for gen 1 pokemons
//   useEffect(() => {
//     const genApiUrl = 'https://pokeapi.co/api/v2/generation/1/';
//     fetch(genApiUrl)
//       .then((res) => res.json())
//       .then((apiData) => {
//         setAppState({ genPokemon: apiData.pokemon_species });
//       }).catch(console.log('error fetching data from api'));
      
//   }, [setAppState]);
  
//   const pokemonIds = [];

//   function extractAndAddId(item) {
//     const idRegex = /\/([0-9]+)\//; // to get numbers between the / / in the url - should just be the IDs 
//     let urlID = item.url.match(idRegex).pop();
//     urlID = parseInt(urlID);
//     return urlID;
//   }

//   // add and sort by IDs
//   if(appState.genPokemon) {
//     appState.genPokemon.map((item) => pokemonIds.push({ id: extractAndAddId(item), name: item.name}));
//     pokemonIds.sort((a, b) => (a.id > b.id) ? 1 : -1);
//     console.log(pokemonIds);
//   }

  
// }

export default App;
