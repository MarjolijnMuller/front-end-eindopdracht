import React, {useContext, useState} from 'react';
import './Button.css';
import {useNavigate} from "react-router-dom";
import {GenreContext} from "../../context/GenreContext.jsx";
import {AuthContext} from "../../context/AuthContext.jsx";

function Button(props) {
    let navigate = useNavigate();
    const {genres}= useContext(GenreContext);
    const [isClicked, setIsClicked] = useState(false);
    const { logout } = useContext(AuthContext);


    const handleClick = () => {
        if(props.navigate){
            switch (props.className) {
                case 'logInNavigation':
                    console.log('Navigating to /inloggen');
                    navigate('/inloggen');
                    break;
                case 'signInHome':
                    console.log('Navigating to /aanmelden');
                    navigate('/aanmelden');
                    break;
            }
        }
        if (props.className === "logOutNavigation") {
            console.log('Log uit');
            logout();
        }
        if(props.className === "genreButton") {
            genres(props.id);
            setIsClicked(!isClicked);
        }


    };

    return (
        <button
            type={props.type}
            className={`${props.className} ${isClicked ? 'clicked' : ''}`}
            onClick={handleClick}
        >
            {props.name}
        </button>
    )
}

export default Button;