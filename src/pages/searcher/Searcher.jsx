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

    useEffect(() => {
        getDutchServices()
    }, []);
    useEffect(() => {
        getGenres()
    }, []);

    async function getDutchServices() {
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
            console.log(result.data.nl.services);
            setDutchServices(result.data.nl.services);
        } catch (error) {
            console.error(error);
        }
    }

    async function getGenres() {
        try {
            const result = await axios.get('https://streaming-availability.p.rapidapi.com/genres', {
                params: {
                    output_language: 'en'
                },
                headers: {
                    'x-rapidapi-key': '5b9c13ca93msh7d7c427331406c1p13d79fjsne76971a64dcc',
                    'x-rapidapi-host': 'streaming-availability.p.rapidapi.com'
                }
            });
            console.log(result.data);
            setGenres(result.data);
        } catch (error) {
            console.error(error);
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
                    {dutchServices.map((service) => {
                            return (
                                <>
                                    <label className="service">
                                        <input type="checkbox"
                                               className="checkboxService"
                                               key={service.homePage}/>
                                        <p key={service.name}>{service.name}</p>
                                    </label>
                                </>
                            )
                        }
                    )}
                </InnerContainer>
                <h2>Genres</h2>
                <InnerContainer>
                    <ul className="allGenreButtons">
                        {genres.map((genre) => {
                            return (
                                <>
                                    <Button key={genre.id}
                                            type={"button"}
                                            className={"genreButton"}
                                            name={genre.name}/>
                                </>
                            )
                        })}
                    </ul>
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
                    <MovieCartSmall/>
                    <MovieCartSmall/>
                    <MovieCartSmall/>
                    <MovieCartSmall/>
                    <MovieCartSmall/>
                    <MovieCartSmall/>
                </InnerContainer>
                <InnerContainer>
                    <MovieCartLarge/>
                    <MovieCartLarge/>
                    <MovieCartLarge/>
                    <MovieCartLarge/>
                    <MovieCartLarge/>

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