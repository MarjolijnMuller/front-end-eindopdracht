import React from 'react';
import './NavInlogButton.css';
import {useNavigate} from "react-router-dom";

function Button(props) {
    let navigate = useNavigate();


    const handleClick = () => {
                    console.log('Navigating to /inloggen');
                    navigate('/inloggen');
    };

    return (
        <button
            type={props.type}
            className={props.className}
            onClick={handleClick}
        >
            {props.name}
        </button>
    )
}

export default Button;