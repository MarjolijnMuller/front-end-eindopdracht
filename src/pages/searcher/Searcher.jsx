import './Searcher.css';
import Navigation from "../../components/Navigation/Navigation.jsx";
import TitleContainer from "../../components/TitleContainer/TitleContainer.jsx";
import OuterContainer from "../../components/OuterContainer/OuterContainer.jsx";
import axios from "axios";
import {useContext, useEffect, useState} from "react";
import Button from "../../components/Button/Button.jsx";
import InnerContainer from "../../components/InnerContainer/InnerContainer.jsx";
import ToggleSwitch from "../../components/ToggleSwitch/ToggleSwitch.jsx";
import MovieCardSmall from "../../components/MovieCardSmall/MovieCardSmall.jsx";
import {Link} from "react-router-dom";
import {MovieContext} from "../../context/MovieContext.jsx";
import {ViewContext} from "../../context/ViewContext.jsx";
import MovieCardLarge from "../../components/MovieCardLarge/MovieCardLarge.jsx";
import {GenreContext} from "../../context/GenreContext.jsx";
import {ServiceContext} from "../../context/ServiceContext.jsx";
import Footer from "../../components/Footer/Footer.jsx";

function Searcher() {
    const [dutchServices, setDutchServices] = useState([]);
    const [genres, setGenres] = useState([]);
    const [shows, setShows] = useState([]);
    const [allShows, setAllShows] = useState([]);
    const [loadingServices, setLoadingServices] = useState(false);
    const [loadingGenres, setLoadingGenres] = useState(false);
    const [serviceError, toggleServiceError] = useState(false);
    const [genreError, toggleGenreError] = useState(false);
    const [showError, toggleShowError] = useState(false);
    const [hasSearched, togglehasSearched] = useState(false);
    const [initialLoad, toggleInitialLoad] = useState(true);
    const [nextShows, setNextShows] = useState("");
    const [keyword, setKeyword] = useState("");

    const {isMovie} = useContext(MovieContext);
    const {viewTiles} = useContext(ViewContext);
    const {selectedGenres} = useContext(GenreContext);
    const {selectedServices, services} = useContext(ServiceContext);

    const handleServiceChange = (serviceId) => {
        services(serviceId);
    };

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        async function getDutchServices() {
            setLoadingServices(true);
            toggleServiceError(false);
            togglehasSearched(false);
            try {
                const result = await axios.get('https://streaming-availability.p.rapidapi.com/countries', {
                    params: {
                        output_language: 'en'
                    },
                    headers: {
                        'x-rapidapi-key': import.meta.env.X_RAPIDAPI_KEY,
                        'x-rapidapi-host': 'streaming-availability.p.rapidapi.com'
                    },
                    signal: signal,
                });
                setLoadingServices(false);
                setDutchServices(result.data.nl.services);
            } catch (error) {
                if (axios.isCancel(error)) {
                    console.error('Verzoek geannuleerd', error.message);
                } else {
                    console.error(error);
                    toggleServiceError(true);
                    setLoadingServices(false);
                }
            }
        }

        async function getGenres() {
            setLoadingGenres(true);
            toggleGenreError(false);
            try {
                const result = await axios.get('https://streaming-availability.p.rapidapi.com/genres', {
                    params: {
                        output_language: 'en',
                        country: 'nl',
                    },
                    headers: {
                        'x-rapidapi-key': import.meta.env.X_RAPIDAPI_KEY,
                        'x-rapidapi-host': 'streaming-availability.p.rapidapi.com'
                    },
                    signal: signal,
                });
                setLoadingGenres(false);
                setGenres(result.data);
            } catch (error) {
                if (axios.isCancel(error)) {
                    console.error('Verzoek geannuleerd', error.message);
                } else {
                    console.error(error);
                    toggleGenreError(true);
                    setLoadingGenres(false);
                }
            }
        }

        getDutchServices();
        getGenres();

        return () => {
            abortController.abort();
        };
    }, []);

    async function fetchShows() {
        togglehasSearched(false);
        toggleShowError(false);
        setShows([]);
        setAllShows([]);
        try {
            togglehasSearched(true);
            const result = await axios.get('https://streaming-availability.p.rapidapi.com/shows/search/filters', {
                params: {
                    series_granularity: 'episode',
                    country: "nl",
                    catalogs: `${selectedServices}`,
                    genres: `${selectedGenres}`,
                    show_type: `${isMovie}`,
                    order_by: "rating",
                    keyword: `${keyword}`,
                },
                headers: {
                    'x-rapidapi-key': import.meta.env.X_RAPIDAPI_KEY,
                    'x-rapidapi-host': 'streaming-availability.p.rapidapi.com'
                }
            });
            setShows(result.data.shows);
            if (result.data && result.data.shows) {
                if (nextShows) {
                    setAllShows(prevShows => [...prevShows, ...result.data.shows]);
                } else {
                    setAllShows(result.data.shows);
                }

                if (result.data.hasMore) {
                    setNextShows(result.data.nextCursor);
                } else {
                    setNextShows(null);
                }
            } else {
                console.error("Ongeldige data ontvangen van API:", result.data);
                toggleShowError(true);
                setAllShows([]);
            }
        } catch (error) {
            console.error(error);
            toggleShowError(true);
            setAllShows([]);
        } finally {
            toggleInitialLoad(false);
        }
    }

    async function fetchNextShows() {
        togglehasSearched(false);
        toggleShowError(false);
        try {
            togglehasSearched(true);
            const result = await axios.get('https://streaming-availability.p.rapidapi.com/shows/search/filters', {
                params: {
                    series_granularity: 'episode',
                    country: "nl",
                    catalogs: `${selectedServices}`,
                    genres: `${selectedGenres}`,
                    show_type: `${isMovie}`,
                    cursor: `${nextShows}`,
                    order_by: "rating",
                    keyword: `${keyword}`,
                },
                headers: {
                    'x-rapidapi-key': import.meta.env.X_RAPIDAPI_KEY,
                    'x-rapidapi-host': 'streaming-availability.p.rapidapi.com'
                }
            });
            setShows(result.data.shows);
            if (result.data && result.data.shows) {
                if (nextShows) {
                    setAllShows(prevShows => [...prevShows, ...result.data.shows]);
                } else {
                    setAllShows(result.data.shows);
                }

                if (result.data.hasMore) {
                    setNextShows(result.data.nextCursor);
                } else {
                    setNextShows(null);
                }
            } else {
                console.error("Ongeldige data ontvangen van API:", result.data);
                toggleShowError(true);
                setAllShows([]);
            }
        } catch (error) {
            console.error(error);
            toggleShowError(true);
            setAllShows([]);
        } finally {
            toggleInitialLoad(false);
        }
    }

    function handleChange(e) {
        setKeyword(e.target.value);
    }

    return (
        <>
            <Navigation/>
            <main>
                <TitleContainer title='Zoeken'/>

                <OuterContainer>

                    <InnerContainer>
                        <ToggleSwitch
                            className={"toggleSwitchMovie"}
                            firstTerm={"Films"}
                            secondTerm={"Series"}
                        />
                    </InnerContainer>
                    <h2>Streamingdiensten</h2>
                    <InnerContainer>
                        {loadingServices && <p>Laden...</p>}
                        {serviceError && <p className="error">Er is iets fout gegaan. Probeer het opnieuw!</p>}
                        {!loadingServices && !serviceError && (
                            <>
                                {dutchServices.map((service) => (
                                <label className="service" key={service.id}>
                                    <input
                                        type="checkbox"
                                        className="checkboxService"
                                        checked={selectedServices.includes(service.id)}
                                        onChange={() => handleServiceChange(service.id)}
                                    />
                                    <p>{service.name}</p>
                                </label>
                            ))}</>
                    )
                    }
                </InnerContainer>
                <h2>Genres</h2>
                <InnerContainer>
                    {loadingGenres && <p>Laden...</p>}
                    {genreError && <p className="error">Oeps... Er ging iets mis. Probeer het opnieuw!</p>}
                    {!loadingGenres && !genreError && (
                        <ul className="allGenreButtons">
                    {genres.map((genre) => {
                        return (
                        <Button key={genre.id}
                    type={"button"}
                    className={"genreButton"}
                    name={genre.name}
                    id={genre.id}/>
                )
                })}
            </ul>
            )
            }
        </InnerContainer>
    <InnerContainer>
        <label
            htmlFor="inputKeyword"
            id="keyword">
            Keyword:
            <input
                type="text"
                id="inputKeyword"
                name="inputKeyword"
                onChange={handleChange}
            />
        </label>


        <button type="button" className="searchButton" onClick={fetchShows}>
            Zoeken
        </button>
    </InnerContainer>
</OuterContainer>

    <OuterContainer>
        <ToggleSwitch
            className={"toggleSwitchView"}/>

        <InnerContainer>
                    {showError && <p className="error">Oeps... Er ging iets mis. Probeer het opnieuw!</p>}
                    {hasSearched ? (
                        initialLoad ? <p>Laden...</p> :
                            allShows.length > 0 ? (
                                <ul className="movieCards">
                                    {allShows.map((show) => {
                                        if (show.streamingOptions && show.streamingOptions.nl && show.streamingOptions.nl.length > 0) {

                                            return (
                                                <div key={show.id}>

                                                        {viewTiles ?
                                                            <MovieCardSmall
                                                                key={show.id}
                                                                image={show.imageSet.verticalPoster.w240}
                                                                service={show.streamingOptions.nl}
                                                                showId={show.id}
                                                                imdbId={show.imdbId}
                                                            /> :
                                                            <MovieCardLarge
                                                                key={show.id}
                                                                image={show.imageSet.verticalPoster.w240}
                                                                title={show.originalTitle}
                                                                information={show.overview}
                                                                rating={show.rating}
                                                                service={show.streamingOptions.nl}
                                                                showId={show.id}
                                                                imdbId={show.imdbId}
                                                            />
                                                        }

                                                </div>
                                            );
                                        } else {
                                            return (
                                                <div key={show.id}>
                                                    <Link to={`/filmserie/${show.id}`}>
                                                        {viewTiles ?
                                                            <MovieCardSmall
                                                                showId={show.id}
                                                                image={show.imageSet.verticalPoster.w240}
                                                                imdbId={show.imdbId}
                                                            /> :
                                                            <MovieCardLarge
                                                                showId={show.id}
                                                                image={show.imageSet.verticalPoster.w240}
                                                                imdbId={show.imdbId}
                                                            />
                                                        }
                                                    </Link>
                                                </div>
                                            );
                                        }
                                    })}
                                </ul>
                            ) : <p>Er zijn geen shows gevonden</p>
                    ) : <p>Zoek je favoriete shows!</p>}
                </InnerContainer>
                {nextShows && (
                    <InnerContainer classNameAdd="center">
                        <button className={"searchButton moreShows"} onClick={fetchNextShows}>Meer shows!</button>
                    </InnerContainer>
                )}
            </OuterContainer>
            </main>
            <Footer/>
        </>
    )

}

export default Searcher;
