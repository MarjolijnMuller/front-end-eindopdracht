import './SignIn.css';
import TitleContainer from "../../components/TitleContainer/TitleContainer.jsx";
import OuterContainer from "../../components/OuterContainer/OuterContainer.jsx";
import Navigation from "../../components/Navigation/Navigation.jsx";
import InnerContainer from "../../components/InnerContainer/InnerContainer.jsx";
import Button from "../../components/Button/Button.jsx";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

    function validateUsername(username) {
        if (username.length < 4) {
            return "Username must be at least 4 characters long.";
        }
        return "";
    }

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return "Invalid email address.";
        }
        return "";
    }

    function validatePassword(password) {
        if (password.length < 8) {
            return "Password must be at least 8 characters long.";
        }
        return "";
    }

    function validateRepeatPassword(password, repeatPassword) {
        if (password !== repeatPassword) {
            return "Passwords do not match.";
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

        try {
            const response = await axios.post(
                "https://api.datavortex.nl/moviesearcher/users",
                {
                    username: formState.username,
                    email: formState.email,
                    password: formState.password,
                    info: "",
                    authorities: [{ authority: "USER" }],
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "X-Api-Key": import.meta.env.X_API_KEY,
                    },
                }
            );
            console.log(response);
            navigate("/inloggen");
        } catch (error) {
            console.error(error);
            if (error.response && error.response.status === 403) {
                setUsernameError("Username already exists.");
            } else {
                setUsernameError("Something went wrong. Please try again.");
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
            <Navigation />

            <TitleContainer title="Sign Up" />

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
                            <Button type={"submit"} name={"Sign Up"} className={"SubmitButton"} />
                            <Button type={"button"} name={"Cancel"} className={"AnnuleerButton"} onClick={handleCancel} />
                        </InnerContainer>
                    </form>
                </InnerContainer>
            </OuterContainer>
        </>
    );
}

export default SignIn;