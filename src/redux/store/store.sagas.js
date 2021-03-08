import { takeLatest, put, all, call } from 'redux-saga/effects';

import StoreActionTypes from './store.types';

import {
    getStoreDetailsSuccess,
    getStoreDetailsFailure,
    getAllStoresListFailure,
    getAllStoresListSuccess,
    signUpStoreSuccess,
    signUpStoreFailure,
} from './store.actions';

import {
    tizkoUpdateStoreProfile,
    tizkoCreateNewStore,
    tizkoGetAllStores,
    tizkoGetStoreDetails,
    tizkoSearchForStores
} from '../../api/tizko-api-stores';

export function* signUpStore({
    payload: { name, description, contactNumber, location },
}) {
    try {
        const { store } = yield tizkoCreateNewStore(
            name,
            description,
            contactNumber,
            location
        );
        yield put(
            signUpStoreSuccess({
                store,
            })
        );
    } catch (error) {
        console.log(error.response.data.error);
        yield put(signUpStoreFailure(error.response.data.error));
    }
}

export function* getAllStoresList(query) {
    try {
        const { data } = yield tizkoGetAllStores(query);
        yield put(getAllStoresListSuccess(data));
    } catch (error) {
        console.log(error);
        yield put(getAllStoresListFailure(error));
    }
}

export function* getStoreDetailsPage({ payload: storeId }) {
    try {
        console.log(storeId);

        const { data } = yield tizkoGetStoreDetails(storeId);
        yield put(getStoreDetailsSuccess(data));
    } catch (error) {
        console.log(error);
        yield put(getStoreDetailsFailure(error));
    }
}

export function* searchForStoreTerm({ payload: term }) {
    try {
        let stores;
        const keyword = term || false;
        console.log(keyword);

        if (!keyword) {
            stores = yield tizkoGetAllStores();
        } else {
            stores = yield tizkoSearchForStores(term);
        }
        
        console.log(stores);

        const { data } = stores;
        
        yield put(getAllStoresListSuccess(data));
    } catch (error) {
        console.log(error);
        yield put(getAllStoresListFailure(error));
    }
}

export function* updateStoreProfile({ payload: { userCredentials } }) {
    try {
        const res = yield tizkoUpdateStoreProfile(userCredentials);
        console.log(res);
    } catch (error) {
        console.log(error);
    }
}

export function* onSignUpStoreStart() {
    yield takeLatest(StoreActionTypes.SIGN_UP_STORE_START, signUpStore);
}

export function* onUpdateStoreProfileStart() {
    yield takeLatest(
        StoreActionTypes.UPDATE_STORE_PROFILE_START,
        updateStoreProfile
    );
}

export function* onGetAllStoresListStart() {
    yield takeLatest(
        StoreActionTypes.GET_ALL_STORES_LIST_START,
        getAllStoresList
    );
}

export function* onGetStoreDetailsStart() {
    yield takeLatest(
        StoreActionTypes.GET_STORE_DETAILS_START,
        getStoreDetailsPage
    );
}

export function* onSearchStoreForTermStart() {
    yield takeLatest(
        StoreActionTypes.SEARCH_STORES_FOR_TERM_START,
        searchForStoreTerm
    );
}

export function* storeSagas() {
    yield all([
        call(onSignUpStoreStart),
        call(onGetAllStoresListStart),
        call(onGetStoreDetailsStart),
        call(onSearchStoreForTermStart),
    ]);
}
