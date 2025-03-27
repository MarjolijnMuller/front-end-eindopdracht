import './Filmpage.css';
import TitleContainer from "../../components/TitleContainer/TitleContainer.jsx";
import Navigation from "../../components/Navigation/Navigation.jsx";
import OuterContainer from "../../components/OuterContainer/OuterContainer.jsx";
import InnerContainer from "../../components/InnerContainer/InnerContainer.jsx";
import StarButton from "../../components/starButton/StarButton.jsx";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import uniqueStreamingService from "../../helpers/uniqueStreamingService.js";
import Footer from "../../components/Footer/Footer.jsx";

function Filmpage() {
    const { id } = useParams();
    const [show, setShow] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, toggleLoading] = useState(false);
    const [streamingServices, setStreamingServices] = useState("");
    const [isMounted, setIsMounted] = useState(true);

    useEffect(() => {
        async function fetchOneShow() {
            if (!isMounted) return;
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
                if (isMounted) {
                    setShow(result.data);
                    setStreamingServices(result.data.streamingOptions.nl);
                    toggleLoading(false);
                }
            } catch (error) {
                if (isMounted) {
                    console.error(error);
                    setErrorMessage("Er is iets misgegaan. Probeer het opnieuw!");
                    toggleLoading(false);
                }
            }
        }

        fetchOneShow();

        return () => {
            setIsMounted(false);
        };
    }, [id, isMounted]);

    const uniqueServices = uniqueStreamingService(streamingServices);

    return (
        <>
            <Navigation />
            <main>
            {loading && <p>Laden...</p>}
            {errorMessage && <p>{errorMessage}</p>}
            {show && Object.keys(show).length > 0 && (
                <>
                    <TitleContainer title={show.originalTitle} />

                    <OuterContainer>
                        <InnerContainer>
                            <img src={show.imageSet.verticalPoster.w360} className="movieImage" alt={show.originalTitle} />

                            <div className="allMovieInfo">
                                <div className="movieStats">
                                    <p>{show.runtime} minutes | Year of release: {show.releaseYear}</p>
                                    <p>Average rating: {show.rating}/100</p>
                                    <StarButton showId={show.id} />
                                </div>

                                <p>{show.overview}</p>

                                <div className="movieInfo">
                                    <div className="directorsCastStreaming">
                                        <h4>Directors:</h4>
                                        {show.directors.map((director) => (
                                            <li key={director} className="director">{director}</li>
                                        ))}
                                    </div>
                                    <div className="directorsCastStreaming">
                                        <h4>Cast:</h4>
                                        {show.cast.map((cast) => (
                                            <li key={cast} className="castMember">{cast}</li>
                                        ))}
                                    </div>
                                    <div className="directorsCastStreaming">
                                        <h4>Services:</h4>
                                        {uniqueServices.map((serviceName) => (
                                            <li key={serviceName} className="streamingService">
                                                <p>{serviceName}</p>
                                            </li>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </InnerContainer>
                    </OuterContainer>
                </>
            )}
            </main>
            <Footer/>
        </>
    );

}

export default Filmpage;