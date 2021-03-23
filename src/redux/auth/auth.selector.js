import { createSelector } from 'reselect';

const selectAuth = (state) => state.auth;

export const selectCurrentUser = createSelector(
    [selectAuth],
    (auth) => auth.currentUser
);

export const selectCurrentUserRole = createSelector(
    [selectAuth],
    (currentUser) => (currentUser ? currentUser.role : null)
);

export const selectIsUserSubmitting = createSelector(
    [selectAuth],
    (auth) => auth.isSubmitting
);

export const selectAlertNotificationsMessage = createSelector(
    [selectAuth],
    (auth) => auth.message
);

export const selectAlertNotificationsSuccess = createSelector(
    [selectAuth],
    (auth) => auth.success
);

export const selectAlertNotificationsError = createSelector(
    [selectAuth],
    (auth) => auth.error
);
