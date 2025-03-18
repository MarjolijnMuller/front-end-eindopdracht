import './StarButton.css';
import React, { useContext, useEffect, useState } from "react";
import { Star } from "@phosphor-icons/react";
import { FavoriteContext } from "../../context/FavoriteContext.jsx";

function StarButton(props) {
    const { favorites, setFavoriteMovies } = useContext(FavoriteContext);
    const [star, setStar] = useState(false);

    useEffect(() => {
        console.log("Favorites:", favorites, "ShowId:", props.showId);
        if(favorites.includes(props.showId)){
            setStar(true);
        }
    }, [favorites, props.showId]);

    function handleClick(event) {
        event.stopPropagation();
        setFavoriteMovies(props.showId);
    }

    return (
        <button
            type="button"
            className="starButton"
            onClick={handleClick}
        >
            <Star size={30} weight={star ? "fill" : "regular"} className="star" />
        </button>
    );
}

export default StarButton;