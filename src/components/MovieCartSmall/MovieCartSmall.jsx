import './MovieCartSmall.css';
import React from "react";
import StarButton from "../starButton/StarButton.jsx";

function MovieCartSmall(props) {
    return (
        <div className="movieCartSmall">
            <img src={props.image} className="moviePosterSmall"/>
            <div className="wrapperMovieCartSmall">
            <p>{props.service}</p>
            <StarButton/>
            </div>
        </div>
    )
}

export default MovieCartSmall;