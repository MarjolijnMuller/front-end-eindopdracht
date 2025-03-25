import './MovieCardLarge.css';
import React, {useContext} from "react";
import StarButton from "../starButton/StarButton.jsx";
import {ServiceContext} from "../../context/ServiceContext.jsx";
import {Link} from "react-router-dom";

function MovieCardLarge(props) {
    const {selectedServices} = useContext(ServiceContext);
    const movieServices = props.service;

    const selectedService = movieServices.find(serviceAvailability =>
        selectedServices.includes(serviceAvailability.service.id));

    return (
        <div className="movieCartLarge">
            <Link to={`/filmserie/${props.showId}`}>
            <img src={props.image} className="moviePosterLarge"/>
            </Link>
            <div className="wrapperMovieCart">
                <h3>{props.title}</h3>
                <p className="movieInfo">{props.information}</p>

                <div className="innerWrapperMovieCart">
                    {selectedService && (
                        <p>{selectedService.service.name}</p>
                    )}
                    <p>{props.rating}/100</p>
                    <StarButton showId={props.imdbId}/>

                </div>
            </div>
        </div>
    )
}

export default MovieCardLarge;