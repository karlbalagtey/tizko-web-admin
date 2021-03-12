import { takeLatest, put, all, call } from 'redux-saga/effects';

import NotifyActionTypes from './notify.types';

import {
    signOutStart
} from './notify.actions';

import {
    tizkoSignIn,
    tizkoCheckAuth,
} from '../../api/tizko-api-notify';

export function* notifyStart({ payload: error }) {
    try {

    } catch (error) {
        yield put(signInFailure(error));
    }
}

export function* notifySuccess({ payload: message }) {
    try {

    } catch (error) {
        yield put(noUserFound(error.message));
    }
}

export function* notifyFailure({ payload: error }) {
    try {

    } catch (error) {
        yield put(noUserFound(error.message));
    }
}

export function* onForgotPasswordStart() {
    yield takeLatest(AuthActionTypes.FORGOT_PASSWORD_START, forgotPassword);
}

export function* onResetPasswordStart() {
    yield takeLatest(AuthActionTypes.RESET_PASSWORD_START, resetPassword);
}

export function* notifySagas() {
    yield all([
        call(onNotifyMessage),
        call(onNotifyError),
    ]);
}
