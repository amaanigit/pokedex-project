// // extermal imports
// import { Route, HashRouter } from "react-router-dom";
// import React, { Component } from "react";

// // local imports
// import './App.css';
// import backgroundPokemon from './assets/background-pokemon.svg'
// import HeaderNav from './components/HeaderNav';
// import PokedexPage from "./components/PokedexPage";
// import PartyPage from "./components/PartyPage";
// // import PokemonList from "./components/OLD-PokemonList";
// import EmptyCard from "./components/EmptyCard";
// import PartyCard from "./components/PartyCard";
// import PokedexCard from "./components/PokedexCard";



// class App extends Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       genPokemon: null
//     }
//   }

//   componentDidMount() {
//     this.fetchGenPokemon();
//   }

//   // get the species of all gen 1 pokemon from the pokeAPI: https://pokeapi.co/ and update the component state
//   fetchGenPokemon() {
//     const genApiUrl = 'https://pokeapi.co/api/v2/generation/1/';

//     fetch(genApiUrl)
//     .then(response => response.json())
//     .then(data => this.setState({genPokemon: this.orderGenPokemon(data.pokemon_species)}))
//     .catch(error => {
//       console.log('error fetching pokemon data: ', error)
//     });
//   }

//   // return an ordered list of gen 1 pokemon by ID, using the fetched data from the API call
//   orderGenPokemon(fetchedPokemon) {

//     // extract the ID from the url
//     function extractIdFromUrl(item) {
//       const idRegex = /\/([0-9]+)\//; // numbers between / / in the URL
//       let urlID = item.url.match(idRegex).pop();
//       urlID = parseInt(urlID);
//       return urlID;
//     }
    
//     // loop through the existing fetched list of pokemon, add the ID, and sort by ID
//     let pokemonIds = [];
//     if(fetchedPokemon) {
//       fetchedPokemon.map((item) => pokemonIds.push({ id: extractIdFromUrl(item), name: item.name}));
//       pokemonIds.sort((a, b) => (a.id > b.id) ? 1 : -1);
//     }

//     return pokemonIds;
//   }



  

//   render() {
//     // any dymiac things that causes the app to get re rendered is done in here


//     return (
//       <div className="app">
//         <HashRouter>
//           <HeaderNav/>

          

//           {/* <PokemonList genPokemon={this.state.genPokemon}/> */}
          
//           <div className="page-container">
//           <Route path="/" exact component={PokedexPage}/>
//           <Route path="/pokedex" component={PokedexPage}/>
//           <Route path="/party" component={() => <PartyPage testData={"testing parsing through props"}/>}/>
//           </div>

//           <h2>NEW COMPONENTS WITH FUNCTIONALITY</h2>
//           { genPokemon && <PokemonApp id={8}/>}

//           <EmptyCard/>

//           {/* need to add update party function as prop */}
//           <PartyCard key={1} name='test name' id={1} sprites='test sprite' types='test type'/> 

//           {/* need to add update party and error message as props, and is in party function */}
//           <PokedexCard key={2} name='bulby' id={1} sprites='add sprite here' types='add type here' partyCount={1} cardInParty={false}/>
  
//           <img className='background-image' src={backgroundPokemon} alt='background pokemon asset'/>
//         </HashRouter>
        
//       </div>
//     );
//   }
// }


// export default App;


// NEW VERSION OVER HERE

// -- external imports -- 
import { useState, useEffect } from 'react';
import { HashRouter } from "react-router-dom";

// -- local imports --
import './App.css';
import backgroundPokemon from './assets/background-pokemon.svg';
import HeaderNav from './components/HeaderNav';
import PokemonApp from './components/PokemonApp';

function App() {
  const generation = '1/';
  const [genPokemon, setGenPokemon] = useState(null);
  const [error, setError] = useState(null);

  
  /**
   * Fetch all names, and ID's of gen 1 pokemon. Run once on load.
   */
  useEffect(() => {
    console.log('use effect ran');
    const apiUrl = 'https://pokeapi.co/api/v2/generation/' + generation;

    fetch(apiUrl)
    .then(response => {
      if(!response.ok) {
        throw Error('could not fetch the data for that resource');
      }
      return response.json();
    })
    .then(data => {
      console.log(data.pokemon_species);
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

          { genPokemon && <PokemonApp genPokemonList={genPokemon} id={2} updateErrorMessage={(message) => updateErrorMessage(message)}/>}
          
          <img className='background-image' src={backgroundPokemon} alt='background pokemon asset'/>
        </HashRouter>
    </div>
  );
}

export default App;
