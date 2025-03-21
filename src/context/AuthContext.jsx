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
    const [authorized, toggleAuthorized] = useState(false);
    const [username, setUsername] = useState("");
    const [token, setToken] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        setToken(token);

        if (token && isTokenValid(token)) {
            void login(token)
        } else {
            setAuth({
                isAuth: false,
                user: null,
                status: 'done'
            });
        }
    }, [])

    useEffect(() => {
        console.log("Auth state changed:", auth);
    }, [auth]);

    async function login(username, password) {
        try {
            const response = await axios.post(`https://api.datavortex.nl/moviesearcher/users/authenticate`, {
                username,
                password,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Api-Key': 'moviesearcher:QgUz498OFaHSAWqGjIvS'
                }
            });
            const token = response.data.jwt;
            setToken(token);

            localStorage.setItem('token', token);

            const decodedToken = jwtDecode(token);
            console.log("decoded Token")
                        console.log(decodedToken);
            console.log("Before setAuth:", auth);
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
            console.log("After setAuth:", auth);
            console.log("Gebruiker is ingelogd");
            navigate('/search');

        } catch (error) {
            console.log(error);
            setAuth({
                isAuth: false,
                user: null,
                status: 'done',
            });
            setUsername("");
            toggleAuthorized(false);
            setToken("");
        }
        console.log(auth);
    }

    function logout() {
        console.log("Gebruiker is uitgelogd");
        setAuth({
            ...auth,
            isAuth: false,
            user: null,
            status: 'done'
        });
        setUsername("");
        toggleAuthorized(false);
        setToken("")
        console.log(auth);
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
            {auth.status === 'done'
                ? children
                : <p>Loading...</p>
            }
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;