import '../styles/Card.css';
import defaultImg from '../assets/card-pokeball.svg';
import React, { Component } from "react";

import pokemonImg from '../assets/test--pokemon.png';
 
class Card extends Component {
  render() {

    if(this.props.hasData) {
        return (
            <div className="single-card-wrapper">
              <div className="card">
                  <div className="image-wrapper">
                    <img className='poke-image' src={pokemonImg} alt='testing'/>
                  </div>

                  <div className="poke-id">#001</div>
                  <h3>title</h3>

                  <div className="types">
                      <span class="type grass">Grass</span>
                      <span class="type poison">Poison</span>
                  </div>

                  <p>added to party X times</p>
              </div>
            </div>
          );

    } else {
        return (
            <div className="single-card-wrapper">
              <div className="card">
                  <img className='default-image' src={defaultImg} alt='no pokemon'/>
              </div>
            </div>
          );
    }
   
  }
}
 
export default Card;