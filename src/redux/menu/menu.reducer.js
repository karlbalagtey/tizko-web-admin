import MenuActionTypes from "./menu.types";
import menuNav from '../../data/menuNav';

const INITIAL_STATE = {
    menu: menuNav,
    isToggled: true
};

const menuReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case MenuActionTypes.TOGGLE_DRAWER:
            return {
                ...state,
                isToggled: !state.isToggled
            }
        default:
            return state;
    }
};

export default menuReducer;
