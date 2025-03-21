import './Filmpage.css';
import TitleContainer from "../../components/TitleContainer/TitleContainer.jsx";
import Navigation from "../../components/Navigation/Navigation.jsx";
import OuterContainer from "../../components/OuterContainer/OuterContainer.jsx";
import InnerContainer from "../../components/InnerContainer/InnerContainer.jsx";
import StarButton from "../../components/starButton/StarButton.jsx";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import uniqueStreamingService from "../../helpers/uniqueStreamingService.js";

function Filmpage() {
    const {id} = useParams();
    const [show, setShow] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, toggleLoading] = useState(false);
    const navigate = useNavigate();
    const [streamingServices, setStreamingServices] = useState("");


    useEffect(() => {
        async function fetchOneShow() {
            toggleLoading(true);
            setErrorMessage("");
            try {
                const result = await axios.get(`https://streaming-availability.p.rapidapi.com/shows/${id}`, {
                    params: {
                        output_language: 'en',
                    },
                    headers: {
                        'x-rapidapi-key': import.meta.env.X_RAPIDAPI_KEY,
                        'x-rapidapi-host': 'streaming-availability.p.rapidapi.com'
                    }
                });
                console.log(result.data);
                setShow(result.data);
                setStreamingServices(result.data.streamingOptions.nl);
                console.log(result.data.streamingOptions.nl);
                toggleLoading(false);
            } catch (error) {
                console.log(error);
                setErrorMessage("Er is iets misgegaan. Probeer het opnieuw!");
            }
        }

        fetchOneShow();
    }, [])

    const uniqueServices = uniqueStreamingService(streamingServices)

    return (
        <>
            <Navigation/>
            {Object.keys(show).length === 0 ? <>
                    <p>Loading...</p>
                </> :
                <>
                <TitleContainer title={show.originalTitle}/>

                <OuterContainer>
                    <InnerContainer>
                        <img src={show.imageSet.verticalPoster.w360} className="movieImage"/>

                        <div className="allMovieInfo">
                            <div className="movieStats">
                                <p>{show.runtime} minutes | Year of release: {show.releaseYear}</p>
                                <p>Average rating: {show.rating}/100</p>
                                <StarButton
                                showId={show.id}/>
                            </div>

                            <p>{show.overview}</p>

                            <div className="movieInfo">
                                <div className="directorsCastStreaming">
                                    <h4>Directors:</h4>
                                    {show.directors.map((director) => {
                                            return (
                                                <li key={director} className="director">{director}</li>
                                            )
                                        }
                                    )}
                                </div>
                                <div className="directorsCastStreaming">
                                    <h4>Cast:</h4>
                                    {show.cast.map((cast) => {
                                            return (
                                                <li key={cast} className="castMember">{cast}</li>
                                            )
                                        }
                                    )}
                                </div>
                                <div className="directorsCastStreaming">
                                    <h4>Services:</h4>
                                    {uniqueServices.map((serviceName) => <li
                                        key={serviceName} className="streamingService">
                                        <p>{serviceName}</p>
                                    </li>)}
                                        {/*{show.streamingOptions.nl.map((streamingOption) => {
                                            return (
                                                <li key={streamingOption.service.id} className="streamingService">
                                                    <p>{streamingOption.service.name} - </p>
                                                    <Link to={streamingOption.link}>Watch this movie now!</Link>
                                                </li>
                                            )
                                        }
                                    )}*/}
                                    </div>
                                        </div>
                                        </div>

                                        </InnerContainer>
                                        </OuterContainer>
                                        </>
                                    }
        </>
    )
}

export default Filmpage;