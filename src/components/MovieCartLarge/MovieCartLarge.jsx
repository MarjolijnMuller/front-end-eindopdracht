import './MovieCartLarge.css';
import React from "react";
import {Image, Star} from "@phosphor-icons/react";
import Button from "../Button/Button.jsx";
import StarButton from "../starButton/StarButton.jsx";

function MovieCartLarge() {
    return (
        <div className="movieCartLarge">
            <Image size={500} className="imageIcon"/>
            <div className="wrapperMovieCart">
            <h3>Titel</h3>
            <p>Informatie film - Lorem ipsum dolor sit amet consectetur. Potenti tempor consequat erat quis fermentum eu. Est eu phasellus semper sit iaculis aliquet egestas. In duis amet viverra elementum malesuada vitae. Vitae at feugiat eleifend sapien lorem eget vel amet.</p>
            <div className="innerWrapperMovieCart">
                <p>streamingdienst</p>
            <p>IMBD-score</p>
                <StarButton/>

            </div>
            </div>
        </div>
    )
}

export default MovieCartLarge;