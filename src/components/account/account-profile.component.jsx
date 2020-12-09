import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUser } from '../../redux/user/user.selector';
import { updateUserProfile } from '../../redux/user/user.actions';

import { makeStyles } from '@material-ui/styles';
import {
    Card,
    CardActions,
    CardContent,
    Avatar,
    Divider,
    Button,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {},
    details: {
        display: 'flex',
        justifyContent: 'center'
    },
    avatar: {
        height: 110,
        width: 100,
        flexShrink: 0,
        flexGrow: 0,
    },
    uploadButton: {
        marginRight: theme.spacing(2),
    },
}));

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

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
});

// const mapDispatchToProps = (dispatch) => ({
//   updateAccountProfile: (userCredentials) => dispatch(updateUserProfile()),
// });

export default connect(mapStateToProps, null)(AccountProfile);
