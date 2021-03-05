import { createSelector } from "reselect";

const selectMenu = state => state.menu;

export const selectMainMenu = createSelector(
    [selectMenu],
    menu => menu.menu
);

export const selectIsMenuToggled = createSelector(
    [selectMenu],
    menu => menu.isToggled
)