import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import isTokenValid from "../helpers/isTokenValid";
import axios from "axios";

export const AuthContext = createContext({});

function AuthContextProvider({ children }) {
    const [auth, setAuth] = useState({
        isAuth: false,
        user: null,
        status: 'pending',
    });
    const [authorized, toggleAuthorized] = useState(false);
    const [username, setUsername] = useState("");
    const [token, setToken] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        setToken(storedToken);

        if (storedToken && isTokenValid(storedToken)) {
            fetchUserData(storedToken);
        } else {
            setAuth({
                isAuth: false,
                user: null,
                status: 'done'
            });
        }
    }, []);

    useEffect(() => {
        console.log("Auth state changed:", auth);
    }, [auth]);

    async function fetchUserData(jwtToken) {
        try {
            const decodedToken = jwtDecode(jwtToken);
            console.log(jwtToken)
            setAuth({
                ...auth,
                isAuth: true,
                user: {
                    username: decodedToken.sub,
                    id: decodedToken.userId,
                    role: decodedToken.role,
                },
                status: 'done',
            });
            setUsername(decodedToken.sub);
            toggleAuthorized(true);
        } catch (error) {
            console.error('Error fetching user data:', error);
            setAuth({
                isAuth: false,
                user: null,
                status: 'done',
            });
            setUsername("");
            toggleAuthorized(false);
            setToken("");
        }
    }

    async function login(username, password) {
        try {
            const response = await axios.post(
                `https://api.datavortex.nl/moviesearcher/users/authenticate`,
                {
                    username,
                    password,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Api-Key': import.meta.env.X_API_KEY,
                    },
                }
            );
            const newToken = response.data.jwt;
            setToken(newToken);
            localStorage.setItem('token', newToken);

            fetchUserData(newToken);
            console.log("newToken")
            console.log(newToken)
            navigate('/search');
        } catch (error) {
            console.error('Login error:', error);
            setAuth({
                isAuth: false,
                user: null,
                status: 'done',
            });
            setUsername("");
            toggleAuthorized(false);
            setToken("");

            console.error("Login error in AuthContext:", error);
            throw error;
        }
    }

    function logout() {
        console.log("Gebruiker is uitgelogd");
        setAuth({
            ...auth,
            isAuth: false,
            user: null,
            status: 'done',
        });
        setUsername("");
        toggleAuthorized(false);
        setToken("");
        localStorage.removeItem('token');
        navigate('/');
    }

    const contextData = {
        ...auth,
        authorized,
        login: login,
        logout: logout,
        username,
        token,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {auth.status === 'done' ? children : <p>Loading...</p>}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;