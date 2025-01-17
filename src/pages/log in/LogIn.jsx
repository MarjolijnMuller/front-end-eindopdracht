import './LogIn.css'
import TitleContainer from "../../components/TitleContainer/TitleContainer.jsx";
import OuterContainer from "../../components/OuterContainer/OuterContainer.jsx";
import Button from "../../components/Button/Button.jsx";
import {useState} from "react";


function logIn() {
    const [formState, setFormState] = useState({
        email: "",
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


    async function onFormSubmit(e) {
        e.preventDefault();
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
            <TitleContainer title="Inloggen"/>


            <OuterContainer>
                {!success ?
                    <form>
                        <label htmlFor="inlog-mail">
                            E-mailadres:
                            <input
                                type="text"
                                name="email"
                                onChange={handleChange}
                            />
                        </label>
                        <label htmlFor="inlog-password">
                            Wachtwoord:
                            <input
                                type="password"
                                name="password"
                                onChange={handleChange}
                            />
                        </label>
                        <Button
                            type={"submit"}
                            name={"Inloggen"}
                            className={"inloggen"}
                            onClick={onFormSubmit()}

                        />
                    </form> : <p>U bent ingelogd</p>}
                    </OuterContainer>
                    </>
                    )
                }


export default logIn;

