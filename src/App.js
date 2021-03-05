import React, { useEffect, lazy, Suspense } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import ErrorBoundary from './components/error-boundary/error-boundary.component';
import Spinner from './components/spinner/spinner.component';

import { selectCurrentUser } from './redux/auth/auth.selector';
import { checkUserSession } from './redux/auth/auth.actions';

const SignInPage = lazy(() => import('./pages/sign-in/sign-in.container'));
const ResetPassword = lazy(() =>
    import('./pages/reset-password/reset-password.component')
);
const MainApp = lazy(() => import('./components/main-app/main-app.component'));

const App = ({ checkUserSession, currentUser }) => {
    useEffect(() => {
        checkUserSession();
    }, [checkUserSession]);

    return (
        <Router>
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
                                currentUser ? <MainApp /> : <SignInPage />
                            }
                        />
                    </Suspense>
                </ErrorBoundary>
            </Switch>
        </Router>
    );
};

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
    checkUserSession: () => dispatch(checkUserSession()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
