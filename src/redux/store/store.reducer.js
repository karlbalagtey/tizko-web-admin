import StoreActionTypes from './store.types';

const INITIAL_STATE = {
    isLoading: false,
    message: null,
    error: null,
    success: null,
    stores: null,
    details: null,
    headCells: [
        {
            id: 'name',
            numeric: false,
            disablePadding: false,
            label: 'Store name',
        },
        {
            id: 'location',
            numeric: false,
            disablePadding: false,
            label: 'Location',
        },
        {
            id: 'contactNumber',
            numeric: true,
            disablePadding: false,
            label: 'Contact number',
        },
        {
            id: 'created',
            numeric: true,
            disablePadding: false,
            label: 'Created',
        },
        {
            id: 'updated',
            numeric: true,
            disablePadding: false,
            label: 'Updated',
        },
    ],
};

const storeReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case StoreActionTypes.GET_ALL_STORES_LIST_START:
            return {
                ...state,
                isLoading: true,
            };
        case StoreActionTypes.GET_ALL_STORES_LIST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                stores: action.payload,
                message: 'Loaded list of stores',
            };
        case StoreActionTypes.GET_ALL_STORES_LIST_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
                message: null,
                success: null,
            };
        case StoreActionTypes.GET_STORE_DETAILS_START:
            return {
                ...state,
                isLoading: true,
            };
        case StoreActionTypes.GET_STORE_DETAILS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                details: action.payload,
                message: 'Loaded store details',
            };
        case StoreActionTypes.GET_STORE_DETAILS_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
                message: null,
                success: null,
            };
        case StoreActionTypes.UPDATE_STORE_PROFILE_START:
            return {
                ...state,
                isLoading: true,
            };
        case StoreActionTypes.UPDATE_STORE_PROFILE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                success: action.payload,
                message: null,
                error: null,
            };
        case StoreActionTypes.UPDATE_STORE_PROFILE_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
                message: null,
                success: null,
            };
        case StoreActionTypes.SIGN_UP_STORE_START:
            return {
                ...state,
                isLoading: true,
            };
        case StoreActionTypes.SIGN_UP_STORE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                success: 'Successfully added store',
                message: null,
                error: null,
            };
        case StoreActionTypes.SIGN_UP_STORE_FAILURE:
            return {
                ...state,
                isLoading: false,
                success: null,
                message: null,
                error: action.payload,
            };
        case StoreActionTypes.SEARCH_STORES_FOR_TERM_START:
            return {
                ...state,
                isLoading: true,
            }
        case StoreActionTypes.SEARCH_STORES_FOR_TERM_SUCCESS:
            return {
                ...state,
                isLoading: false,
                stores: action.payload
            }
        case StoreActionTypes.SEARCH_STORES_FOR_TERM_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        default:
            return state;
    }
};

export default storeReducer;
