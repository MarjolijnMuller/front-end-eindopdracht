import Navigation from "../../components/Navigation/Navigation.jsx";
import './Home.css';
import backgroundHome from "../../assets/backgroundHomeKopie.jpeg";
import Button from "../../components/Button/Button.jsx";
import React from "react";

function Home() {

    return (
        <>
            <Navigation disabled={true}/>
            <main>
                <div className="flex">
                    <img src={backgroundHome} className="homeImage" alt="Achtergrond afbeelding van de home pagina"/>
                    <div className="triangle"></div>
                    <div className="rectangle"></div>
                </div>

                <Button
                    type={"button"}
                    name={"Aanmelden"}
                    className={"signInHome"}
                    navigate={true}/>
            </main>
        </>
    )
}

export default Home;