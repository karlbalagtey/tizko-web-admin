import React from 'react';
import PropTypes from 'prop-types';
import AlertNotification from './alert-notification.component';

export default function tizkoNotify(props) {
    const { type, autoHideDuration, message, vertical, horizontal } = props;

    const addNotification = (props) => {
        return <AlertNotification props={props} />
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