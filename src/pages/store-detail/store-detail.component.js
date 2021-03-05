import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { Grid, Container, Paper, Typography } from "@material-ui/core";

import { selectCurrentStore } from '../../redux/store/store.selector';
import PrimarySearchAppBar from '../../components/sub-bar/sub-bar.component';
import { useStyles } from './store-detail.styles';

const StoreDetailPage = ({ store }) => {
    const classes = useStyles();

    return (
        <Fragment>
            {store && (
                <Fragment>
                    <PrimarySearchAppBar title={store.data.name} />
                    <Container maxWidth="lg">
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={8} lg={9}>
                                <Paper className={classes.paper}>
                                    <Typography component="h2" variant="h6" gutterBottom>
                                        Number of products
                                    </Typography>
                                    <Typography component="p" variant="h4">
                                        {store.data.products.length}
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={4} lg={3}>
                                <Paper className={classes.paper}>
                                    <Typography component="h2" variant="h6" gutterBottom>
                                        Number of customers
                                    </Typography>
                                    <Typography component="p" variant="h4">
                                        {store.data.customers.length}
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={12}>
                                <Paper className={classes.paper}>
                                    <Typography component="h2" variant="h6" gutterBottom>
                                        Number of Administrators
                                    </Typography>
                                    <Typography component="p" variant="h4">
                                        {store.data.admins.length}
                                    </Typography>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>
                </Fragment>
            )}
        </Fragment>

    )
}

const mapStateToProps = createStructuredSelector({
    store: selectCurrentStore
});

export default connect(mapStateToProps, null)(StoreDetailPage);
