import React from 'react';
import '../styles/HeaderNav.css';
import logo from '../assets/logo.svg';
import userPhoto from '../assets/user-photo.png';
import { NavLink, Link } from "react-router-dom";

class HeaderNav extends React.Component {
    render() {
        return (
            <header>
                <div className='header-content-wrapper'>
                    <Link to="/"><img className='logo' src={logo} alt='logo'/></Link>
                    
                    <div className="nav-content">
                        <ul className="nav-links">
                            <li><NavLink to="/pokedex">pokedex</NavLink></li>
                            <li><NavLink to="/party">Party</NavLink></li>
                        </ul>

                        <div className='user-photo'><img src={userPhoto} alt='user profile'/></div>
                    </div>
                        
                </div>
            </header>
        );
    }
}

export default HeaderNav;