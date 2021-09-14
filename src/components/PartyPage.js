import React, { Component } from "react";
import Card from "./Card";
import ItemsTotal from "./ItemsTotal";
import PageButton from "./PageButton";
import PageTitle from "./PageTitle";
 
class PartyPage extends Component {
  
  render() {
    return (
      <div>
        <PageTitle text="Ash's Party"/>
        <PageButton link="/pokedex" text="dex"/>
        <ItemsTotal currentItems="0" totalItems="6"/>

        {/* testing */}
        <Card hasData={false}/>
        <Card hasData={true}/>
      </div>
    );
  }
}
 
export default PartyPage;