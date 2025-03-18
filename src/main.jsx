import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter as Router} from "react-router-dom";
import MovieContextProvider from "./context/MovieContext.jsx";
import ViewContextProvider from "./context/ViewContext.jsx";
import GenreContextProvider from "./context/GenreContext.jsx";
import ServiceContextProvider from "./context/ServiceContext.jsx";
import AuthContextProvider from "./context/AuthContext.jsx";
import FavoriteContextProvider from "./context/FavoriteContext.jsx";


createRoot(document.getElementById('root')).render(
    <Router>
        <AuthContextProvider>
            <FavoriteContextProvider>
                <ViewContextProvider>
                    <MovieContextProvider>
                        <GenreContextProvider>
                            <ServiceContextProvider>
                                <App/>
                            </ServiceContextProvider>
                        </GenreContextProvider>
                    </MovieContextProvider>
                </ViewContextProvider>
            </FavoriteContextProvider>
        </AuthContextProvider>
    </Router>
)
