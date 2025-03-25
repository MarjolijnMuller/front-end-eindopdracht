import React from 'react';
import './Footer.css';
import { NavLink } from "react-router-dom";

function Footer() {
    return (
        <footer>
            <ul className="footerList">
                <li className="footerItem">
                    <NavLink className={({ isActive }) => isActive === true ? 'active-link' : 'default-link'}
                             to="/">
                        Home
                    </NavLink>
                </li>
                <li className="footerItem">
                    <NavLink className={({ isActive }) => isActive === true ? 'active-link' : 'default-link'}
                             to="/zoeken">
                        Zoeken
                    </NavLink>
                </li>
                <li className="footerItem">
                    <NavLink className={({ isActive }) => isActive === true ? 'active-link' : 'default-link'}
                             to="/favorieten">
                        Mijn favorieten
                    </NavLink>
                </li>
                <li className="footerItem">
                    <NavLink className={({ isActive }) => isActive === true ? 'active-link' : 'default-link'}
                             to="/account">
                        Account
                    </NavLink>
                </li>
            </ul>
        </footer>
    );
}

export default Footer;