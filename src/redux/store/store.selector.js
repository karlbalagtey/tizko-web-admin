import { createSelector } from 'reselect';

const selectStore = (state) => state.store;

export const selectCurrentStore = createSelector(
    [selectStore],
    (store) => store.currentStore
);

export const selectAllStores = createSelector(
    [selectStore],
    (store) => store.stores
);

export const selectIsStoreLoading = createSelector(
    [selectStore],
    (store) => store.isLoading
    
)