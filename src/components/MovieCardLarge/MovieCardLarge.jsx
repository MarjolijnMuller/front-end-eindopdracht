import './MovieCardLarge.css';
import React from "react";
import StarButton from "../starButton/StarButton.jsx";

function MovieCardLarge(props) {
    return (
        <div className="movieCartLarge">
            <img src={props.image} className="moviePosterLarge"/>

            <div className="wrapperMovieCart">
                <h3>{props.title}</h3>
                <p>{props.information}</p>

                <div className="innerWrapperMovieCart">
                    <p>{props.service}</p>
                    <p>{props.rating}/100</p>
                    <StarButton/>
                </div>
            </div>
        </div>
    )
}

export default MovieCardLarge;