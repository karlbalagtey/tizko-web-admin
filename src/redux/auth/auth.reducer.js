import AuthActionTypes from './auth.types';

const INITIAL_STATE = {
    currentUser: null,
    isSubmitting: false,
    message: null,
    error: null,
    success: null,
    isAuthenticated: false,
};

const authReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case AuthActionTypes.CHECK_USER_SESSION:
            return {
                ...state,
                isSubmitting: true,
            };
        case AuthActionTypes.AUTHENTICATED:
            return {
                ...state,
                isAuthenticated: true,
                isSubmitting: false,
            };
        case AuthActionTypes.NO_USER_FOUND:
            return {
                ...state,
                isSubmitting: false,
                currentUser: null,
                success: null,
                message: 'Login to continue',
                error: null,
            };
        case AuthActionTypes.EMAIL_SIGN_IN_START:
            return {
                ...state,
                isSubmitting: true,
            };
        case AuthActionTypes.SIGN_IN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                error: null,
                success: 'Successfully signed in',
                message: null,
                isSubmitting: false,
                isAuthenticated: true,
            };
        case AuthActionTypes.SIGN_OUT_START:
            return {
                ...state,
                isSubmitting: true,
            };
        case AuthActionTypes.SIGN_OUT_SUCCESS:
            return {
                ...state,
                currentUser: null,
                error: null,
                success: 'Successfully signed out',
                message: null,
                isSubmitting: false,
                isAuthenticated: false,
            };
        case AuthActionTypes.FORGOT_PASSWORD_START:
            return {
                ...state,
                isSubmitting: true,
            };
        case AuthActionTypes.FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                message: null,
                error: null,
                success: action.payload,
                isSubmitting: false,
            };
        case AuthActionTypes.RESET_PASSWORD_START:
            return {
                ...state,
                isSubmitting: true,
            };
        case AuthActionTypes.RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                message: null,
                error: null,
                success: action.payload,
                isSubmitting: false,
            };
        case AuthActionTypes.VALIDATE_TOKEN_START:
            return {
                ...state,
                isSubmitting: true,
            };
        case AuthActionTypes.VALIDATE_TOKEN_SUCCESS:
            return {
                ...state,
                isSubmitting: false,
                success: action.payload,
                message: null,
                error: null,
            };
        case AuthActionTypes.VALIDATE_TOKEN_FAILURE:
            return {
                ...state,
                isSubmitting: false,
                error: action.payload,
                message: null,
                success: null,
            };
        case AuthActionTypes.UPDATE_USER_PROFILE_START:
            return {
                ...state,
                isSubmitting: true,
            };
        case AuthActionTypes.UPDATE_USER_PROFILE_SUCCESS:
            return {
                ...state,
                isSubmitting: false,
                success: action.payload,
                message: null,
                error: null,
            };
        case AuthActionTypes.UPDATE_USER_PROFILE_FAILURE:
            return {
                ...state,
                isSubmitting: false,
                error: action.payload,
                message: null,
                success: null,
            };
        case AuthActionTypes.SIGN_IN_FAILURE:
        case AuthActionTypes.SIGN_OUT_FAILURE:
        case AuthActionTypes.SIGN_UP_FAILURE:
            return {
                ...state,
                isSubmitting: false,
                success: null,
                message: null,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default authReducer;
