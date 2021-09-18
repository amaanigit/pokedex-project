import CardGrid from "./CardGrid";
import ItemsTotal from "./ItemsTotal";
import PageButton from "./PageButton";
import PageTitle from "./PageTitle";
import PokedexCard from "./PokedexCard";

function PokedexPage(props) {
  return(
    <div>
      <PageTitle text="Choose your team"/>
      <PageButton link="/party" text="party"/>

      {/* make these dynamic */}
      <ItemsTotal currentItems="12" totalItems="151"/>

      <CardGrid>
      {props.loadedPokemonList.map((item) => {
          return (
              <PokedexCard key={item.id} name={item.name} id={item.id} sprites={item.sprites} types={item.types} 
              updateParty={props.updateParty} partyCount={props.partyList.length} cardInParty={props.isInParty(item.id)} 
              updateErrorMessage={(message) => props.updateErrorMessage(message)} maxParty={props.maxParty}/>
          );
      })}
      </CardGrid>

      <ul>
          <li>PARTY LIST</li>
          {props.partyList.map((item) => {
              return (
                  <p key={item.id}>{item.name}</p>
              );
          })}
      </ul>

    </div>
  );
}

export default PokedexPage;