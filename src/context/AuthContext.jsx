import {createContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import isTokenValid from "../helpers/isTokenValid";
import axios from "axios";

export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const [auth, setAuth] = useState({
        isAuth: false,
        user: null,
        status: 'pending',
    });
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token && isTokenValid(token)) {
            //log de gebruiker opnieuw in
            void login(token)
        } else {
            setAuth({
                isAuth: false,
                user: null,
                status: 'done'
            });
        }
    }, [])

    async function login(token) {
        localStorage.setItem('token', token);

        const decodedToken = jwtDecode(token);
        console.log(decodedToken);

        try {
            const response = await axios.post(`https://api.datavortex.nl/moviesearcher/users/authenticate`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
            console.log(response);

            setAuth({
                isAuth: true,
                user: {
                    username: response.data.username,
                    email: response.data.email,
                    id: response.data.id,
                    role: 'user'
                },
                status: 'done',
            });

        } catch (error) {
            console.log(error);
            setAuth({
                isAuth: false,
                user: null,
                status: 'done',
            });
        }
        console.log("Gebruiker is ingelogd");
        navigate('/search');
    }

    function logout() {
        console.log("Gebruiker is uitgelogd");
        setAuth({
            isAuth: false,
            user: null,
            status: 'done'
        });
        navigate('/');
    }

    const contextData = {
        ...auth,
        login: login,
        logout: logout,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {auth.status === 'done'
                ? children
                : <p>Loading...</p>
            }
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;