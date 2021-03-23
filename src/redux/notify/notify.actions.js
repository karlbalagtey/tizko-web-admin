import NotifyActionTypes from '../notify/notify.types';

export const notifyError = (error) => ({
    type: NotifyActionTypes.NOTIFY_ERROR,
    payload: error,
});

export const notifySuccess = (message) => ({
    type: NotifyActionTypes.NOTIFY_SUCCESS,
    payload: message,
});

export const notifyMessage = (message) => ({
    type: NotifyActionTypes.NOTIFY_SUCCESS,
    payload: message,
});

export const notifyReset = () => ({
    type: NotifyActionTypes.NOTIFY_RESET,
});
