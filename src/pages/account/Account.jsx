import './Account.css';
import Navigation from "../../components/Navigation/Navigation.jsx";
import TitleContainer from "../../components/TitleContainer/TitleContainer.jsx";
import OuterContainer from "../../components/OuterContainer/OuterContainer.jsx";
import InnerContainer from "../../components/InnerContainer/InnerContainer.jsx";
import {useContext, useEffect, useState, useRef} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import axios from "axios";
import Footer from "../../components/Footer/Footer.jsx";

function Account() {
    const {token} = useContext(AuthContext);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const abortControllerRef = useRef(null);
    const backendUrl = 'https://frontend-educational-backend.herokuapp.com';

    useEffect(() => {
        async function fetchUser() {
            setLoading(true);
            setError(null);

            const abortController = new AbortController();
            abortControllerRef.current = abortController;
            const signal = abortController.signal;

            try {
                const response = await axios.get(
                    `${backendUrl}/api/user`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                        },
                        signal: signal,
                    }
                );
                setUser(response.data);
            } catch (error) {
                if (axios.isCancel(error)) {
                    console.error('Request geannuleerd', error.message);
                } else {
                    console.error("Fout bij het ophalen van accountgegevens:", error);
                    setError("Het laden van de accountgegevens is mislukt.");
                }
            } finally {
                setLoading(false);
                abortControllerRef.current = null;
            }
        }

        fetchUser();

        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, [token]);

    return (
        <>
            <Navigation/>
            <main>
                <TitleContainer title="Mijn account"/>

                <OuterContainer>
                    <InnerContainer classNameAdd="center">
                        {loading && <p>Laden...</p>}
                        {error && <p className="error">{error}</p>}
                        {user && (
                            <div className="userData">
                                <p>Gebruikersnaam: <strong>{user.username}</strong></p>
                                <p>EmailAdres: <strong>{user.email}</strong></p>
                                {user.info && <p>Extra info: <strong>{user.info}</strong></p>}
                            </div>
                        )}
                    </InnerContainer>
                </OuterContainer>
            </main>
            <Footer/>
        </>
    );
}

export default Account;