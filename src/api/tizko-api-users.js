import axios from 'axios';
import tizkoApiToken from './tizko-api-token';

export const tizkoCreateNewClient = ( firstName, lastName, email, contactNumber, password, confirmPassword,  ) => {
    const URL = process.env.REACT_APP_API_URL + 'users';
    const token = tizkoApiToken.getToken();

    return axios.post(URL, {
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        role: 'Admin',
        acceptTerms: true,
        contactNumber: contactNumber,
        lastName: lastName,
        firstName: firstName,
    }, {
        headers: {
            Authorization: 'Bearer ' + token
        },
        withCredentials: true
    });
};

export const tizkoUpdateUserProfile = (user) => {
    const URL = process.env.REACT_APP_API_URL + 'auth/register';
    const token = tizkoApiToken.getToken();

    return axios.post(
        URL,
        {
            email: user.email,
        },
        {
            headers: {
                Authorization: 'Bearer ' + token,
            },
            withCredentials: true,
        }
    );
};

export const tizkoGetAllClients = () => {
    const URL = process.env.REACT_APP_API_URL + 'users';
    const token = tizkoApiToken.getToken();

    return axios.get(
        URL,
        {
            params: {
                role: 'admin'
            },
            headers: {
                Authorization: 'Bearer ' + token,
            },
            withCredentials: true,
        }
    );
};
