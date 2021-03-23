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

import { signOutStart } from '../auth/auth.actions';

import {
    tizkoUpdateStoreProfile,
    tizkoCreateNewStore,
    tizkoGetAllStores,
    tizkoGetStoreDetails,
    tizkoSearchForStores,
} from '../../api/tizko-api-stores';

import { notifyError, notifySuccess } from '../notify/notify.actions';

export function* signUpStore({
    payload: { name, description, contactNumber, location, history },
}) {
    try {
        const { data } = yield tizkoCreateNewStore(
            name,
            description,
            contactNumber,
            location
        );
        yield put(signUpStoreSuccess(data));
        yield put(notifySuccess('Added new store'));
        history.push(`/dashboard/store/${data.id}`);
    } catch (error) {
        console.log(error.response.data.error);
        yield put(signUpStoreFailure(error.response.data.error));
    }
}

export function* getAllStoresList({ payload: query }) {
    try {
        let stores;
        const keyword = query.name || false;
        if (!keyword) {
            stores = yield tizkoGetAllStores(query);
        } else {
            stores = yield tizkoGetAllStores(keyword);
        }
        const { data } = stores;

        yield put(getAllStoresListSuccess(data));
    } catch (error) {
        yield put(notifyError(error));
        yield put(signOutStart());
    }
}

export function* getStoreDetailsPage({ payload: storeId }) {
    try {
        const { data } = yield call(tizkoGetStoreDetails, storeId);
        yield put(getStoreDetailsSuccess(data));
    } catch (error) {
        console.log(error);
        yield put(getStoreDetailsFailure(error));
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
        getAllStoresList
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
