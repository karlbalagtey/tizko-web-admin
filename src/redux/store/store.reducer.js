import StoreActionTypes from "./store.types";

const INITIAL_STATE = {
    isSubmitting: false,
    message: null,
    error: null,
    success: null,
    stores: null,
};

const storeReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case StoreActionTypes.GET_ALL_STORES_LIST_START:
            return {
                ...state,
                isSubmitting: true
            };
        case StoreActionTypes.GET_ALL_STORES_LIST_SUCCESS:
            return {
                ...state,
                isSubmitting: false,
                stores: action.payload,
                message: 'Loaded list of stores'
            }
        case StoreActionTypes.GET_ALL_STORES_LIST_FAILURE:
            return {
                ...state,
                isSubmitting: false,
                error: action.payload,
                message: null,
                success: null
            }
        case StoreActionTypes.UPDATE_STORE_PROFILE_START:
            return {
                ...state,
                isSubmitting: true
            };
        case StoreActionTypes.UPDATE_STORE_PROFILE_SUCCESS:
            return {
                ...state,
                isSubmitting: false,
                success: action.payload,
                message: null,
                error: null
            };
        case StoreActionTypes.UPDATE_STORE_PROFILE_FAILURE:
            return {
                ...state,
                isSubmitting: false,
                error: action.payload,
                message: null,
                success: null
            };
        case StoreActionTypes.SIGN_UP_STORE_START:
            return {
                ...state,
                isSubmitting: true
            }
        case StoreActionTypes.SIGN_UP_STORE_SUCCESS:
            return {
                ...state,
                isSubmitting: false,
                success: "Successfully added store",
                message: null,
                error: null,
            }
        case StoreActionTypes.SIGN_UP_STORE_FAILURE:
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

export default storeReducer;
