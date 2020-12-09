import UserActionTypes from "./user.types";

export const getAllClientsList = () => ({
    type: UserActionTypes.GET_ALL_CLIENTS_LIST_START,
});

export const getAllClientsListSuccess = (clients) => ({
    type: UserActionTypes.GET_ALL_CLIENTS_LIST_SUCCESS,
    payload: clients,
});

export const getAllClientsListError = (error) => ({
    type: UserActionTypes.GET_ALL_CLIENTS_LIST_FAILURE,
    payload: error,
});

export const signUpClientStart = (userCredentials) => ({
    type: UserActionTypes.SIGN_UP_CLIENT_START,
    payload: userCredentials,
});

export const signUpClientSuccess = ({ user, additionalData }) => ({
    type: UserActionTypes.SIGN_UP_CLIENT_SUCCESS,
    payload: { user, additionalData },
});

export const signUpClientFailure = (error) => ({
    type: UserActionTypes.SIGN_UP_CLIENT_FAILURE,
    payload: error,
});

export const updateUserProfileStart = (userCredentials) => ({
    type: UserActionTypes.UPDATE_USER_PROFILE_START,
    payload: userCredentials
});

export const updateUserProfileSuccess = (success) => ({
    type: UserActionTypes.UPDATE_USER_PROFILE_SUCCESS,
    payload: success,
});

export const updateUserProfileFailure = (error) => ({
    type: UserActionTypes.UPDATE_USER_PROFILE_FAILURE,
    payload: error,
});

