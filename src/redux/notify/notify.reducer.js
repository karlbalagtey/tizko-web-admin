import NotifyActionTypes from './notify.types';

const INITIAL_STATE = {
    error: null,
    message: null,
    success: null,
};

const notifyReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case NotifyActionTypes.NOTIFY_SUCCESS:
            return {
                ...state,
                message: action.payload,
                success: true,
                error: null,
            };
        case NotifyActionTypes.NOTIFY_ERROR:
            return {
                ...state,
                message: null,
                error: action.payload,
                success: null,
            };
        case NotifyActionTypes.NOTIFY_RESET:
            return {
                ...state,
                message: null,
                error: null,
                success: null,
            }
        default:
            return state;
    }
};

export default notifyReducer;
