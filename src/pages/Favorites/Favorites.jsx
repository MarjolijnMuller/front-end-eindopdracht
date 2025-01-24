import './Favorites.css';
import Navigation from "../../components/Navigation/Navigation.jsx";
import TitleContainer from "../../components/TitleContainer/TitleContainer.jsx";
import OuterContainer from "../../components/OuterContainer/OuterContainer.jsx";
import ToggleSwitch from "../../components/ToggleSwitch/ToggleSwitch.jsx";
import InnerContainer from "../../components/InnerContainer/InnerContainer.jsx";
import MovieCartSmall from "../../components/MovieCartSmall/MovieCartSmall.jsx";

function Favorites() {
    return (
        <>
            <Navigation/>

            <TitleContainer title="Mijn favorieten"/>

            <OuterContainer>
                <ToggleSwitch
                    className={"toggleSwitchView"}/>

                <InnerContainer>
                    <MovieCartSmall/>
                    <MovieCartSmall/>
                    <MovieCartSmall/>
                    <MovieCartSmall/>
                </InnerContainer>
            </OuterContainer>

        </>
    )
}

export default Favorites;