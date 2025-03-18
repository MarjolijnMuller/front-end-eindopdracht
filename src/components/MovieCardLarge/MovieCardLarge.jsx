import './MovieCardLarge.css';
import React, {useContext} from "react";
import StarButton from "../starButton/StarButton.jsx";
import {ServiceContext} from "../../context/ServiceContext.jsx";

function MovieCardLarge(props) {
    const {selectedServices} = useContext(ServiceContext);
    const movieServices = props.service;

    const selectedService = movieServices.find(serviceAvailability =>
        selectedServices.includes(serviceAvailability.service.id));

    return (
        <div className="movieCartLarge">
            <img src={props.image} className="moviePosterLarge"/>

            <div className="wrapperMovieCart">
                <h3>{props.title}</h3>
                <p className="movieInfo">{props.information}</p>

                <div className="innerWrapperMovieCart">
                    {selectedService && (
                        <p>{selectedService.service.name}</p>
                    )}
                    <p>{props.rating}/100</p>
                    <StarButton/>
                    movieId={props.showId}
                </div>
            </div>
        </div>
    )
}

export default MovieCardLarge;