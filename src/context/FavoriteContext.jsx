import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode";


export const FavoriteContext = createContext({});

function FavoriteContextProvider({children}) {
    const [favorites, setFavorites] = React.useState([]);


    function genres(genre) {
        if (selectedGenres.includes(genre)) {
            setSelectedGenres(selectedGenres.filter((g) => g !== genre));
        } else {
            setSelectedGenres([...selectedGenres, genre]);
        }
    }



     function setFavoriteMovies(newFavorite) {
         if (favorites.includes(newFavorite)) {
             setFavorites(favorites.filter((f) => f !== newFavorite));
         } else {
             setFavorites([...favorites, newFavorite]);
         }
         console.log('favorieten');
         console.log(favorites);
        localStorage.setItem('favorieten', JSON.stringify(favorites));
    }

    const contextData = {
        favorites,
        setFavoriteMovies,
    };

    return (
        <FavoriteContext.Provider value={contextData}>
            {children}
        </FavoriteContext.Provider>
    )
}

export default FavoriteContextProvider;

