import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "./user/user.reducer";
import authReducer from "./auth/auth.reducer";
import storeReducer from "./store/store.reducer";
import dashboardReducer from "./dashboard/dashboard.reducer";
import menuReducer from "./menu/menu.reducer";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["auth"]
};

const rootReducer = combineReducers({
    user: userReducer,
    auth: authReducer,
    dashboard: dashboardReducer,
    menu: menuReducer,
    store: storeReducer,
});

export default persistReducer(persistConfig, rootReducer);
