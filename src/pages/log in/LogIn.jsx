import './LogIn.css';
import TitleContainer from "../../components/TitleContainer/TitleContainer.jsx";
import OuterContainer from "../../components/OuterContainer/OuterContainer.jsx";
import Button from "../../components/Button/Button.jsx";
import { useContext, useState } from "react";
import Navigation from "../../components/Navigation/Navigation.jsx";
import InnerContainer from "../../components/InnerContainer/InnerContainer.jsx";
import { AuthContext } from "../../context/AuthContext.jsx";
import { useNavigate } from 'react-router-dom';

function LogIn() {
    const { login } = useContext(AuthContext);
    const [formState, setFormState] = useState({
        username: "",
        password: "",
    });
    const [errorMessage, setErrorMessage] = useState("");
    const [success, toggleSuccess] = useState(false);
    const navigate = useNavigate();

    function handleChange(e) {
        const changedFieldName = e.target.name;

        setFormState({
            ...formState,
            [changedFieldName]: e.target.value,
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await login(formState.username, formState.password);
        } catch (error) {
            console.error(error);
            if (error.response && error.response.status === 401) {
                setErrorMessage("Incorrect password. Please try again.");
            } else if (error.response && error.response.status === 400) {
                setErrorMessage(
                    <>
                        Username not found. <span className="link" onClick={() => navigate('/aanmelden')}>Sign up here</span>.
                    </>
                );
            } else {
                setErrorMessage("Something went wrong. Please try again.");
            }
        }
    }

    return (
        <>
            <Navigation />
            <TitleContainer title="Inloggen" />

            <OuterContainer>
                <InnerContainer classNameAdd="center">
                    {!success ? (
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
                    ) : (
                        <p>U bent ingelogd</p>
                    )}
                </InnerContainer>
                {console.log(errorMessage)}
            </OuterContainer>
        </>
    );
}

export default LogIn;