import './App.css'
import {Routes, Route, Navigate} from 'react-router-dom'
import Home from "./pages/home/Home.jsx";
import Favorites from "./pages/Favorites/Favorites.jsx";
import Searcher from "./pages/searcher/Searcher.jsx";
import Account from "./pages/account/Account.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";
import LogIn from "./pages/log in/LogIn.jsx";
import SignIn from "./pages/sign in/SignIn.jsx";
import Filmpage from "./pages/filmpage/Filmpage.jsx";
import {useContext} from "react";
import {AuthContext} from "./context/AuthContext.jsx";


function App() {
    const {authorized} = useContext(AuthContext);
    return (
        <>
           <Routes>
               <Route path="/" element={<Home/>} />
               <Route path="/zoeken" element={authorized ? <Searcher/> : <Navigate to="/" />} />
               <Route path="/favorieten" element={authorized ? <Favorites/> : <Navigate to="/" />} />
               <Route path="/account" element={authorized ? <Account/> : <Navigate to="/" />} />
               <Route path="/inloggen" element={<LogIn/>} />
               <Route path="/aanmelden" element={<SignIn/>} />
               <Route path="/filmserie/:id" element={authorized ? <Filmpage/> : <Navigate to="/" />} />
               <Route path="*" element={<NotFound/>} />

           </Routes>
        </>
    )
}

export default App
