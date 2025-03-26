import './SignIn.css';
import TitleContainer from "../../components/TitleContainer/TitleContainer.jsx";
import OuterContainer from "../../components/OuterContainer/OuterContainer.jsx";
import Navigation from "../../components/Navigation/Navigation.jsx";
import InnerContainer from "../../components/InnerContainer/InnerContainer.jsx";
import Button from "../../components/Button/Button.jsx";
import React, {useState, useRef, useEffect} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Footer from "../../components/Footer/Footer.jsx";

function SignIn() {
    const [formState, setFormState] = useState({
        username: "",
        email: "",
        password: "",
        repeatPassword: "",
    });
    const [usernameError, setUsernameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [repeatPasswordError, setRepeatPasswordError] = useState("");
    const [formSubmitted, setFormSubmitted] = useState(false);
    const navigate = useNavigate();
    const abortControllerRef = useRef(null);

    useEffect(() => {
        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, []);

    function validateUsername(username) {
        if (username.length < 6) {
            return "Gebruikersnaam moet minstens 6 tekens lang zijn.";
        }
        return "";
    }

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return "Ongeldig e-mailadres.";
        }
        return "";
    }

    function validatePassword(password) {
        if (password.length < 6) {
            return "Wachtwoord moet minstens 6 tekens lang zijn.";
        }
        return "";
    }

    function validateRepeatPassword(password, repeatPassword) {
        if (password !== repeatPassword) {
            return "Wachtwoorden komen niet overeen.";
        }
        return "";
    }

    function handleChange(event) {
        const changedFieldName = event.target.name;
        const newValue = event.target.value;

        setFormState({
            ...formState,
            [changedFieldName]: newValue,
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setFormSubmitted(true);

        const usernameError = validateUsername(formState.username);
        const emailError = validateEmail(formState.email);
        const passwordError = validatePassword(formState.password);
        const repeatPasswordError = validateRepeatPassword(formState.password, formState.repeatPassword);

        setUsernameError(usernameError);
        setEmailError(emailError);
        setPasswordError(passwordError);
        setRepeatPasswordError(repeatPasswordError);

        if (usernameError || emailError || passwordError || repeatPasswordError) {
            return;
        }

        const abortController = new AbortController();
        abortControllerRef.current = abortController;
        const signal = abortController.signal;

        try {
            const response = await axios.post(
                "https://frontend-educational-backend.herokuapp.com/api/auth/signup",
                {
                    username: formState.username,
                    email: formState.email,
                    password: formState.password,
                    role: ["user"],
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        },
                    signal: signal,
                }
            );
            navigate("/inloggen");
            abortControllerRef.current = null;
        } catch (error) {
            if (axios.isCancel(error)) {
                console.error('Verzoek geannuleerd', error.message);
            } else {
                console.error("Registratiefout:", error);
                if (error.response && error.response.status === 403) {
                    setUsernameError("Gebruikersnaam bestaat al.");
                } else if (error.response && error.response.data && error.response.data.message) {
                    setUsernameError(`Registratie mislukt: ${error.response.data.message}`);
                }
                else {
                    setUsernameError("Er is iets misgegaan tijdens de registratie. Probeer het opnieuw.");
                }
                abortControllerRef.current = null;
            }
        }
    }

    function handleCancel() {
        setFormState({
            username: "",
            email: "",
            password: "",
            repeatPassword: "",
        });
        setUsernameError("");
        setEmailError("");
        setPasswordError("");
        setRepeatPasswordError("");
        setFormSubmitted(false);
        navigate("/");
    }

    return (
        <>
            <body>
            <Navigation/>
            <main>
                <TitleContainer title="Aanmelden"/>

                <OuterContainer>
                    <InnerContainer classNameAdd="center">
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="signIn-username" className="signIn">
                                Username:
                                <input
                                    type="text"
                                    name="username"
                                    value={formState.username}
                                    onChange={handleChange}
                                    className="signInInput"
                                />
                                {formSubmitted && usernameError && <p className="error">{usernameError}</p>}
                            </label>

                            <label htmlFor="signIn-mailadres" className="signIn">
                                Email Address:
                                <input
                                    type="text"
                                    name="email"
                                    value={formState.email}
                                    onChange={handleChange}
                                    className="signInInput"
                                />
                                {formSubmitted && emailError && <p className="error">{emailError}</p>}
                            </label>

                            <label htmlFor="signIn-password" className="signIn">
                                Password:
                                <input
                                    type="password"
                                    name="password"
                                    value={formState.password}
                                    onChange={handleChange}
                                    className="signInInput"
                                />
                                {formSubmitted && passwordError && <p className="error">{passwordError}</p>}
                                Repeat Password:
                                <input
                                    type="password"
                                    name="repeatPassword"
                                    value={formState.repeatPassword}
                                    onChange={handleChange}
                                    className="signInInput"
                                />
                                {formSubmitted && repeatPasswordError && <p className="error">{repeatPasswordError}</p>}
                            </label>
                            <InnerContainer classNameAdd="center">
                                <Button type={"submit"} name={"Sign Up"} className={"SubmitButton"}/>
                                <Button type={"button"} name={"Cancel"} className={"AnnuleerButton"}
                                        onClick={handleCancel}/>
                            </InnerContainer>
                        </form>
                    </InnerContainer>
                </OuterContainer>
            </main>
            <Footer/>
            </body>
        </>
    );
}

export default SignIn;