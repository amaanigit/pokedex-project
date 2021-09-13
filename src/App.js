import './App.css';
import backgroundPokemon from './assets/background-pokemon.svg'
import HeaderNav from './components/HeaderNav';
import { Route, HashRouter } from "react-router-dom";
import PokedexPage from "./components/PokedexPage";
import PartyPage from "./components/PartyPage";


function App() {
  return (
    <div className="app">
      
      <HashRouter>
        <HeaderNav/>

        <Route path="/" exact component={PokedexPage}/>
        <Route path="/pokedex" component={PokedexPage}/>
        <Route path="/party" component={PartyPage}/>

        <img className='background-image' src={backgroundPokemon} alt='background pokemon asset'/>
      </HashRouter>
      
    </div>
  );
}

export default App;
