import './SignIn.css';
import TitleContainer from "../../components/TitleContainer/TitleContainer.jsx";
import OuterContainer from "../../components/OuterContainer/OuterContainer.jsx";
import Navigation from "../../components/Navigation/Navigation.jsx";
import InnerContainer from "../../components/InnerContainer/InnerContainer.jsx";
import Button from "../../components/Button/Button.jsx";
import {useState} from "react";

function SignIn() {
    const [formState, setFormState] = useState({
        username: "",
        email: "",
        password: "",
        repeatPassword: "",
    })
    const [errorMessage, setErrorMessage] = useState("");
    const [success, toggleSuccess] = useState(false);


    function handleChange(event) {
        const changedFieldName = event.target.name;
        setFormState({
            ...formState,
            changedFieldName: event.target.value,
        });
    }


    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMessage("");
        toggleSuccess(true);
        try {
            /*const response = await axios.post (
                //URL,
                {
                    email: formState.email,
                    password: formState.password,
                }
            );
            console.log(response.data);*/
            console.log("U wordt aangemeld")
        } catch (e) {
            console.error(e);
            setErrorMessage("Er is iets fout gegaan! Probeer het opnieuw!");
        }
    }

    return (
        <>
            <Navigation disabled={true}/>

            <TitleContainer title="Aanmelden"/>

            <OuterContainer>
                <InnerContainer classNameAdd="center">
                    {!success ?
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="signIn-username" className="signIn">
                                Gebruikersnaam:
                                <input
                                    type="text"
                                    name="username"
                                    onChange={handleChange}
                                    className="signInInput"
                                />
                            </label>

                            <label htmlFor="signIn-mailadres" className="signIn">
                                E-mailadres:
                                <input
                                    type="text"
                                    name="email"
                                    onChange={handleChange}
                                    className="signInInput"
                                />
                            </label>

                            <label htmlFor="signIn-password" className="signIn">
                                Wachtwoord:
                                <input
                                    type="password"
                                    name="password"
                                    onChange={handleChange}
                                    className="signInInput"
                                />
                                Herhaal wachtwoord:
                                <input
                                    type="password"
                                    name="repeatPassword"
                                    onChange={handleChange}
                                    className="signInInput"
                                />
                            </label>
                            <InnerContainer classNameAdd="center">
                                <Button
                                    type={"submit"}
                                    name={"Aanmelden"}
                                    className={"SubmitButton"}
                                />
                                <Button
                                    type={"button"}
                                    name={"Annuleren"}
                                    className={"AnnuleerButton"}
                                />
                            </InnerContainer>
                        </form> : <p>U bent ingelogd</p>}
                </InnerContainer>
            </OuterContainer>
        </>
    )
}

export default SignIn;