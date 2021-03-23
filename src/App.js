import React, { useEffect, lazy, Suspense } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import ErrorBoundary from './components/error-boundary/error-boundary.component';
import Spinner from './components/spinner/spinner.component';

import { selectCurrentUser } from './redux/auth/auth.selector';
import { checkUserSession } from './redux/auth/auth.actions';

import AlertNotification from './components/alert-notification/alert-notification.component';

const SignInPage = lazy(() => import('./pages/sign-in/sign-in.container'));
const ResetPassword = lazy(() =>
    import('./pages/reset-password/reset-password.component')
);
const Admin = lazy(() => import('./layouts/admin/admin.component'));

const App = ({ checkUserSession, currentUser }) => {
    useEffect(() => {
        checkUserSession();
    }, [checkUserSession]);

    const theme = createMuiTheme({
        palette: {
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

    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Switch>
                    <ErrorBoundary>
                        <AlertNotification />
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
                                render={({match}) =>
                                    currentUser ? <Admin match={match} /> : <SignInPage />
                                }
                            />
                        </Suspense>
                    </ErrorBoundary>
                </Switch>
            </Router>
        </ThemeProvider>
    );
};

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
    checkUserSession: () => dispatch(checkUserSession()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
