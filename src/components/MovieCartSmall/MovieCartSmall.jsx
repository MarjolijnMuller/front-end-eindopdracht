import './MovieCartSmall.css';
import React from "react";
import {Image} from "@phosphor-icons/react";
import StarButton from "../starButton/StarButton.jsx";

function MovieCartSmall() {
    return (
        <div className="movieCartSmall">
            <Image size={132} className="imageIcon"/>
            <div className="wrapperMovieCartSmall">
            <p>streamingdienst</p>
            <StarButton/>
            </div>
        </div>
    )
}

export default MovieCartSmall;