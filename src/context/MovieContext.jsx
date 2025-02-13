import {createContext, useState} from "react";

export const MovieContext = createContext({});

function MovieContextProvider({ children })
{
    const [isMovie, setIsMovie] = useState("movie");

    function movieSerieSwitch()
    {
        setIsMovie(prevIsMovie => {
            const newIsMovie = prevIsMovie === "movie" ? "series" : "movie" ;
            console.log("movie/series: " + newIsMovie);
            return newIsMovie;
        });
    }

    const contextData = {
        isMovie: isMovie,
        movieSerieSwitch: movieSerieSwitch,
    };

    return (
        <MovieContext.Provider value={contextData}>
            {children}
        </MovieContext.Provider>
    )
}

export default MovieContextProvider;
