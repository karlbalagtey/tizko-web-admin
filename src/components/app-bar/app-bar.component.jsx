import React, { useState } from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';
import { createStructuredSelector } from 'reselect';
import {
    AppBar,
    Toolbar,
    IconButton,
    Badge,
    Button,
    Switch,
    Tooltip,
    Divider
} from '@material-ui/core';

import {
    Notifications as NotificationsIcon,
} from '@material-ui/icons';

import {
    signOutStart
} from '../../redux/auth/auth.actions';

import {
    selectIsMenuToggled
} from '../../redux/menu/menu.selector';

import { appBarStyles } from './app-bar.styles';

const AppBarContainer = ({ userSignout, isToggled, darkState, onHandleThemeChange }) => {
    const classes = appBarStyles();

    return (
        <AppBar
            position="absolute"
            className={clsx(classes.appBar, isToggled && classes.appBarShift)}
        >
            <Toolbar className={classes.toolbar}>
                <section className={classes.marginLeft}>
                    <Tooltip title={darkState ? "Light mode" : "Dark mode"}>
                        <Switch checked={darkState} onChange={onHandleThemeChange} />
                    </Tooltip>
                    <Tooltip title="Notifications">
                        <IconButton color="inherit">
                            <Badge badgeContent={4} color="secondary">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                    </Tooltip>
                    <Button color="inherit" onClick={userSignout}>
                        Logout
                    </Button>
                </section>
            </Toolbar>
        </AppBar>
    );
};

const mapStateToProps = createStructuredSelector({
    isToggled: selectIsMenuToggled
});

const mapDispatchToProps = (dispatch) => ({
    userSignout: () => dispatch(signOutStart())
})

export default connect(mapStateToProps, mapDispatchToProps)(AppBarContainer);