import React from 'react';
import './Button.css';
import {useNavigate} from "react-router-dom";

function Button(props) {
    let navigate = useNavigate();

    const handleClick = () => {
        if(props.onClick){
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


    };

    return (
        <button
            type={props.type}
            className={props.className}
            onClick={handleClick}
            disabled={props.disabled}
        >
            {props.name}
        </button>
    )
}

export default Button;