import { all, call } from "redux-saga/effects";

import { userSagas } from "./user/user.sagas";
import { authSagas } from "./auth/auth.sagas";
import { storeSagas } from "./store/store.sagas";

export default function* rootSaga() {
    yield all([
        call(userSagas),
        call(authSagas),
        call(storeSagas),
    ]);
}
