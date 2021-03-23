import { takeLatest, put, all, call } from 'redux-saga/effects';

import AuthActionTypes from './auth.types';

import {
    signInSuccess,
    signInFailure,
    signOutSuccess,
    signOutFailure,
    forgotPasswordSuccess,
    resetPasswordSuccess,
    noUserFound,
    authenticated,
} from './auth.actions';

import {
    tizkoSignIn,
    tizkoSignOut,
    tizkoForgotPassword,
    tizkoResetPassword,
    tizkoCheckAuth,
} from '../../api/tizko-api-auth';

import {
    notifyError,
    notifySuccess,
} from '../notify/notify.actions';

import { handleError } from '../../util/handleError';

export function* signInWithEmail({ payload: { email, password } }) {
    try {
        const user = yield tizkoSignIn(email, password);
        yield put(notifySuccess('Welcome aboard'));
        yield put(signInSuccess(user));
    } catch (error) {
        const response = yield call(handleError, error);
        yield put(notifyError(response));
        yield put(signInFailure(response));
    }
}

export function* isUserAuthenticated() {
    try {
        const expires = yield tizkoCheckAuth();
        yield put(authenticated(expires));
    } catch (error) {
        const response = yield call(handleError, error);
        yield put(notifyError(response));
        yield put(noUserFound());
    }
}

export function* signOutUser() {
    try {
        yield tizkoSignOut();
        yield put(notifySuccess('See you soon!'));
        yield put(signOutSuccess());
    } catch (error) {
        const response = yield call(handleError, error);
        yield put(notifyError(response));
        yield put(signOutFailure(response));
    }
}

export function* forgotPassword({ payload: { email } }) {
    try {
        yield tizkoForgotPassword(email);
        yield put(notifySuccess('Please check your email to reset password'));
        yield put(forgotPasswordSuccess());
    } catch (error) {
        const response = yield call(handleError, error);
        yield put(notifyError(response));
        yield put(signInFailure(response));
    }
}

export function* resetPassword({
    payload: { token, password, confirmPassword },
}) {
    try {
        const res = yield tizkoResetPassword(token, password, confirmPassword);
        yield put(notifySuccess(res.data.message));
        yield put(resetPasswordSuccess(res.data.message));
    } catch (error) {
        const response = yield call(handleError, error);
        yield put(notifyError(response));
        yield put(signInFailure(response));
    }
}

export function* onEmailSignInStart() {
    yield takeLatest(AuthActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onSignOutStart() {
    yield takeLatest(AuthActionTypes.SIGN_OUT_START, signOutUser);
}

export function* onCheckUserSession() {
    yield takeLatest(AuthActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onForgotPasswordStart() {
    yield takeLatest(AuthActionTypes.FORGOT_PASSWORD_START, forgotPassword);
}

export function* onResetPasswordStart() {
    yield takeLatest(AuthActionTypes.RESET_PASSWORD_START, resetPassword);
}

export function* authSagas() {
    yield all([
        call(onEmailSignInStart),
        call(onCheckUserSession),
        call(onForgotPasswordStart),
        call(onResetPasswordStart),
        call(onSignOutStart),
    ]);
}
