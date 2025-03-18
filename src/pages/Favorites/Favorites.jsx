import './Favorites.css';
import Navigation from "../../components/Navigation/Navigation.jsx";
import TitleContainer from "../../components/TitleContainer/TitleContainer.jsx";
import OuterContainer from "../../components/OuterContainer/OuterContainer.jsx";
import ToggleSwitch from "../../components/ToggleSwitch/ToggleSwitch.jsx";
import InnerContainer from "../../components/InnerContainer/InnerContainer.jsx";
import MovieCardSmall from "../../components/MovieCardSmall/MovieCardSmall.jsx";
import axios from "axios";
import {useEffect} from "react";
import {jwtDecode} from "jwt-decode";

function Favorites() {

    useEffect(() => {
        async function fetchData() {
            const token = localStorage.getItem('token');
            const decodedToken = jwtDecode(token);
            const username = decodedToken.sub;

            try {
                const response = await axios.get(`https://api.datavortex.nl/moviesearcher/users/${username}/info`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                });
                console.log(response);
            } catch (e) {
                console.log(e);
            }
        }

        fetchData();
    },[])


    return (
        <>
            <Navigation/>

            <TitleContainer title="Mijn favorieten"/>

            <OuterContainer>
                <ToggleSwitch
                    className={"toggleSwitchView"}/>

                <InnerContainer>
                    <p>hello</p>
                </InnerContainer>
            </OuterContainer>

        </>
    )
}

export default Favorites;