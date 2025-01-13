import React from 'react';
import './Navigation.css';
import {NavLink, useNavigate} from "react-router-dom";
import Button from "../Button/Button.jsx";

function Navigation() {
    const navigate = useNavigate();

    function navigation(){
        navigate('/inloggen');
    }

    return (
        <>
            <nav>
                <ul className="navList">
                    <li className="navItem">
                        <NavLink className={({isActive}) => isActive===true? 'active-link' : 'default-link'}
                                 to="/">
                            Home
                        </NavLink>
                    </li>
                    <li className="navItem">
                        <NavLink className={({isActive}) => isActive===true? 'active-link' : 'default-link'}
                                 to="/search">
                            Zoeken
                        </NavLink>
                    </li>
                    <li className="navItem">
                        <NavLink className={({isActive}) => isActive===true? 'active-link' : 'default-link'}
                                 to="/favorite">
                            Mijn favorieten
                        </NavLink>
                    </li>
                    <li className="navItem">
                        <NavLink className={({isActive}) => isActive===true? 'active-link' : 'default-link'}
                                 to="/account">
                            Account</NavLink>
                    </li>
                </ul>
                <Button
                    type={"button"}
                    name={"Inloggen"}
                    className={"logInNavigation"}
                    onClick={Navigation} />
            </nav>
        </>
    )
}

export default Navigation;