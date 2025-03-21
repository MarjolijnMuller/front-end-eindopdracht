import './Account.css';
import Navigation from "../../components/Navigation/Navigation.jsx";
import TitleContainer from "../../components/TitleContainer/TitleContainer.jsx";
import OuterContainer from "../../components/OuterContainer/OuterContainer.jsx";
import InnerContainer from "../../components/InnerContainer/InnerContainer.jsx";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import axios from "axios";

function Account() {
    const { username, token } = useContext(AuthContext);
    const [user, setUser] = useState([]);

    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await axios.get(
                    `https://api.datavortex.nl/moviesearcher/users/${username}`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'X-Api-Key': 'moviesearcher:QgUz498OFaHSAWqGjIvS',
                            'Authorization': `Bearer ${token}`,
                        },
                    }
                );

                console.log(response.data);
                setUser(response.data);
            } catch (error) {
                console.log(error);
            }
        }

        fetchUser();
    }, [username, token]);

    return (
        <>
            <Navigation />

            <TitleContainer title="Mijn account" />

            <OuterContainer>
                <InnerContainer classNameAdd="center">
                    <div className="userData">
                        <p>Gebruikersnaam: <strong>{user.username}</strong></p>

                        <p>EmailAdres: <strong>{user.email}</strong></p>
                    </div>
                </InnerContainer>
            </OuterContainer>
        </>
    );
}

export default Account;