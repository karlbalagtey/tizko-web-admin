import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { drawerStyles } from './drawer.styles';
import clsx from 'clsx';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { toggleDrawer } from '../../redux/menu/menu.actions';
import {
    selectIsMenuToggled,
    selectMainMenu,
} from '../../redux/menu/menu.selector';

import {
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Typography,
} from '@material-ui/core';

import { ChevronLeft as ChevronLeftIcon } from '@material-ui/icons';
import { ChevronRight as ChevronRightIcon } from '@material-ui/icons';

const DrawerContainer = ({ mainMenu, toggleMenuDrawer, isToggled }) => {
    const classes = drawerStyles();
    const { pathname } = useLocation();

    return (
        <Drawer
            variant="permanent"
            classes={{
                paper: clsx(
                    classes.drawerPaper,
                    !isToggled && classes.drawerPaperClose
                ),
            }}
            open={isToggled}
        >
            <div className={classes.toolbarIcon}>
                <Typography
                    component="h1"
                    variant="h6"
                    color="inherit"
                    noWrap
                    className={classes.title}
                >
                    TIZKO
                </Typography>
                <IconButton onClick={toggleMenuDrawer}>
                    {isToggled ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
            </div>
            <List>
                {mainMenu.map((menu) => (
                    <ListItem
                        button
                        component={Link}
                        to={menu.link}
                        key={menu.id}
                        selected={pathname === menu.link ? true : false}
                    >
                        <ListItemIcon>{menu.icon}</ListItemIcon>
                        <ListItemText primary={menu.title} />
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
};

const mapStateToProps = createStructuredSelector({
    mainMenu: selectMainMenu,
    isToggled: selectIsMenuToggled,
});

const mapDispatchToProps = (dispatch) => ({
    toggleMenuDrawer: () => dispatch(toggleDrawer()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContainer);
