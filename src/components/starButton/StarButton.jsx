import './StarButton.css';
import React, {useContext} from "react";
import {Star} from "@phosphor-icons/react";
import {FavoriteContext} from "../../context/FavoriteContext.jsx";

function StarButton(props) {
    const {setFavoriteMovies} = useContext(FavoriteContext);
    const [star, setStar] = React.useState(false);

    function handleClick(event) {
        event.stopPropagation();
        setStar(!star);
        setFavoriteMovies(props.showId);
        console.log("movieId: " + props.showId);

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