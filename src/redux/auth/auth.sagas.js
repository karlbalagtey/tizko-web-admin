import { takeLatest, put, all, call } from "redux-saga/effects";

import AuthActionTypes from "./auth.types";

import {
    signInSuccess,
    signInFailure,
    signOutSuccess,
    signOutFailure,
    forgotPasswordSuccess,
    resetPasswordSuccess,
    noUserFound,
} from "./auth.actions";

import {
    tizkoSignIn,
    tizkoRevokeToken,
    tizkoGetCurrentUser,
    tizkoForgotPassword,
    tizkoResetPassword,
    tizkoValidateResetToken,
    tizkoRemoveUserFromLocalStorage,
} from "../../api/tizko-api-auth";

export function* signInWithEmail({ payload: { email, password } }) {
    try {
        console.log(email, password);
        const user = yield tizkoSignIn(email, password);
        
        console.log(user);

        yield put(signInSuccess({ id: user.id, ...user.data }));

        localStorage.setItem("superuser", JSON.stringify(user.data));
    } catch (error) {
        console.log(error.response.data.error);
        yield put(signInFailure(error.response.data.error));
    }
}

export function* onEmailSignInStart() {
    yield takeLatest(AuthActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* signOutUser() {
    try {
        const { jwtToken } = JSON.parse(localStorage.getItem('superuser'));
        console.log('saga: '+ jwtToken);
        
        yield call(tizkoRevokeToken, jwtToken);
        yield call(tizkoRemoveUserFromLocalStorage, 'superuser');
        yield put(signOutSuccess());
    } catch (error) {
        yield put(signOutFailure(error));
    }
}

export function* onSignOutStart() {
    yield takeLatest(AuthActionTypes.SIGN_OUT_START, signOutUser);
}

export function* isUserAuthenticated() {
    try {
        // jwt token is refreshed if token is expired
        const user = yield tizkoGetCurrentUser();
        console.log('is user authenticated: ' + user);

        localStorage.setItem("superuser", JSON.stringify(user));
        
        yield put(signInSuccess({ user }));
    } catch (error) {
        yield put(noUserFound(error.message));
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

export function* resetPassword({ payload: { token, password, confirmPassword } }) {
    try {
        const res = yield tizkoResetPassword(token, password, confirmPassword);
        console.log(res);

        yield put(resetPasswordSuccess(res.data.message));
    } catch (error) {
        console.log(error);
    }
}

export function* validateResetToken({ payload: { token } }) {
    try {
        const res = yield tizkoValidateResetToken(token);

        console.log(res);
        
        // yield put(validateResetTokenSuccess(res.data.success));

    } catch (error) {
        console.log(error);
    }
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

export function* onValidateResetTokenStart() {
    yield takeLatest(AuthActionTypes.VALIDATE_RESET_TOKEN_START, validateResetToken);
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
