import './Favorites.css';
import Navigation from "../../components/Navigation/Navigation.jsx";
import TitleContainer from "../../components/TitleContainer/TitleContainer.jsx";
import OuterContainer from "../../components/OuterContainer/OuterContainer.jsx";
import ToggleSwitch from "../../components/ToggleSwitch/ToggleSwitch.jsx";
import InnerContainer from "../../components/InnerContainer/InnerContainer.jsx";
import MovieCardSmall from "../../components/MovieCardSmall/MovieCardSmall.jsx";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import MovieCardLarge from "../../components/MovieCardLarge/MovieCardLarge.jsx";
import { FavoriteContext } from "../../context/FavoriteContext.jsx";
import { ViewContext } from "../../context/ViewContext.jsx";

function Favorites() {
    const { favorites } = useContext(FavoriteContext);
    const { viewTiles } = useContext(ViewContext);
    const [favoriteShowData, setFavoriteShowData] = useState([]);
    const [loading, setLoading] = useState(true); // Voeg loading state toe

    useEffect(() => {
        async function fetchData() {
            console.log("Favorites array:", favorites);

            if (favorites && favorites.length > 0) {
                try {
                    const filteredFavorites = favorites.filter(id => id !== null); // Filter null values
                    const requests = filteredFavorites.map(async (id) => {
                        const result = await axios.get(`https://streaming-availability.p.rapidapi.com/shows/${id}`, {
                            params: {
                                output_language: 'en',
                            },
                            headers: {
                                'x-rapidapi-key': '5b9c13ca93msh7d7c427331406c1p13d79fjsne76971a64dcc',
                                'x-rapidapi-host': 'streaming-availability.p.rapidapi.com'
                            }
                        });
                        return result.data;
                    });

                    const results = await Promise.all(requests);
                    console.log("API results:", results);
                    setFavoriteShowData(results);
                } catch (error) {
                    console.error("Fetch data error:", error);
                } finally {
                    setLoading(false); // Zet loading op false na het ophalen van de data
                }
            } else {
                setLoading(false); // Zet loading op false als er geen favorieten zijn
            }
        }

        fetchData();
    }, [favorites]);

    return (
        <>
            <Navigation />

            <TitleContainer title="Mijn favorieten" />

            <OuterContainer>
                <ToggleSwitch className={"toggleSwitchView"} />

                <InnerContainer>
                    {loading ? ( // Gebruik conditional rendering voor "Loading..."
                        <p>Loading...</p>
                    ) : (
                        <>
                            {console.log("Favorite show data:", favoriteShowData)}
                            {favoriteShowData.length > 0 ? (
                                <ul className="movieCards">
                                    {favoriteShowData.map((show) => {
                                        return (
                                            <div key={show.id}>
                                                {viewTiles ? (
                                                    <MovieCardSmall
                                                        key={show.id}
                                                        image={show.imageSet.verticalPoster.w240}
                                                        service={show.streamingOptions.nl}
                                                        showId={show.id}
                                                        imdbId={show.imdbId}
                                                    />
                                                ) : (
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
                                                )}
                                            </div>
                                        );
                                    })}
                                </ul>
                            ) : (
                                <p>No shows found</p>
                            )}
                        </>
                    )}
                </InnerContainer>
            </OuterContainer>
        </>
    );
}

export default Favorites;