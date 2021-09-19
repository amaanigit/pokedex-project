import '../styles/PageButton.css';
import arrow from '../assets/white-arrow-right.svg';
import React, { Component } from "react";
import { Link } from "react-router-dom";
 
class PageButton extends Component {
  render() {
    return (
      <div className="page-button-wrapper">
         <Link className="page-button" to={this.props.link}><span className='text'>{this.props.text}</span><img className='arrow' src={arrow} alt='arrow right'/></Link>
      </div>
    );
  }
}
 
export default PageButton;