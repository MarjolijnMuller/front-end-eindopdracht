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
        console.log("Token AuthContext: " + token);

        if (token && isTokenValid(token)) {
            //log de gebruiker opnieuw in
            void login(token)
            console.log("Token AuthContext (if): " + token)
        } else {
            setAuth({
                isAuth: false,
                user: null,
                status: 'done'
            });
        }
    }, [])

    async function login(username, password) {


        try {
            const response = await axios.post(`https://api.datavortex.nl/moviesearcher/users/authenticate`, {
                username,
                password,
            }, {headers: {
                    'Content-Type': 'application/json',
                    'X-Api-Key': 'moviesearcher:QgUz498OFaHSAWqGjIvS'
                }});
            const token = response.data.jwt;
            console.log(token);
            console.log(response);

            localStorage.setItem('token', token);

            const decodedToken = jwtDecode(token);
            console.log("AuthContext decodedToken: " + decodedToken);

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

            console.log("Gebruiker is ingelogd");
            navigate('/search');

        } catch (error) {
            console.log(error);
            setAuth({
                isAuth: false,
                user: null,
                status: 'done',
            });
        }

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