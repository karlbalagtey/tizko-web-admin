import axios from 'axios';
import tizkoApiToken from './tizko-api-token';

export const tizkoSignIn = async (email, password) => {
    const URL = process.env.REACT_APP_API_URL + 'auth/login';
    const { data } = await axios.post(
        URL,
        {
            email: email,
            password: password,
        },
        { withCredentials: true }
    );
    const { user, token } = data;

    tizkoApiToken.setToken(token.access);
    return user;
};

export const tizkoCheckAuth = async () => {
    const token = tizkoApiToken.getToken();

    if (!token) {
        const { data } = await tizkoApiToken.refreshToken();
        const { access, expires } = data;
        const now = Date.now().valueOf() / 1000;
        const user = JSON.parse(localStorage.getItem('superuser'));

        if (expires < now) {
            tizkoApiToken.setToken(access);
            return Promise.resolve(user);
        }

        tizkoApiToken.setToken(access);
        return Promise.resolve(user);
    }

    return Promise.reject();
};

export const tizkoForgotPassword = (email) => {
    const URL = process.env.REACT_APP_API_URL + 'auth/forgot-password';
    console.log(email);

    return axios.post(
        URL,
        {
            email: email,
        },
        { withCredentials: true }
    );
};

export const tizkoResetPassword = (token, password, confirmPassword) => {
    const URL = process.env.REACT_APP_API_URL + 'auth/reset-password';
    console.log(token, password, confirmPassword);

    return axios.post(
        URL,
        {
            token: token,
            password: password,
            confirmPassword: confirmPassword,
        },
        { withCredentials: true }
    );
};

export const tizkoValidateResetToken = (token) => {
    console.log(token);
};

export const tizkoSignOut = () => {
    const URL = process.env.REACT_APP_API_URL + 'auth/logout';

    return axios.post(URL, {}, { withCredentials: true });
};
