import React, { Suspense, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import clsx from 'clsx';
import { mainAppStyles } from './admin.styles';

import { CssBaseline, Box } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import { selectIsMenuToggled } from '../../redux/menu/menu.selector';

import AppBarContainer from '../../components/app-bar/app-bar.component';
import DrawerContainer from '../../components/drawer/drawer.component';
import Copyright from '../../components/copyright/copyright.component';
import Spinner from '../../components/spinner/spinner.component';

import routes from '../../routes';

const Admin = ({ isToggled, match }) => {
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
                            { routes.map(route => {
                                return (
                                    <Route
                                        key={route.id}
                                        exact
                                        path={route.link}
                                        component={() => route.main}
                                    />
                                )
                                }
                            )
                                
                            }
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

export default connect(mapStateToProps, null)(Admin);
