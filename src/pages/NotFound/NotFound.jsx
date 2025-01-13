import React from 'react';
import './NotFound.css'
import {Link} from 'react-router-dom'
import OuterContainer from "../../components/OuterContainer/OuterContainer.jsx";

function NotFound() {
    return (
        <main>
            <OuterContainer>
                <h1>Oops… This page doesn’t exist</h1>
                <p>Take me back to the <Link to='/' className="link">home page.</Link></p>
            </OuterContainer>
        </main>
    )
        ;
}

export default NotFound;
