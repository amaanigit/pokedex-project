import react from 'react';

const paginationIncrement = 12;
const basePokemonApiUrl = 'https://pokeapi.co/api/v2/pokemon/';

class PokemonList extends react.Component {
   
    constructor(props) {
        super(props);
        this.state = {
            loadedPokemon: [],
            loadCount: 1,
        }
    }

    loadPokemon() {


        // get the pokemon in increments of 12, based off the id i
        for(let i = this.state.loadCount; i <= this.state.loadCount + paginationIncrement; i++) { // figure out the counting and increments, pagination
            const result = this.props.genPokemon.find( ({ id }) => id === i );

            fetch(basePokemonApiUrl + result.name)
            .then(response => response.json())
            .then(apiData => console.log(apiData))
            .catch(error => {
                console.log('error fetching pokemon data: ', error)
            });
        }

        // if(this.state.loadCount < this.props.genPokemon) {

        // }

        

        
    }

    render() {
        if (!this.props.genPokemon || this.props.genPokemon.length === 0) { 
            return <p>No data to be found</p>;
        };

        this.loadPokemon();

        return (
            <ul className='pokemon-list'>
              <h2 className='list-head'>Gen 1 pokemon species</h2>
              <p>{this.props.genPokemon.length}</p>
              
              {this.props.genPokemon.map((pokemon) => {
                return (
                  <li key={pokemon.id} className='list'>
                    <span className='repo-text'>{pokemon.id} </span>
                    <span className='repo-description'>{pokemon.name}</span>
                  </li>
                );
              })}
        
              
        
            </ul>
        );
    }
} 

// const PokemonList = (props) => {
//   const { genPokemon } = props;

//   if (!genPokemon || genPokemon.length === 0) { 
//     return <p>No data to be found</p>;
//   };



//   return (
//     <ul className='pokemon-list'>
//       <h2 className='list-head'>Gen 1 pokemon species</h2>
//       <p>{genPokemon.length}</p>
      
//       {genPokemon.map((pokemon) => {

//         return (
//           <li key={pokemon.id} className='list'>
//             <span className='repo-text'>{pokemon.id} </span>
//             <span className='repo-description'>{pokemon.name}</span>
//           </li>
//         );
        

//       })}

      

//     </ul>
//   );

// };

export default PokemonList;