import NotifyActionTypes from './notify.types';

const INITIAL_STATE = {
    error: null,
    message: null,
};

const notifyReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case NotifyActionTypes.NOTIFY_SUCCESS:
            return {
                ...state,
                message: action.payload,
                error: null,
            };
        case NotifyActionTypes.NOTIFY_ERROR:
            return {
                ...state,
                message: null,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default notifyReducer;
