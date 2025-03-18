import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode";


export const FavoriteContext = createContext({});

function FavoriteContextProvider({children}) {
    const [favorites, setFavorites] = React.useState("");

    async function setFavoriteMovies(newFavorite) {
        const token = localStorage.getItem('token');
        const decodedToken = jwtDecode(token);

        try {
            const response = await axios.put(
                `http://localhost:3000/600/users/${decodedToken.sub}`,
                {
                    "info": newFavorite,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(response.data);

        } catch (e) {
            console.log(e);
        }
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

