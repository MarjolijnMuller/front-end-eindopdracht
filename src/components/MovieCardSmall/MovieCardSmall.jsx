import './MovieCardSmall.css';
import React, {useContext} from "react";
import StarButton from "../starButton/StarButton.jsx";
import {ServiceContext} from "../../context/ServiceContext.jsx";
import {Link} from "react-router-dom";

function MovieCardSmall(props) {
    const {selectedServices} = useContext(ServiceContext);
    const movieServices = props.service;

    const selectedService = movieServices.find(serviceAvailability =>
        selectedServices.includes(serviceAvailability.service.id));

    return (
        <div className="movieCardSmall">
            <Link to={`/filmserie/${props.showId}`}>
            <img src={props.image} className="moviePosterSmall"/>
            </Link>
            <div className="wrapperMovieCardSmall">
                {selectedService && (
                    <p>{selectedService.service.name}</p>
                )}
                <StarButton
                showId={props.showId}/>
            </div>
        </div>
    )
}

export default MovieCardSmall;