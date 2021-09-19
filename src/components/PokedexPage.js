import '../styles/PokedexPage.css';
import CardGrid from "./CardGrid";
import ItemsTotal from "./ItemsTotal";
import PageButton from "./PageButton";
import PageTitle from "./PageTitle";
import PartyPreview from "./PartyPreview";
import PokedexCard from "./PokedexCard";

function PokedexPage(props) {
  return(
    <div className='pokedex-page'>
      <PageTitle text="Choose your team"/>

      <div>
        <PartyPreview partyList={props.partyList} maxParty={props.maxParty}/>
        <PageButton link="/party" text="party"/>
      </div>
      

      

      <CardGrid>
        {props.loadedPokemonList.map((item) => {
            return (
                <PokedexCard key={item.id} name={item.name} id={item.id} sprite={item.sprites.front_default} types={item.types} 
                updateParty={props.updateParty} partyCount={props.partyList.length} cardInParty={props.isInParty(item.id)}
                updateErrorMessage={(message) => props.updateErrorMessage(message)} maxParty={props.maxParty}/>
            );
        })}
      </CardGrid>

      <ItemsTotal currentItems={props.loadedPokemonList.length} totalItems={props.totalPokemon}/>

      
      

    </div>
  );
}

export default PokedexPage;