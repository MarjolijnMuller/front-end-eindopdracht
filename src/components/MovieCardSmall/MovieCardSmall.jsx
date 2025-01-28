import './MovieCardSmall.css';
import React from "react";
import StarButton from "../starButton/StarButton.jsx";

function MovieCardSmall(props) {
    return (
        <div className="movieCardSmall">
            <img src={props.image} className="moviePosterSmall"/>
            <div className="wrapperMovieCardSmall">
            <p>{props.service}</p>
            <StarButton/>
            </div>
        </div>
    )
}

export default MovieCardSmall;