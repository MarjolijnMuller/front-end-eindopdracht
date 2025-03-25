import './LogIn.css';
import TitleContainer from "../../components/TitleContainer/TitleContainer.jsx";
import OuterContainer from "../../components/OuterContainer/OuterContainer.jsx";
import Button from "../../components/Button/Button.jsx";
import { useContext, useState, useRef, useEffect } from "react";
import Navigation from "../../components/Navigation/Navigation.jsx";
import InnerContainer from "../../components/InnerContainer/InnerContainer.jsx";
import { AuthContext } from "../../context/AuthContext.jsx";
import { useNavigate } from 'react-router-dom';
import Footer from "../../components/Footer/Footer.jsx";

function LogIn() {
    const { login } = useContext(AuthContext);
    const [formState, setFormState] = useState({
        username: "",
        password: "",
    });
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const abortControllerRef = useRef(null);

    useEffect(() => {
        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();

        const abortController = new AbortController();
        abortControllerRef.current = abortController;
        const signal = abortController.signal;

        try {
            await login(formState.username, formState.password, signal);
            abortControllerRef.current = null;
        } catch (error) {
            if (abortController.signal.aborted) {
                console.error("Inlogverzoek is geannuleerd");
            } else {
                console.error(error);
                if (error.response && error.response.status === 401) {
                    setErrorMessage("Onjuist wachtwoord. Probeer het opnieuw.");
                } else if (error.response && error.response.status === 400) {
                    setErrorMessage(
                        <>
                            Gebruikersnaam niet gevonden. <span className="link" onClick={() => navigate('/aanmelden')}>Meld je hier aan</span>.
                        </>
                    );
                } else {
                    setErrorMessage("Er is iets misgegaan. Probeer het opnieuw.");
                }
                abortControllerRef.current = null;
            }
        }
    }

    function handleChange(e) {
        const changedFieldName = e.target.name;

        setFormState({
            ...formState,
            [changedFieldName]: e.target.value,
        });
    }

    return (
        <body>
        <Navigation />
        <main>
            <TitleContainer title="Inloggen" />

            <OuterContainer>
                <InnerContainer classNameAdd="center">
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="inlog-username" className="logIn">
                            Gebruikersnaam:
                            <input
                                type="text"
                                name="username"
                                onChange={handleChange}
                                className="logInInput"
                            />
                        </label>
                        <label htmlFor="inlog-password" className="logIn">
                            Wachtwoord:
                            <input
                                type="password"
                                name="password"
                                onChange={handleChange}
                                className="logInInput"
                            />
                        </label>
                        <Button type={"submit"} name={"Inloggen"} className={"SubmitButton"} />
                        {errorMessage && <p className="error">{errorMessage}</p>}
                    </form>
                </InnerContainer>
            </OuterContainer>
        </main>
        <Footer/>
        </body>
    );
}

export default LogIn;