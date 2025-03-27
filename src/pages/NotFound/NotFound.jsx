import React from 'react';
import './NotFound.css'
import {Link} from 'react-router-dom'
import OuterContainer from "../../components/OuterContainer/OuterContainer.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import Navigation from "../../components/Navigation/Navigation.jsx";

function NotFound() {
    return (
        <>
        <Navigation/>
        <main>
            <OuterContainer>
                <h1>Oeps… Deze pagina bestaat niet</h1>
                <p>Breng me terug naar <Link to='/' className="link">home.</Link></p>
            </OuterContainer>
        </main>
        <Footer/>
        </>
    )
        ;
}

export default NotFound;