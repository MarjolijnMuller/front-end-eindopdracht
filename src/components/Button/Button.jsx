import React, { useContext, useState, useEffect } from 'react';
import './Button.css';
import { useNavigate } from "react-router-dom";
import { GenreContext } from "../../context/GenreContext.jsx";
import { AuthContext } from "../../context/AuthContext.jsx";

function Button(props) {
    let navigate = useNavigate();
    const { genres, selectedGenres } = useContext(GenreContext);
    const [isClicked, setIsClicked] = useState(false);
    const { logout } = useContext(AuthContext);

    useEffect(() => {
        if (props.className === "genreButton" && selectedGenres.includes(props.id)) {
            setIsClicked(true);
        } else {
            setIsClicked(false);
        }
    }, [props.id, selectedGenres, props.className]);

    const handleClick = () => {
        if (props.navigate) {
            switch (props.className) {
                case 'AnnuleerButton':
                    navigate('/');
                    break;
                case 'signInHome':
                    navigate('/aanmelden');
                    break;
                default:
                    break;
            }
        }
        if (props.className === "logOutNavigation") {
            logout();
        }
        if (props.className === "genreButton") {
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
    );
}

export default Button;