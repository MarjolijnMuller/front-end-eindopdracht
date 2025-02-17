import './MovieCardSmall.css';
import React, {useContext} from "react";
import StarButton from "../starButton/StarButton.jsx";
import {ServiceContext} from "../../context/ServiceContext.jsx";

function MovieCardSmall(props) {
    const {selectedServices} = useContext(ServiceContext);
    const movieServices = props.service;

    const selectedService = movieServices.find(serviceAvailability =>
        selectedServices.includes(serviceAvailability.service.id));

    return (
        <div className="movieCardSmall">
            <img src={props.image} className="moviePosterSmall"/>
            <div className="wrapperMovieCardSmall">
                {selectedService && (
                    <p>{selectedService.service.name}</p>
                )}
                <StarButton/>
            </div>
        </div>
    )
}

export default MovieCardSmall;