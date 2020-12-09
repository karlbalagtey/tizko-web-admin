import axios from 'axios';



export const tizkoCreateNewSubscriber = ({ user }) => {
    const URL = process.env.REACT_APP_API_URL + 'users/subscribe';

    console.log(user);

    // return axios.post(URL, {

    // }, { withCredentials: true });
};

export const tizkoCreateNewClient = ( firstName, lastName, email, contactNumber, password, confirmPassword,  ) => {
    const URL = process.env.REACT_APP_API_URL + 'users';
    const user = JSON.parse(localStorage.getItem('superuser'));

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
            Authorization: 'Bearer ' + user.jwtToken
        },
        withCredentials: true
    });
};

export const tizkoUpdateUserProfile = (user) => {
    const URL = process.env.REACT_APP_API_URL + 'auth/register';

    return axios.post(
        URL,
        {
            email: user.email,
        },
        {
            headers: {
                Authorization: 'Bearer ' + user.jwtToken,
            },
            withCredentials: true,
        }
    );
};

export const tizkoGetAllClients = () => {
    const URL = process.env.REACT_APP_API_URL + 'users';
    const user = JSON.parse(localStorage.getItem('superuser'));

    return axios.get(
        URL,
        {
            params: {
                role: 'Admin'
            },
            headers: {
                Authorization: 'Bearer ' + user.jwtToken,
            },
            withCredentials: true,
        }
    );
};
