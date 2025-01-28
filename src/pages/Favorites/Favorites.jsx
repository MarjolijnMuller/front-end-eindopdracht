import './Favorites.css';
import Navigation from "../../components/Navigation/Navigation.jsx";
import TitleContainer from "../../components/TitleContainer/TitleContainer.jsx";
import OuterContainer from "../../components/OuterContainer/OuterContainer.jsx";
import ToggleSwitch from "../../components/ToggleSwitch/ToggleSwitch.jsx";
import InnerContainer from "../../components/InnerContainer/InnerContainer.jsx";
import MovieCardSmall from "../../components/MovieCardSmall/MovieCardSmall.jsx";

function Favorites() {
    return (
        <>
            <Navigation/>

            <TitleContainer title="Mijn favorieten"/>

            <OuterContainer>
                <ToggleSwitch
                    className={"toggleSwitchView"}/>

                <InnerContainer>
                    <MovieCardSmall/>
                    <MovieCardSmall/>
                    <MovieCardSmall/>
                    <MovieCardSmall/>
                </InnerContainer>
            </OuterContainer>

        </>
    )
}

export default Favorites;