import '../styles/HeaderNav.css';
import logo from '../assets/logo.svg';
import userPhoto from '../assets/user-photo.png';
import backgroundPokemon from '../assets/background-pokemon.svg';
import React from 'react';
import { NavLink, Link } from "react-router-dom";


class HeaderNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {mobileExpanded: false}
    }

    toggle() {
        this.setState({mobileExpanded: !this.state.mobileExpanded});
        if(this.state.mobileExpanded) {
            document.body.classList.remove('mobile-nav-expanded');
        } else {
            document.body.classList.add('mobile-nav-expanded');
        }
        
    }

    render() {
        let headerClass = ["header"];

        if(this.state.mobileExpanded) {
            headerClass.push('expanded');
        }

        return (
            <header className={headerClass.join(' ')}>
                <div className='header-content-wrapper'>
                    <Link to="/pokedex"><img className='logo' src={logo} alt='logo'/></Link>
                    
                    <div className="nav-content">
                        <ul className="nav-links">
                            <li><NavLink to="/pokedex">Pokedex</NavLink></li>
                            <li><NavLink to="/party">Party</NavLink></li>
                        </ul>

                        <div className='user-photo'><img src={userPhoto} alt='user profile'/></div>
                    </div>

                    <div className="nav-burger" onClick={this.toggle.bind(this)}>
                        <span className="line line-top"></span>
                        <span className="line line-bottom"></span>
                    </div>
                        
                </div>
                
                <div className="mobile-menu-wrapper">
                    <div className="mobile-menu-content">
                        <div className='user-photo'><img src={userPhoto} alt='user profile'/></div>

                        <ul className="nav-links">
                            <li><NavLink onClick={this.toggle.bind(this)} to="/pokedex">pokedex</NavLink></li>
                            <li><NavLink onClick={this.toggle.bind(this)} to="/party">Party</NavLink></li>
                        </ul>
                        <Link onClick={this.toggle.bind(this)} className='logo-link' to="/"><img className='logo' src={logo} alt='logo'/></Link>
                    </div>
                    <img className='background-image' src={backgroundPokemon} alt='background pokemon asset'/>
                </div>
            </header>
        );
    }
}

export default HeaderNav;