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

export function* signInWithEmail({ payload: { email, password } }) {
    try {
        const user = yield tizkoSignIn(email, password);

        yield put(signInSuccess(user));
    } catch (error) {
        console.log(error);
        yield put(signInFailure(error));
    }
}

export function* isUserAuthenticated() {
    try {
        const expires = yield tizkoCheckAuth();
        yield put(authenticated(expires));
    } catch (error) {
        yield put(noUserFound(error.message));
    }
}

export function* signOutUser() {
    try {
        yield tizkoSignOut();
        yield put(signOutSuccess());
    } catch (error) {
        yield put(signOutFailure(error));
    }
}

export function* forgotPassword({ payload: { email } }) {
    try {
        const res = yield tizkoForgotPassword(email);
        console.log(res);
        console.log(res.data);

        yield put(forgotPasswordSuccess(res.data.message));
    } catch (error) {
        yield put(signInFailure(error));
    }
}

export function* resetPassword({
    payload: { token, password, confirmPassword },
}) {
    try {
        const res = yield tizkoResetPassword(token, password, confirmPassword);
        console.log(res);

        yield put(resetPasswordSuccess(res.data.message));
    } catch (error) {
        console.log(error);
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
