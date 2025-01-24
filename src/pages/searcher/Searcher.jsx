import './Searcher.css';
import Navigation from "../../components/Navigation/Navigation.jsx";
import TitleContainer from "../../components/TitleContainer/TitleContainer.jsx";
import OuterContainer from "../../components/OuterContainer/OuterContainer.jsx";
import axios from "axios";
import {useEffect, useState} from "react";
import Button from "../../components/Button/Button.jsx";
import InnerContainer from "../../components/InnerContainer/InnerContainer.jsx";
import ToggleSwitch from "../../components/ToggleSwitch/ToggleSwitch.jsx";
import MovieCartSmall from "../../components/MovieCartSmall/MovieCartSmall.jsx";
import MovieCartLarge from "../../components/MovieCartLarge/MovieCartLarge.jsx";

function Searcher() {
    const [dutchServices, setDutchServices] = useState([]);
    const [genres, setGenres] = useState([]);
    const [usedServices, setUsedServices] = useState("");
    const [usedGenres, setUsedGenres] = useState("");
    const [shows, setShows] = useState([]);
    const [loading, toggleLoading] = useState(false)
    const [error, toggleError] = useState(false);

    useEffect(() => {
        async function getDutchServices() {
            toggleLoading(true);
            toggleError(false);
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
                toggleError(true);
            }
        }

        async function getGenres() {
            toggleLoading(true);
            toggleError(false);
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
                toggleError(true);
            }
        }

        getDutchServices()
        getGenres()
    }, []);



    async function fetchShows(){
        try{
            const result = await axios.get('https://streaming-availability.p.rapidapi.com/shows/search/filters', {
                params: {
                    country: 'nl',
                    catalogs: ["netflix"],
                    showType: "movie",

                },
                headers: {
                    'x-rapidapi-key': '5b9c13ca93msh7d7c427331406c1p13d79fjsne76971a64dcc',
                    'x-rapidapi-host': 'streaming-availability.p.rapidapi.com'
                }
            });
            console.log(result.data.shows);
            setShows(result.data.shows);
        }catch(error){
            console.error(error);
        }
    }


    return (
        <>
            <Navigation/>
<button type="button" onClick={fetchShows}>Klik</button>
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
                    {loading ? <p>Loading...</p> :
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
                    }
                </InnerContainer>
                <h2>Genres</h2>
                <InnerContainer>
                    {loading ? <p>Loading...</p> :
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
                    }
                </InnerContainer>
                <InnerContainer>
                    <label id="keyword">
                        Zoekwoord:
                        <input type="text" id="inputKeyword"/>
                    </label>
                </InnerContainer>
            </OuterContainer>

            <OuterContainer>
                <ToggleSwitch
                    className={"toggleSwitchView"}/>

                <InnerContainer>
                    {shows && shows.length > 0 ? (
                    <ul>
                        {shows.map((show) => {
                            return (
                                <MovieCartSmall
                                    key={show.id}
                                    image={show.imageSet.verticalPoster.w240}
                                    service={show.streamingOptions
                                        .nl[0].service.name}
                                />
                            )
                        })}
                    </ul>
                    ) : ( <p>Geen shows gevonden</p>)}
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