import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { selectErrorSnack, selectMessageSnack } from '../../redux/notify/notify.selector';
import { notifyReset } from '../../redux/notify/notify.actions';

const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const AlertNotification = (notify) => {
    const dispatch = useDispatch();
    const [openStatus, setOpenStatus] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const handleCloseStatus = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(notifyReset());
        setOpenStatus(false);
    };

    useEffect(() => {
        console.log(notify);
        if (notify.notify !== null) {
            setAlertMessage(notify.notify);
            setOpenStatus(true);
        }

        if (notify.msg !== null) {
            setAlertMessage(notify.msg);
            setOpenStatus(true);
        }
    }, [notify])

    return (
        <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            open={openStatus}
            autoHideDuration={4000}
            onClose={handleCloseStatus}
            // eslint-disable-next-line
            key={'bottom' + 'right'}
        >
            <Alert onClose={handleCloseStatus} severity={notify.notify ? 'error' : 'success'}>
                {alertMessage}
            </Alert>
        </Snackbar>
    );
};

const mapStateToProps = createStructuredSelector({
    notify: selectErrorSnack,
    msg: selectMessageSnack,
});

export default connect(mapStateToProps, null)(AlertNotification);