import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

export default function tizkoNotify(props) {
    const { type, autoHideDuration, message, vertical, horizontal } = props;

    const addNotification = (props) => {
        return <AlertNotification props />
    };

    const Alert = (props) => {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    };

    const AlertNotification = (props) => {
        const [openStatus, setOpenStatus] = useState(true);

        const handleCloseStatus = (event, reason) => {
            if (reason === 'clickaway') {
                return;
            }

            setOpenStatus(false);
        };

        return (
            <Snackbar
                anchorOrigin={{ vertical: vertical, horizontal: horizontal }}
                open={openStatus}
                autoHideDuration={autoHideDuration}
                onClose={handleCloseStatus}
                // eslint-disable-next-line
                key={vertical + horizontal}
            >
                <Alert onClose={handleCloseStatus} severity={type}>
                    {message}
                </Alert>
            </Snackbar>
        );
    };

    return {
        addNotification
    }
}

tizkoNotify.propTypes = {
    type: PropTypes.string,
    message: PropTypes.string,
    autoHideDuration: PropTypes.number,
    vertical: PropTypes.string,
    horiontal: PropTypes.string,
};

tizkoNotify.defaultProps = {
    type: 'success',
    message: 'Success',
    autoHideDuration: 4000,
    vertical: 'bottom',
    horiontal: 'center',
};