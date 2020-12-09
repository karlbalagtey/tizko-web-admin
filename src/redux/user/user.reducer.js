import UserActionTypes from "./user.types";

const INITIAL_STATE = {
    currentUser: null,
    isSubmitting: false,
    message: null,
    error: null,
    success: null,
    isAuthenticated: false,
    clients: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UserActionTypes.GET_ALL_CLIENTS_LIST_START:
            return {
                ...state,
                isSubmitting: true
            };
        case UserActionTypes.GET_ALL_CLIENTS_LIST_SUCCESS:
            return {
                ...state,
                isSubmitting: false,
                clients: action.payload,
                message: 'Loaded list of clients'
            }
        case UserActionTypes.GET_ALL_CLIENTS_LIST_FAILURE:
            return {
                ...state,
                isSubmitting: false,
                error: action.payload,
                message: null,
                success: null
            }
        case UserActionTypes.UPDATE_USER_PROFILE_START:
            return {
                ...state,
                isSubmitting: true
            };
        case UserActionTypes.UPDATE_USER_PROFILE_SUCCESS:
            return {
                ...state,
                isSubmitting: false,
                success: action.payload,
                message: null,
                error: null
            };
        case UserActionTypes.UPDATE_USER_PROFILE_FAILURE:
            return {
                ...state,
                isSubmitting: false,
                error: action.payload,
                message: null,
                success: null
            };
        case UserActionTypes.SIGN_UP_CLIENT_START:
            return {
                ...state,
                isSubmitting: true
            }
        case UserActionTypes.SIGN_UP_CLIENT_SUCCESS:
            return {
                ...state,
                isSubmitting: false,
                success: "Successfully added client",
                message: null,
                error: null,
            }
        case UserActionTypes.SIGN_UP_CLIENT_FAILURE:
            return {
                ...state,
                isSubmitting: false,
                success: null,
                message: null,
                error: action.payload
            };
        default:
            return state;
    }
};

export default userReducer;
