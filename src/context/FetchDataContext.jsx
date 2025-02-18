import {createContext, useState} from "react";

export const FetchDataContext = createContext({});

function FetchDataContextProvider({ children })
{
    /*const [selectedGenres, setSelectedGenres] = useState([]);*/




    const contextData = {
        selectedGenres,
        genres,
    };

    return (
        <FetchDataContext.Provider value={contextData}>
            {children}
        </FetchDataContext.Provider>
    )
}

export default FetchDataContextProvider;
