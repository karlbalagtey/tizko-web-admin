import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import clsx from 'clsx';

import {
    AppBar,
    Drawer,
    Toolbar,
    IconButton,
    Typography,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    CssBaseline,
    Divider,
    Button,
    Badge,
    Box,
} from '@material-ui/core';

import {
    Menu as MenuIcon,
    ChevronLeft as ChevronLeftIcon,
    Notifications as NotificationsIcon,
} from '@material-ui/icons';

import { makeStyles } from '@material-ui/core/styles';

import AlertNotification from '../../components/alert-notification/alert-notification.component';

import DashboardPage from '../../pages/dashboard/dashboard.container';
import ClientSignUpPage from '../../pages/client-sign-up/client-sign-up.container';
import ClientPage from '../../pages/client/client.component';
import AccountPage from '../../pages/account/account.component';
import SettingsPage from '../../pages/settings/settings.component';
import SubscriptionPage from '../../pages/subscription/subscription.component';
import StorePage from '../../pages/store/store.component';
import StoreSignUpPage from '../../pages/store-sign-up/store-sign-up.container';

import {
    selectAlertNotificationsSuccess,
    selectAlertNotificationsMessage,
    selectAlertNotificationsError,
    selectCurrentUser,
} from '../../redux/user/user.selector';
import { signOutStart } from '../../redux/auth/auth.actions';
import { selectMainMenu } from '../../redux/menu/menu.selectors';

import Copyright from '../copyright/copyright.component';
import { useStyles } from './main-app.styles';

const MainApp = ({
    currentUser,
    userSignout,
    mainMenu,
    error,
    message,
    success,
}) => {
    console.log(currentUser);
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AlertNotification
                success={success}
                message={message}
                error={error}
            />
            <AppBar
                position="absolute"
                className={clsx(classes.appBar, open && classes.appBarShift)}
            >
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={clsx(
                            classes.menuButton,
                            open && classes.menuButtonHidden
                        )}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        className={classes.title}
                    >
                        Tizko - Easy Goody
                    </Typography>
                    <IconButton color="inherit">
                        <Badge badgeContent={4} color="secondary">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                    <Button color="inherit" onClick={userSignout}>
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                classes={{
                    paper: clsx(
                        classes.drawerPaper,
                        !open && classes.drawerPaperClose
                    ),
                }}
                open={open}
            >
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {mainMenu.map((menu) => (
                        <ListItem
                            button
                            component={Link}
                            to={menu.link}
                            key={menu.id}
                        >
                            <ListItemIcon>{menu.icon}</ListItemIcon>
                            <ListItemText primary={menu.title} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.appBarSpacer} />

                <Switch>
                    <Route exact path="/dashboard" component={DashboardPage} />
                    <Route 
                        exact
                        path="/dashboard/store"
                        component={StorePage}
                    />
                    <Route 
                        exact
                        path="/dashboard/store-signup"
                        component={StoreSignUpPage}
                    />
                    <Route
                        exact
                        path="/dashboard/client"
                        component={ClientPage}
                    />
                    <Route
                        exact
                        path="/dashboard/client-signup"
                        component={ClientSignUpPage}
                    />
                    <Route
                        exact
                        path="/dashboard/subscriptions"
                        component={SubscriptionPage}
                    />
                    <Route
                        exact
                        path="/dashboard/account"
                        component={AccountPage}
                    />
                    <Route
                        exact
                        path="/dashboard/settings"
                        component={SettingsPage}
                    />
                </Switch>

                <Box pt={4}>
                    <Copyright />
                </Box>
            </main>
        </div>
    );
};

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    mainMenu: selectMainMenu,
    message: selectAlertNotificationsMessage,
    error: selectAlertNotificationsError,
    success: selectAlertNotificationsSuccess,
});

const mapDispatchToProps = (dispatch) => ({
    userSignout: () => dispatch(signOutStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainApp);
