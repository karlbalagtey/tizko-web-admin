import AuthActionTypes from "./auth.types";

export const emailSignInStart = (emailAndPassword) => ({
    type: AuthActionTypes.EMAIL_SIGN_IN_START,
    payload: emailAndPassword,
});

export const forgotPasswordStart = (email) => ({
    type: AuthActionTypes.FORGOT_PASSWORD_START,
    payload: email,
});

export const forgotPasswordSuccess = () => ({
    type: AuthActionTypes.FORGOT_PASSWORD_SUCCESS,
});

export const resetPasswordStart = (userCredentials) => ({
    type: AuthActionTypes.RESET_PASSWORD_START,
    payload: userCredentials,
});

export const resetPasswordSuccess = (message) => ({
    type: AuthActionTypes.RESET_PASSWORD_SUCCESS,
    payload: message,
});

export const validateResetTokenStart = (token) => ({
    type: AuthActionTypes.VALIDATE_RESET_TOKEN_START,
    payload: token,
});

export const validateResetTokenSuccess = (success) => ({
    type: AuthActionTypes.VALIDATE_RESET_TOKEN_SUCCESS,
    payload: success,
});

export const validateResetTokenFailure = (error) => ({
    type: AuthActionTypes.VALIDATE_RESET_TOKEN_ERROR,
    payload: error,
});

export const signInSuccess = (user) => ({
    type: AuthActionTypes.SIGN_IN_SUCCESS,
    payload: user,
});

export const signInFailure = (error) => ({
    type: AuthActionTypes.SIGN_IN_FAILURE,
    payload: error,
});

export const checkUserSession = () => ({
    type: AuthActionTypes.CHECK_USER_SESSION,
});

export const authenticated = (expires) => ({
    type: AuthActionTypes.AUTHENTICATED,
    payload: expires,
});

export const noUserFound = () => ({
    type: AuthActionTypes.NO_USER_FOUND,
});

export const signOutStart = () => ({
    type: AuthActionTypes.SIGN_OUT_START,
});

export const signOutSuccess = () => ({
    type: AuthActionTypes.SIGN_OUT_SUCCESS,
});

export const signOutFailure = (error) => ({
    type: AuthActionTypes.SIGN_OUT_FAILURE,
    payload: error,
});

export const signUpClientStart = (userCredentials) => ({
    type: AuthActionTypes.SIGN_UP_CLIENT_START,
    payload: userCredentials,
});

export const signUpClientSuccess = ({ user, additionalData }) => ({
    type: AuthActionTypes.SIGN_UP_CLIENT_SUCCESS,
    payload: { user, additionalData },
});

export const signUpClientFailure = (error) => ({
    type: AuthActionTypes.SIGN_UP_CLIENT_FAILURE,
    payload: error,
});

export const updateUserProfileStart = (userCredentials) => ({
    type: AuthActionTypes.UPDATE_USER_PROFILE_START,
    payload: userCredentials,
});

export const updateUserProfileSuccess = (success) => ({
    type: AuthActionTypes.UPDATE_USER_PROFILE_SUCCESS,
    payload: success,
});

export const updateUserProfileFailure = (error) => ({
    type: AuthActionTypes.UPDATE_USER_PROFILE_FAILURE,
    payload: error,
});

