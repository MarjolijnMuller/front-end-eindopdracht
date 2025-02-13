import {createContext, useState} from "react";

export const GenreContext = createContext({});

function GenreContextProvider({ children })
{
    const [selectedGenres, setSelectedGenres] = useState([]);

    function genres(genre) {
        if (selectedGenres.includes(genre)) {
            setSelectedGenres(selectedGenres.filter((g) => g !== genre));
        } else {
            setSelectedGenres([...selectedGenres, genre]);
        }
    }


    const contextData = {
        selectedGenres,
        genres,
    };

    return (
        <GenreContext.Provider value={contextData}>
            {children}
        </GenreContext.Provider>
    )
}

export default GenreContextProvider;
