import React, { Component } from "react";
import PageButton from "./PageButton";
 
class PartyPage extends Component {
  render() {
    return (
      <div>
        <h2>This is the pARTy page</h2>
        <PageButton link="/pokedex" text="dex"/>
      </div>
    );
  }
}
 
export default PartyPage;