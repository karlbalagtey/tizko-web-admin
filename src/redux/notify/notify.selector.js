import { createSelector } from 'reselect';

const selectNotify = (state) => state.notify;

export const selectErrorSnack = createSelector(
    [selectNotify],
    (notify) => notify.error
);

export const selectMessageSnack = createSelector(
    [selectNotify],
    (notify) => notify.message
);

export const selectSuccessSnack = createSelector(
    [selectNotify],
    (notify) => notify.success
);
