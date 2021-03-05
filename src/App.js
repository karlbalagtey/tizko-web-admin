import React, { useEffect, lazy, Suspense } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { CssBaseline } from '@material-ui/core';

import ErrorBoundary from './components/error-boundary/error-boundary.component';
import Spinner from './components/spinner/spinner.component';

import { selectCurrentUser } from './redux/auth/auth.selector';
import { checkUserSession } from './redux/auth/auth.actions';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import {
    MuiThemeProvider,
    StylesProvider,
    createMuiTheme,
} from '@material-ui/core/styles';
import { ThemeProvider } from 'styled-components';

const SignInPage = lazy(() => import('./pages/sign-in/sign-in.container'));
const ResetPassword = lazy(() =>
    import('./pages/reset-password/reset-password.component')
);
const MainApp = lazy(() => import('./components/main-app/main-app.component'));

const App = ({ checkUserSession, currentUser }) => {
    useEffect(() => {
        checkUserSession();
    }, [checkUserSession]);

    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const theme = React.useMemo(
        () =>
            createMuiTheme({
                palette: {
                    type: prefersDarkMode ? 'dark' : 'light',
                    secondary: {
                        main: '#007dff',
                        contrastText: '#fff',
                    },
                    primary: {
                        main: '#C15751',
                        contrastText: '#fff',
                    },
                },
            }),
        [prefersDarkMode]
    );

    return (
        <StylesProvider injectFirst>
            <MuiThemeProvider theme={theme}>
                <ThemeProvider theme={theme}>
                    <Router>
                        <CssBaseline />
                        <Switch>
                            <ErrorBoundary>
                                <Suspense fallback={<Spinner />}>
                                    <Route
                                        exact
                                        path="/"
                                        render={() =>
                                            currentUser ? (
                                                <Redirect to="/dashboard" />
                                            ) : (
                                                <SignInPage />
                                            )
                                        }
                                    />
                                    <Route
                                        path="/reset-password/:token"
                                        component={ResetPassword}
                                    />
                                    <Route
                                        path="/dashboard"
                                        render={() =>
                                            currentUser ? (
                                                <MainApp />
                                            ) : (
                                                <SignInPage />
                                            )
                                        }
                                    />
                                </Suspense>
                            </ErrorBoundary>
                        </Switch>
                    </Router>
                </ThemeProvider>
            </MuiThemeProvider>
        </StylesProvider>
    );
};

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
    checkUserSession: () => dispatch(checkUserSession()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
