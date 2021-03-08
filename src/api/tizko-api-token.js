import axios from 'axios';

const TizkoApiToken = () => {
    let inMemoryJWT = null;

    const getToken = () => {
        return inMemoryJWT;
    }

    const setToken = (token) => {
        inMemoryJWT = token;
        return true;
    }

    const clearToken = () => {
        inMemoryJWT = null;
        return true;
    }

    const refreshToken = () => {
        const URL = process.env.REACT_APP_API_URL + 'auth/refresh-tokens';

        return axios.post(URL, {}, { withCredentials: true });
    };

    return {
        getToken,
        setToken,
        clearToken,
        refreshToken,
    }
}

export default TizkoApiToken();