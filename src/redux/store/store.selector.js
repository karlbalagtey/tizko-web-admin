import { createSelector } from 'reselect';

const selectStore = (state) => state.store;

export const selectCurrentStore = createSelector(
    [selectStore],
    (store) => store.details
);

export const selectAllStores = createSelector(
    [selectStore],
    (store) => store.stores
);

export const selectIsStoreLoading = createSelector(
    [selectStore],
    (store) => store.isLoading
    
)

export const selectAllHeadCells = createSelector(
    [selectStore],
    (store) => store.headCells
)