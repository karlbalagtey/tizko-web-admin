import NotifyActionTypes from '../notify/notify.types';

export const notifyError = (error) => ({
    type: NotifyActionTypes.NOTIFY_ERROR,
    payload: error,
});

export const notifyMessage = (message) => ({
    type: NotifyActionTypes.NOTIFY_SUCCESS,
    payload: message,
});