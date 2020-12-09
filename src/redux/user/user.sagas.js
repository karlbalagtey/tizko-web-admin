import { takeLatest, put, all, call } from 'redux-saga/effects';

import UserActionTypes from './user.types';

import {
    signUpClientSuccess,
    signUpClientFailure,
    getAllClientsListError,
    getAllClientsListSuccess,
} from './user.actions';

import {
    tizkoUpdateUserProfile,
    tizkoCreateNewClient,
    tizkoGetAllClients,
} from '../../api/tizko-api-users';

export function* signUpClient({
    payload: { firstName, lastName, email, contactNumber, password, confirmPassword },
}) {
    try {
        const { user } = yield tizkoCreateNewClient(firstName, lastName, email, contactNumber, password, confirmPassword);
        yield put(
            signUpClientSuccess({
                user
            })
        );
    } catch (error) {
        console.log(error.response.data.error);
        yield put(signUpClientFailure(error.response.data.error));
    }
}

export function* onSignUpClientStart() {
    yield takeLatest(UserActionTypes.SIGN_UP_CLIENT_START, signUpClient);
}

export function* updateUserProfile({ payload: { userCredentials } }) {
    try {
        const res = yield tizkoUpdateUserProfile(userCredentials);
        console.log(res);
    } catch (error) {
        console.log(error);
    }
}

export function* getAllClientsList() {
    try {
        const { data } = yield tizkoGetAllClients();
        yield put(getAllClientsListSuccess({ data }));
    } catch (error) {
        console.log(error);
        yield put(getAllClientsListError(error));
    }
}

export function* onUpdateUserProfileStart() {
    yield takeLatest(
        UserActionTypes.UPDATE_USER_PROFILE_START,
        updateUserProfile
    );
}

export function* onGetAllClientsList() {
    yield takeLatest(
        UserActionTypes.GET_ALL_CLIENTS_LIST_START,
        getAllClientsList
    );
}

export function* userSagas() {
    yield all([call(onSignUpClientStart), call(onGetAllClientsList)]);
}
