import './Account.css'
import Navigation from "../../components/Navigation/Navigation.jsx";
import TitleContainer from "../../components/TitleContainer/TitleContainer.jsx";
import OuterContainer from "../../components/OuterContainer/OuterContainer.jsx";
import Button from "../../components/Button/Button.jsx";
import InnerContainer from "../../components/InnerContainer/InnerContainer.jsx";

function Account() {
    return (
        <>
            <Navigation/>

            <TitleContainer title="Mijn account"/>

            <OuterContainer>
                <InnerContainer classNameAdd="center">
                    <form onSubmit={(e) => e.preventDefault()}>

                        <label htmlFor="username" className="accountInfo">
                            <p>Gebruikersnaam:</p>

                            <input type="text" placeholder="Gebruikersnaam wijzigen" className="accountInput"/>
                        </label>

                        <label htmlFor="mail" className="accountInfo">
                            <p>EmailAdres:</p>
                        </label>

                        <label htmlFor="password" className="accountInfo accountPassword">
                            <p>Wachtwoord wijzigen:</p>
                            <input type="text" placeholder="Nieuw wachtwoord" className="accountInput"/>
                            <input type="text" placeholder="Nieuw wachtwoord herhalen" className="accountInput"/>
                        </label>

                    </form>
                </InnerContainer>

                <InnerContainer classNameAdd="center">
                    <Button type="submit"
                            className="SubmitButton"
                            name="Opslaan"/>
                    <Button type="button"
                            className="AnnuleerButton"
                            name="Annuleren"/>
                </InnerContainer>

            </OuterContainer>
        </>
    )
}

export default Account;