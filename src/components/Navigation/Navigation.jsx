import React, {useContext} from 'react';
import './Navigation.css';
import {NavLink} from "react-router-dom";
import Button from "../Button/Button.jsx";
import {House, MagnifyingGlass, Star, UserCircle} from "@phosphor-icons/react";
import {AuthContext} from "../../context/AuthContext.jsx";
import NavInlogButton from "../Button/NavInlogButton/NavInlogButton.jsx";

function Navigation(props) {
    const {authorized} = useContext(AuthContext);

    return (
        <>
            <header>
                <nav>
                    <ul className="navList">
                        <li className="navItem">
                            <NavLink className={({isActive}) => isActive === true ? 'active-link' : 'default-link'}
                                     to="/">
                                <House size={20}/>
                                Home
                            </NavLink>
                        </li>
                        <li className="navItem">
                            <NavLink className={({isActive}) => isActive === true ? 'active-link' : 'default-link'}
                                     to="/zoeken">
                                <MagnifyingGlass size={20}/>
                                Zoeken
                            </NavLink>
                        </li>
                        <li className="navItem">
                            <NavLink className={({isActive}) => isActive === true ? 'active-link' : 'default-link'}
                                     to="/favorieten">
                                <Star size={20}/>
                                Mijn favorieten
                            </NavLink>
                        </li>
                        <li className="navItem">
                            <NavLink className={({isActive}) => isActive === true ? 'active-link' : 'default-link'}
                                     to="/account">
                                <UserCircle size={20}/>
                                Account
                            </NavLink>
                        </li>
                    </ul>

                    {!authorized ?
                        <NavInlogButton
                            type={"button"}
                            name={"Inloggen"}
                            className={'logInNavigation'}
                        /> :
                        <Button
                            type={"button"}
                            name={"Uitloggen"}
                            className={'logOutNavigation'}
                        />
                    }

                </nav>
            </header>
        </>
    );
}

export default Navigation;