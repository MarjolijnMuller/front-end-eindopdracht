import { jwtDecode } from "jwt-decode";

function isTokenValid(token) {
    try {
        const decodedToken = jwtDecode(token);
        const expirationTime = decodedToken.exp * 1000;
        return Date.now() < expirationTime;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export default isTokenValid;