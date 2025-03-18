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

function Searcher() {
    const [dutchServices, setDutchServices] = useState([]);
    const [genres, setGenres] = useState([]);
    const [shows, setShows] = useState([]);
    const [allShows, setAllShows] = useState([]);
    const [loading, toggleLoading] = useState(false)
    const [serviceError, toggleServiceError] = useState(false);
    const [genreError, toggleGenreError] = useState(false);
    const [showError, toggleShowError] = useState(false);
    const [hasSearched, togglehasSearched] = useState(false)
    const [initialLoad, toggleInitialLoad] = useState(true);
    const [nextShows, setNextShows] = useState("");
    const [keyword, setKeyword] = useState("");

    const {isMovie} = useContext(MovieContext);
    const {viewTiles} = useContext(ViewContext);
    const {selectedGenres} = useContext(GenreContext);
    const {selectedServices, services} = useContext(ServiceContext);


    useEffect(() => {
        async function getDutchServices() {
            toggleLoading(true);
            toggleServiceError(false);
            togglehasSearched(false);
            try {
                const result = await axios.get('https://streaming-availability.p.rapidapi.com/countries', {
                    params: {
                        output_language: 'en'
                    },
                    headers: {
                        'x-rapidapi-key': '5b9c13ca93msh7d7c427331406c1p13d79fjsne76971a64dcc',
                        'x-rapidapi-host': 'streaming-availability.p.rapidapi.com'
                    }
                });
                toggleLoading(false);
                console.log(result.data.nl.services);
                setDutchServices(result.data.nl.services);
            } catch (error) {
                console.error(error);
                toggleServiceError(true);
            }
        }

        async function getGenres() {
            toggleLoading(true);
            toggleGenreError(false);
            try {
                const result = await axios.get('https://streaming-availability.p.rapidapi.com/genres', {
                    params: {
                        output_language: 'en',
                        country: 'nl',
                    },
                    headers: {
                        'x-rapidapi-key': '5b9c13ca93msh7d7c427331406c1p13d79fjsne76971a64dcc',
                        'x-rapidapi-host': 'streaming-availability.p.rapidapi.com'
                    }
                });
                toggleLoading(false);
                console.log(result.data);
                setGenres(result.data);
            } catch (error) {
                console.error(error);
                toggleGenreError(true);
            }
        }

        getDutchServices()
        getGenres()
    }, []);


    async function fetchShows() {
        togglehasSearched(false);
        toggleShowError(false);
        setShows([]);
        setAllShows([]);
        console.log("keyword" + keyword);
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
                    'x-rapidapi-key': '5b9c13ca93msh7d7c427331406c1p13d79fjsne76971a64dcc',
                    'x-rapidapi-host': 'streaming-availability.p.rapidapi.com'
                }
            });
            console.log(result.data);
            setShows(result.data.shows);
            if (result.data && result.data.shows) {
                if (nextShows) {
                    // Append new shows to existing shows
                    setAllShows(prevShows => [...prevShows, ...result.data.shows]); //Update shows state
                } else {
                    // Initial fetch, replace existing shows
                    setAllShows(result.data.shows); //Update shows state
                }

                if (result.data.hasMore) {
                    setNextShows(result.data.nextCursor);
                } else {
                    setNextShows(null); // No more shows to load
                }
            } else {
                console.error("Invalid data received from API:", result.data);
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
                    'x-rapidapi-key': '5b9c13ca93msh7d7c427331406c1p13d79fjsne76971a64dcc',
                    'x-rapidapi-host': 'streaming-availability.p.rapidapi.com'
                }
            });
            console.log(result.data);
            setShows(result.data.shows);
            if (result.data && result.data.shows) {
                if (nextShows) {
                    // Append new shows to existing shows
                    setAllShows(prevShows => [...prevShows, ...result.data.shows]); //Update shows state
                } else {
                    // Initial fetch, replace existing shows
                    setAllShows(result.data.shows); //Update shows state
                }

                if (result.data.hasMore) {
                    setNextShows(result.data.nextCursor);
                } else {
                    setNextShows(null); // No more shows to load
                }
            } else {
                console.error("Invalid data received from API:", result.data);
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
        setKeyword( e.target.value);
        console.log(keyword);
    }

    return (
        <>
            <Navigation/>

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
                    {loading && <p>Loading...</p>}
                    {serviceError && <p>Something went wrong. Try again!</p>}
                    {!loading && !serviceError && (
                        <>
                            {dutchServices.map((service) => {
                                    return (

                                        <label className="service" key={service.id} >
                                            <input
                                                type="checkbox"
                                                className="checkboxService"
                                                onClick={() => services(service.id)}
                                            />
                                            <p>{service.name}</p>
                                        </label>

                                    )
                                }
                            )}</>
                    )
                    }
                </InnerContainer>
                <h2>Genres</h2>
                <InnerContainer>
                    {loading && <p>Loading...</p>}
                    {genreError && <p>Something went wrong. Try again!</p>}
                    {!loading && !genreError && (
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
                    {showError && <p>Something went wrong. Try again!</p>}
                    {hasSearched ? (
                        initialLoad ? <p>Loading...</p> :
                            allShows.length > 0 ? ( // Use allShows here
                                <ul className="movieCards">
                                    {allShows.map((show) => { // Map over allShows
                                        if (show.streamingOptions && show.streamingOptions.nl && show.streamingOptions.nl.length > 0) {

                                            return (
                                                <div key={show.id}>
                                                    <Link to={`/filmserie/${show.id}`}>
                                                        {viewTiles ?
                                                            <MovieCardSmall
                                                                key={show.id}
                                                                image={show.imageSet.verticalPoster.w240}
                                                                service={show.streamingOptions.nl}
                                                            /> :
                                                            <MovieCardLarge
                                                                key={show.id}
                                                                image={show.imageSet.verticalPoster.w240}
                                                                title={show.originalTitle}
                                                                information={show.overview}
                                                                rating={show.rating}
                                                                service={show.streamingOptions.nl}/>
                                                        }
                                                    </Link>
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
                                                            /> :
                                                            <MovieCardLarge
                                                                showId={show.id}
                                                                image={show.imageSet.verticalPoster.w240}

                                                            />
                                                        }
                                                    </Link>
                                                </div>
                                            );
                                        }
                                    })}
                                </ul>
                            ) : <p>No shows found</p>
                    ) : <p>Search for your favorite shows!</p>}
                </InnerContainer>
                {nextShows && (
                    <InnerContainer classNameAdd="center">
                        <button className={"searchButton moreShows"} onClick={fetchNextShows}>Get more shows!</button>
                    </InnerContainer>
                )}
            </OuterContainer>
        </>
    )

}

export default Searcher;
