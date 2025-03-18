import './StarButton.css';
import React, {useContext} from "react";
import {Star} from "@phosphor-icons/react";
import {FavoriteContext} from "../../context/FavoriteContext.jsx";

function StarButton(props) {
    const {setFavoriteMovies} = useContext(FavoriteContext);
    const [star, setStar] = React.useState(false);

    function handleClick() {
        setStar(!star);
        setFavoriteMovies(props.movieId);

    }

    return (
        <button
            type="button"
            className="starButton"
            onClick={handleClick}
        >
            <Star size={30} weight={star ? "fill" : "regular"}
            className="star"/>
        </button>
    )
}

export default StarButton;