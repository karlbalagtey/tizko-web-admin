import MenuActionTypes from "./menu.types";

export const toggleDrawer = (isToggled) => ({
    type: MenuActionTypes.TOGGLE_DRAWER,
    payload: isToggled,
});
