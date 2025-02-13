import './App.css'
import {Routes, Route} from 'react-router-dom'
import Home from "./pages/home/Home.jsx";
import Favorites from "./pages/Favorites/Favorites.jsx";
import Searcher from "./pages/searcher/Searcher.jsx";
import Account from "./pages/account/Account.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";
import LogIn from "./pages/log in/LogIn.jsx";
import SignIn from "./pages/sign in/SignIn.jsx";
import Filmpage from "./pages/filmpage/Filmpage.jsx";


function App() {
    return (
        <>
           <Routes>
               <Route path="/" element={<Home/>} />
               <Route path="/search" element={<Searcher/>} />
               <Route path="/favorite" element={<Favorites/>} />
               <Route path="/account" element={<Account/>} />
               <Route path="/inloggen" element={<LogIn/>} />
               <Route path="/aanmelden" element={<SignIn/>} />
               <Route path="/filmserie/:id" element={<Filmpage/>} />
               <Route path="*" element={<NotFound/>} />

           </Routes>
        </>
    )
}

export default App
