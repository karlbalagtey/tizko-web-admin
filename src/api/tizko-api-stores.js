import axios from 'axios';

export const tizkoCreateNewStore = ( name, description, contactNumber, location  ) => {
    const URL = process.env.REACT_APP_API_URL + 'stores';
    const user = JSON.parse(localStorage.getItem('superuser'));

    return axios.post(URL, {
        location: location,
        contactNumber: contactNumber,
        description: description,
        name: name,
    }, {
        headers: {
            Authorization: 'Bearer ' + user.jwtToken
        },
        withCredentials: true
    });
};

export const tizkoUpdateStoreProfile = (storeId, name, description) => {
    const URL = process.env.REACT_APP_API_URL + `stores/${storeId}`;
    const user = JSON.parse(localStorage.getItem('superuser'));

    return axios.put(
        URL,
        {
            name: name,
            description: description
        },
        {
            headers: {
                Authorization: 'Bearer ' + user.jwtToken,
            },
            withCredentials: true,
        }
    );
};

export const tizkoGetAllStores = () => {
    const URL = process.env.REACT_APP_API_URL + 'stores';
    const user = JSON.parse(localStorage.getItem('superuser'));

    return axios.get(
        URL,
        {
            headers: {
                Authorization: 'Bearer ' + user.jwtToken,
            },
            withCredentials: true,
        }
    );
};
