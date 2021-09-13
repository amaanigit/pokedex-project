import React, { Component } from "react";
import PageButton from "./PageButton";
 
class PokedexPage extends Component {
  render() {
    return (
      <div>
        <h2>This is the pokedex page</h2>
        <PageButton link="/party" text="party"/>
      </div>
    );
  }
}
 
export default PokedexPage;