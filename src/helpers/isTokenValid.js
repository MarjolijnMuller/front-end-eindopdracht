import { jwtDecode } from "jwt-decode";

function isTokenValid(token) {
    try {
        const decodedToken = jwtDecode(token);
        const expirationTime = decodedToken.exp * 1000; // Exp in seconden, omzetten naar milliseconden
        return Date.now() < expirationTime;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export default isTokenValid;