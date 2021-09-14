import React, { Component } from "react";
import ItemsTotal from "./ItemsTotal";
import PageButton from "./PageButton";
import PageTitle from "./PageTitle";
 
class PokedexPage extends Component {
  render() {
    return (
      <div>
        <PageTitle text="Choose your team"/>
        <PageButton link="/party" text="party"/>
        <ItemsTotal currentItems="12" totalItems="151"/>
      </div>
    );
  }
}
 
export default PokedexPage;