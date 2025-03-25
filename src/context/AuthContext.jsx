import { createContext, useEffect, useState, useRef } from "react";
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
    const isMounted = useRef(true);

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

        return () => {
            isMounted.current = false;
        };
    }, []);

    async function fetchUserData(jwtToken) {
        try {
            const decodedToken = jwtDecode(jwtToken);
            if (isMounted.current) {
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
            }
        } catch (error) {
            if (isMounted.current) {
                console.error('Fout bij het ophalen van gebruikersgegevens:', error);
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
            navigate('/zoeken');
        } catch (error) {
            if (isMounted.current) {
                console.error('Inlogfout:', error);
                setAuth({
                    isAuth: false,
                    user: null,
                    status: 'done',
                });
                setUsername("");
                toggleAuthorized(false);
                setToken("");

                console.error("Inlogfout in AuthContext:", error);
                throw error;
            }
        }
    }

    function logout() {
        if (isMounted.current) {
            setAuth({
                ...auth,
                isAuth: false,
                user: null,
                status: 'done',
            });
            setUsername("");
            toggleAuthorized(false);
            setToken("");
        }
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
            {auth.status === 'done' ? children : <p>Laden...</p>}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;