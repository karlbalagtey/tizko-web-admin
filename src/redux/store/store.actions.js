import StoreActionTypes from "./store.types";

export const getAllStoresList = () => ({
    type: StoreActionTypes.GET_ALL_STORES_LIST_START,
});

export const getAllStoresListSuccess = (stores) => ({
    type: StoreActionTypes.GET_ALL_STORES_LIST_SUCCESS,
    payload: stores,
});

export const getAllStoresListFailure = (error) => ({
    type: StoreActionTypes.GET_ALL_STORES_LIST_FAILURE,
    payload: error,
});

export const signUpStoreStart = (storeCredentials) => ({
    type: StoreActionTypes.SIGN_UP_STORE_START,
    payload: storeCredentials,
});

export const signUpStoreSuccess = ({ store, additionalData }) => ({
    type: StoreActionTypes.SIGN_UP_STORE_SUCCESS,
    payload: { store, additionalData },
});

export const signUpStoreFailure = (error) => ({
    type: StoreActionTypes.SIGN_UP_STORE_FAILURE,
    payload: error,
});

export const updateStoreProfileStart = (storeCredentials) => ({
    type: StoreActionTypes.UPDATE_STORE_PROFILE_START,
    payload: storeCredentials
});

export const updateStoreProfileSuccess = (success) => ({
    type: StoreActionTypes.UPDATE_STORE_PROFILE_SUCCESS,
    payload: success,
});

export const updateStoreProfileFailure = (error) => ({
    type: StoreActionTypes.UPDATE_STORE_PROFILE_FAILURE,
    payload: error,
});
