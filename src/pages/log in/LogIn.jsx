import './LogIn.css'
import TitleContainer from "../../components/TitleContainer/TitleContainer.jsx";
import OuterContainer from "../../components/OuterContainer/OuterContainer.jsx";
import Button from "../../components/Button/Button.jsx";
import {useState} from "react";
import Navigation from "../../components/Navigation/Navigation.jsx";
import InnerContainer from "../../components/InnerContainer/InnerContainer.jsx";


function logIn() {
    const [formState, setFormState] = useState({
        username: "",
        password: "",
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
            console.log("U wordt ingelogd")
        } catch (e) {
            console.error(e);
            setErrorMessage("Er is iets fout gegaan! Probeer het opnieuw!");
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

