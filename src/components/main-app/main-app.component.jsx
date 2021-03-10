import React, { lazy, Suspense, useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import clsx from 'clsx';
import { mainAppStyles } from './main-app.styles';

import { CssBaseline, Box } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import { selectIsMenuToggled } from '../../redux/menu/menu.selector';

import AppBarContainer from '../app-bar/app-bar.component';
import DrawerContainer from '../drawer/drawer.component';
import Copyright from '../copyright/copyright.component';
import Spinner from '../spinner/spinner.component';

const DashboardPage = lazy(() =>
    import('../../pages/dashboard/dashboard.container')
);
const StorePage = lazy(() => import('../../pages/store/store.container'));
const StoreDetailPage = lazy(() => import('../../pages/store-detail/store-detail.container'));
const StoreSignUpPage = lazy(() =>
    import('../../pages/store-sign-up/store-sign-up.container')
);
const ClientSignUpPage = lazy(() =>
    import('../../pages/client-sign-up/client-sign-up.container')
);
const ClientPage = lazy(() => import('../../pages/client/client.container'));
const AccountPage = lazy(() => import('../../pages/account/account.component'));
const SettingsPage = lazy(() =>
    import('../../pages/settings/settings.component')
);
const SubscriptionPage = lazy(() =>
    import('../../pages/subscription/subscription.component')
);

const MainApp = ({ isToggled, match }) => {
    const classes = mainAppStyles();
    const [darkState, setDarkState] = useState(false);
    const palletType = darkState ? 'dark' : 'light';
    const theme = createMuiTheme({
        palette: {
            type: palletType,
            secondary: {
                main: '#007dff',
                contrastText: '#fff',
            },
            primary: {
                main: '#C15751',
                contrastText: '#fff',
            },
        },
    });

    const handleThemeChange = () => {
        setDarkState(!darkState);
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <div className={classes.root}>
                <AppBarContainer
                    onHandleThemeChange={handleThemeChange}
                    darkState={darkState}
                />
                <DrawerContainer />
                <main
                    className={clsx(classes.content, {
                        [classes.contentShift]: isToggled,
                    })}
                >
                    <div className={classes.appBarSpacer} />

                    <Switch>
                        <Suspense fallback={<Spinner />}>
                            <Route
                                exact
                                path={`${match.path}`}
                                component={DashboardPage}
                            />
                            <Route
                                exact
                                path={`${match.path}/store`}
                                component={StorePage}
                            />
                            <Route
                                exact
                                path={`${match.path}/store/search/:keyword`}
                                component={StorePage}
                            />
                            <Route
                                exact
                                path={`${match.path}/store/:storeId`}
                                component={StoreDetailPage}
                            />
                            <Route
                                exact
                                path={`${match.path}/store-signup`}
                                component={StoreSignUpPage}
                            />
                            <Route
                                exact
                                path={`${match.path}/client`}
                                component={ClientPage}
                            />
                            <Route
                                exact
                                path={`${match.path}/client-signup`}
                                component={ClientSignUpPage}
                            />
                            <Route
                                exact
                                path={`${match.path}/subscriptions`}
                                component={SubscriptionPage}
                            />
                            <Route
                                exact
                                path={`${match.path}/account`}
                                component={AccountPage}
                            />
                            <Route
                                exact
                                path={`${match.path}/settings`}
                                component={SettingsPage}
                            />
                        </Suspense>
                    </Switch>

                    <Box pt={4}>
                        <Copyright />
                    </Box>
                </main>
            </div>
        </ThemeProvider>
    );
};

const mapStateToProps = createStructuredSelector({
    isToggled: selectIsMenuToggled,
});

export default connect(mapStateToProps, null)(MainApp);
