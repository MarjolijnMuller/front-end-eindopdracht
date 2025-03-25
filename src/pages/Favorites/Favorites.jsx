import './Favorites.css';
import Navigation from "../../components/Navigation/Navigation.jsx";
import TitleContainer from "../../components/TitleContainer/TitleContainer.jsx";
import OuterContainer from "../../components/OuterContainer/OuterContainer.jsx";
import ToggleSwitch from "../../components/ToggleSwitch/ToggleSwitch.jsx";
import InnerContainer from "../../components/InnerContainer/InnerContainer.jsx";
import MovieCardSmall from "../../components/MovieCardSmall/MovieCardSmall.jsx";
import axios from "axios";
import { useContext, useEffect, useState, useRef } from "react";
import MovieCardLarge from "../../components/MovieCardLarge/MovieCardLarge.jsx";
import { ViewContext } from "../../context/ViewContext.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import { AuthContext } from "../../context/AuthContext.jsx";

function Favorites() {
    const { username } = useContext(AuthContext);
    const { viewTiles } = useContext(ViewContext);
    const [favoriteShowData, setFavoriteShowData] = useState([]);
    const [loading, setLoading] = useState(true);
    const abortControllersRef = useRef({});

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            if (username) {
                const key = `favorites_${username}`;
                const storedFavorites = localStorage.getItem(key);
                const favorites = storedFavorites ? JSON.parse(storedFavorites) : [];

                if (favorites && favorites.length > 0) {
                    try {
                        const filteredFavorites = favorites.filter(id => id !== null);

                        const requests = filteredFavorites.map(async (id) => {
                            const abortController = new AbortController();
                            abortControllersRef.current[id] = abortController;

                            const result = await axios.get(`https://streaming-availability.p.rapidapi.com/shows/${id}`, {
                                params: {
                                    output_language: 'en',
                                },
                                headers: {
                                    'x-rapidapi-key': '5b9c13ca93msh7d7c427331406c1p13d79fjsne76971a64dcc',
                                    'x-rapidapi-host': 'streaming-availability.p.rapidapi.com'
                                },
                                signal: abortController.signal,
                            });

                            return result.data;
                        });

                        const results = await Promise.all(requests);
                        setFavoriteShowData(results);
                    } catch (error) {
                        if (axios.isCancel(error)) {
                            console.error('Verzoek geannuleerd', error.message);
                        } else {
                            console.error("Fout bij ophalen data:", error);
                        }
                    } finally {
                        setLoading(false);
                    }
                } else {
                    setFavoriteShowData([]);
                    setLoading(false);
                }
            } else {
                setFavoriteShowData([]);
                setLoading(false);
            }
        };

        fetchData();

        return () => {
            Object.values(abortControllersRef.current).forEach(abortController => {
                abortController.abort();
            });
            abortControllersRef.current = {};
        };
    }, [username, viewTiles]);

    return (
        <>
            <body>
            <Navigation />
            <main>
                <TitleContainer title="Mijn favorieten" />

                <OuterContainer>
                    <ToggleSwitch className={"toggleSwitchView"} />

                    <InnerContainer>
                        {loading ? (
                            <p>Laden...</p>
                        ) : (
                            <>
                                {favoriteShowData.length > 0 ? (
                                    <ul className="movieCards">
                                        {favoriteShowData.map((show) => (
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
                                        ))}
                                    </ul>
                                ) : (
                                    <p>Geen shows gevonden</p>
                                )}
                            </>
                        )}
                    </InnerContainer>
                </OuterContainer>
            </main>
            <Footer />
            </body>
        </>
    );
}

export default Favorites;