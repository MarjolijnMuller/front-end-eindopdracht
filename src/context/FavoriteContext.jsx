import React, { createContext, useEffect, useState } from "react";

export const FavoriteContext = createContext({});

function FavoriteContextProvider({ children }) {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const storedFavorites = localStorage.getItem("favorites");
        if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites));
        }
    }, []);

    function setFavoriteMovies(newFavorite) {
        setFavorites(prevFavorites => {
            const updatedFavorites = prevFavorites.includes(newFavorite)
                ? prevFavorites.filter((f) => f !== newFavorite)
                : [...prevFavorites, newFavorite];

            localStorage.setItem('favorites', JSON.stringify(updatedFavorites)); // Correctie: Zet de key goed.
            console.log('favorieten');
            console.log(updatedFavorites);
            console.log(localStorage.getItem("favorites"));
            return updatedFavorites;
        });
    }

    const contextData = {
        favorites,
        setFavoriteMovies,
    };

    return (
        <FavoriteContext.Provider value={contextData}>
            {children}
        </FavoriteContext.Provider>
    );
}

export default FavoriteContextProvider;