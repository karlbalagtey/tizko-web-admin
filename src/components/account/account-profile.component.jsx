import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUser } from '../../redux/user/user.selector';
import { updateUserProfile } from '../../redux/user/user.actions';

import {
    Card,
    CardActions,
    CardContent,
    Avatar,
    Divider,
    Button,
    Typography,
} from '@material-ui/core';

import { useStyles } from './account-profile.styles';

const AccountProfile = ({ currentUser }) => {
    const classes = useStyles();

    const user = {
        avatar: '/images/avatars/avatar_11.png',
    };

    return (
        <Card>
            <CardContent>
                <div className={classes.details}>
                    <Avatar className={classes.avatar} src={user.avatar} />
                </div>
                <Typography gutterBottom variant="h5" component="h2">
                    {currentUser.firstName} {currentUser.lastName}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    Role: {currentUser.role}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {currentUser.email}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    {currentUser.billingAddress}
                </Typography>
            </CardContent>
            <Divider />
            <CardActions>
                <Button
                    className={classes.uploadButton}
                    color="primary"
                    variant="text"
                >
                    Upload picture
                </Button>
                <Button variant="text">Remove picture</Button>
            </CardActions>
        </Card>
    );
};

// const mapDispatchToProps = (dispatch) => ({
//   updateAccountProfile: (userCredentials) => dispatch(updateUserProfile()),
// });

export default connect(null, null)(AccountProfile);
