import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import AccountProfile from '../../components/account/account-profile.component';
import AccountDetails from '../../components/account/account-details.component';
import { selectCurrentUser } from '../../redux/user/user.selector';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(4),
    },
}));

const Account = ({ currentUser }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {currentUser && (
                <Grid container spacing={4}>
                    <Grid item lg={4} md={6} xl={4} xs={12}>
                        <AccountProfile currentUser={currentUser} />
                    </Grid>
                    <Grid item lg={8} md={6} xl={8} xs={12}>
                        <AccountDetails currentUser={currentUser} />
                    </Grid>
                </Grid>
            )}
        </div>
    );
};

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
});

export default connect(mapStateToProps, null)(Account);
