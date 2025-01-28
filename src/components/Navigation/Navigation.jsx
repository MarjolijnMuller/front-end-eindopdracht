import React from 'react';
import './Navigation.css';
import {NavLink} from "react-router-dom";
import Button from "../Button/Button.jsx";
import {House, MagnifyingGlass, Star, UserCircle} from "@phosphor-icons/react";

function Navigation(props) {

    return (
        <>
            <nav>
                <ul className="navList">
                    <li className="navItem">
                        <NavLink className={({isActive}) => isActive === true ? 'active-link' : 'default-link'}
                                 to="/">
                            <House size={20}/>
                            Home
                        </NavLink>
                    </li>
                    {!props.disabled &&
                        <>
                            <li className="navItem">
                                <NavLink className={({isActive}) => isActive === true ? 'active-link' : 'default-link'}
                                         to="/search">
                                    <MagnifyingGlass size={20}/>
                                    Zoeken
                                </NavLink>
                            </li>
                            <li className="navItem">
                                <NavLink className={({isActive}) => isActive === true ? 'active-link' : 'default-link'}
                                         to="/favorite">
                                    <Star size={20}/>
                                    Mijn favorieten
                                </NavLink>
                            </li>
                            <li className="navItem">
                                <NavLink className={({isActive}) => isActive === true ? 'active-link' : 'default-link'}
                                         to="/account">
                                    <UserCircle size={20}/>
                                    Account</NavLink>
                            </li>
                        </>}
                </ul>
                <Button
                    type={"button"}
                    name={"Inloggen"}
                    className={'logInNavigation'}
                    navigate={Navigation}
                    disabled={false}/>
            </nav>
        </>
    )
}

export default Navigation;