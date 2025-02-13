import './Searcher.css';
import Navigation from "../../components/Navigation/Navigation.jsx";
import TitleContainer from "../../components/TitleContainer/TitleContainer.jsx";
import OuterContainer from "../../components/OuterContainer/OuterContainer.jsx";
import axios from "axios";
import {useEffect, useState} from "react";
import Button from "../../components/Button/Button.jsx";
import InnerContainer from "../../components/InnerContainer/InnerContainer.jsx";
import ToggleSwitch from "../../components/ToggleSwitch/ToggleSwitch.jsx";
import MovieCardSmall from "../../components/MovieCardSmall/MovieCardSmall.jsx";
import {Link} from "react-router-dom";

function Searcher() {
    const [dutchServices, setDutchServices] = useState([]);
    const [genres, setGenres] = useState([]);
    const [shows, setShows] = useState([]);
    const [loading, toggleLoading] = useState(false)
    const [serviceError, toggleServiceError] = useState(false);
    const [genreError, toggleGenreError] = useState(false);
    const [showError, toggleShowError] = useState(false);
    const [hasSearched, togglehasSearched] = useState(false)
    const [initialLoad, toggleInitialLoad] = useState(true);

    useEffect(() => {
        async function getDutchServices() {
            toggleLoading(true);
            toggleServiceError(false);
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
        try {
            togglehasSearched(true);
            const result = await axios.get('https://streaming-availability.p.rapidapi.com/shows/search/filters', {
                params: {
                    country: "nl",
                    catalogs: "netflix,prime",
                    genres: "romance,comedy",
                    showType: "movie",

                },
                headers: {
                    'x-rapidapi-key': '5b9c13ca93msh7d7c427331406c1p13d79fjsne76971a64dcc',
                    'x-rapidapi-host': 'streaming-availability.p.rapidapi.com'
                }
            });
            console.log(result.data.shows);
            setShows(result.data.shows);
        } catch (error) {
            console.error(error);
            toggleShowError(true);
        } finally {
            toggleInitialLoad(false);
        }
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
                        secondTerm={"Series"}/>
                </InnerContainer>
                <h2>Streamingdiensten</h2>
                <InnerContainer>
                    {loading && <p>Loading...</p>}
                    {serviceError && <p>Something went wrong. Try again!</p>}
                    {!loading && !serviceError && (
                        <>
                            {dutchServices.map((service) => {
                                    return (

                                        <label className="service" key={service.id}>
                                            <input type="checkbox" className="checkboxService"/>
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
                                            name={genre.name}/>
                                )
                            })}
                        </ul>
                    )
                    }
                </InnerContainer>
                <InnerContainer>
                    <label id="keyword">
                        Zoekwoord:
                        <input type="text" id="inputKeyword"/>
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
                        shows.length > 0 ? (
                            <ul className="movieCards">
                                {shows.map((show) => {
                                    return (
                                        <div key={show.id}>
                                            <Link to={`/filmserie/${show.id}`}>
                                                <MovieCardSmall
                                                    key={show.id}
                                                    image={show.imageSet.verticalPoster.w240}
                                                    service={show.streamingOptions
                                                        .nl[0].service.name}
                                                />
                                            </Link>
                                        </div>
                                    )
                                })}
                            </ul>
                        ) : <p>No shows found</p>
                    ) : <p>Search for your favorite shows!</p>}
                </InnerContainer>
                <InnerContainer>
                    <p>Vorige</p>
                    <p>Volgende</p>
                </InnerContainer>
            </OuterContainer>
        </>
    )

}

export default Searcher;