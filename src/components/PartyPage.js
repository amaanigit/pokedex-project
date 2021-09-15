import React, { Component } from "react";
import Card from "./Card";
import CardGrid from "./CardGrid";
import ItemsTotal from "./ItemsTotal";
import PageButton from "./PageButton";
import PageTitle from "./PageTitle";
 
class PartyPage extends Component {
  
  render() {
    return (
      <div>
        <PageTitle text="Ash's Party"/>
        <PageButton link="/pokedex" text="dex"/>
        

        {/* testing */}
        <CardGrid>
          <Card hasData={false}/>
          <Card hasData={true}/>
          <Card hasData={true}/>
          <Card hasData={false}/>
          <Card hasData={false}/>
          <Card hasData={false}/>
        </CardGrid>

        <ItemsTotal currentItems="0" totalItems="6"/>

        <p>{this.props.testData}</p>
      </div>
    );
  }
}
 
export default PartyPage;