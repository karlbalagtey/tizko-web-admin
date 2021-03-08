import axios from 'axios';
import tizkoApiToken from './tizko-api-token';

export const tizkoCreateNewStore = ( name, description, contactNumber, location  ) => {
    const URL = process.env.REACT_APP_API_URL + 'stores';
    const token = tizkoApiToken.getToken();

    return axios.post(URL, {
        location: location,
        contactNumber: contactNumber,
        description: description,
        name: name,
    }, {
        headers: {
            Authorization: 'Bearer ' + token
        },
        withCredentials: true
    });
};

export const tizkoUpdateStoreProfile = (storeId, name, description) => {
    const URL = process.env.REACT_APP_API_URL + `stores/${storeId}`;
    const token = tizkoApiToken.getToken();

    return axios.put(
        URL,
        {
            name: name,
            description: description
        },
        {
            headers: {
                Authorization: 'Bearer ' + token,
            },
            withCredentials: true,
        }
    );
};

export const tizkoGetAllStores = (query) => {
    const URL = process.env.REACT_APP_API_URL + 'stores';
    const token = tizkoApiToken.getToken();

    console.log(query);
    
    // const params = {
    //     page: query.page,
    //     limit: query.limit
    // }

    return axios.get(
        URL,{ ...query},
        {
            headers: {
                Authorization: 'Bearer ' + token,
            },
            withCredentials: true,
        }
    );
};

export const tizkoGetStoreDetails = (id) => {
    const URL = process.env.REACT_APP_API_URL + `stores/${id}`;
    const token = tizkoApiToken.getToken();

    return axios.get(
        URL,
        {
            headers: {
                Authorization: 'Bearer ' + token,
            },
            withCredentials: true,
        }
    );
};

export const tizkoSearchForStores = (term) => {
    const URL = process.env.REACT_APP_API_URL + `stores/search/${term}`;
    const token = tizkoApiToken.getToken();

    return axios.get(
        URL,
        {
            headers: {
                Authorization: 'Bearer ' + token,
            },
            withCredentials: true,
        }
    );
};
