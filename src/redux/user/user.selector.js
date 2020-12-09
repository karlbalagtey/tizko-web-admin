import { createSelector } from 'reselect';

const selectUser = (state) => state.user;
const selectAuth = (state) => state.auth;

export const selectCurrentUser = createSelector(
    [selectAuth],
    (auth) => auth.currentUser
);

export const selectAllClients = createSelector(
    [selectUser],
    (user) => user.clients
);

export const selectCurrentUserRole = createSelector(
    [selectUser],
    (currentUser) => (currentUser ? currentUser.role : null)
);

export const selectIsUserSubmitting = createSelector(
    [selectAuth],
    (auth) => auth.isSubmitting
);

export const selectIsUserAccessing = createSelector(
    [selectUser],
    (user) => user.isSubmitting
);

export const selectAlertNotificationsMessage = createSelector(
    [selectUser],
    (user) => user.message
);

export const selectAlertNotificationsSuccess = createSelector(
    [selectUser],
    (user) => user.success
);

export const selectAlertNotificationsError = createSelector(
    [selectUser],
    (user) => user.error
);
