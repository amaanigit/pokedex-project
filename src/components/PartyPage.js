import CardGrid from "./CardGrid";
import EmptyPartyCard from './EmptyPartyCard';
import ItemsTotal from "./ItemsTotal";
import PageButton from "./PageButton";
import PageTitle from "./PageTitle";
import PartyCard from './PartyCard';

function PartyPage(props) {
  
/**
 * Return the Empty Party Card component, for the amount of available slots that are left in the party
 */
  function displayDefaultCards() {
      const objs = []
      for (var i=0; i < (props.maxParty - props.partyList.length); i++) {
          objs.push(<EmptyPartyCard key={i}/>)
      }
      return objs;
  }

  return(
    <div>
      <PageTitle text="Ash's party"/>
      <PageButton link="/pokedex" text="dex"/>
      <ItemsTotal currentItems={props.partyList.length} totalItems={props.maxParty}/>

      <CardGrid>
        {props.partyList.map((item) => {
            return (
              <PartyCard key={item.id} name={item.name} id={item.id} sprites={item.sprites} types={item.types} updateParty={props.updateParty} />
            );
        })}

        {displayDefaultCards()}
      </CardGrid>
    </div>
  );
}

export default PartyPage;