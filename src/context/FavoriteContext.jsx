import React, { createContext, useEffect, useState, useContext } from "react";
import { AuthContext } from "./AuthContext";

export const FavoriteContext = createContext({});

function FavoriteContextProvider({ children }) {
    const { username } = useContext(AuthContext);

    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        if (username) {
            const storedFavorites = localStorage.getItem(`favorites_${username}`);
            if (storedFavorites) {
                setFavorites(JSON.parse(storedFavorites));
            }
        }
    }, [username]);

    function setFavoriteMovies(newFavorite) {
        setFavorites(prevFavorites => {
            const updatedFavorites = prevFavorites.includes(newFavorite)
                ? prevFavorites.filter((f) => f !== newFavorite)
                : [...prevFavorites, newFavorite];

            if (username) {
                localStorage.setItem(`favorites_${username}`, JSON.stringify(updatedFavorites));
            }

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