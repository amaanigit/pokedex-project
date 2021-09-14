import '../styles/PageTitle.css';
import React, { Component } from "react";
 
class ItemsTotal extends Component {
  render() {
    return (
      <div className="items-total-wrapper">
         <h2>{this.props.currentItems}/{this.props.totalItems}</h2>
      </div>
    );
  }
}
 
export default ItemsTotal;