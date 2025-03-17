import './LogIn.css'
import TitleContainer from "../../components/TitleContainer/TitleContainer.jsx";
import OuterContainer from "../../components/OuterContainer/OuterContainer.jsx";
import Button from "../../components/Button/Button.jsx";
import {useContext, useState} from "react";
import Navigation from "../../components/Navigation/Navigation.jsx";
import InnerContainer from "../../components/InnerContainer/InnerContainer.jsx";
import {AuthContext} from "../../context/AuthContext.jsx";



function logIn() {
    const { login } = useContext(AuthContext);
    const [formState, setFormState] = useState({
        username: "",
        password: "",
    })
    /*const [errorMessage, setErrorMessage] = useState("");*/
    const [success, toggleSuccess] = useState(false);


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
            login(formState.username, formState.password);
        } catch (e) {
            console.log(e);
        }
    }


    return (
        <>
            <Navigation/>
            <TitleContainer title="Inloggen"/>


            <OuterContainer>
                <InnerContainer classNameAdd="center">
                    {!success ?
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
                            <Button
                                type={"submit"}
                                name={"Inloggen"}
                                className={"SubmitButton"}
                            />
                        </form> : <p>U bent ingelogd</p>}
                </InnerContainer>
            </OuterContainer>
        </>
    )
}


export default logIn;

