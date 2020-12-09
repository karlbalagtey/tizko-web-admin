import React from 'react';
import { connect } from 'react-redux';

import AlertNotification from '../../components/alert-notification/alert-notification.component';
import DashboardMain from '../../components/dashboard/dashboard-main.component';

const Dashboard = ({ message, success, error }) => {
    return (
        <div>
            <AlertNotification 
                success={success} 
                message={message} 
                error={error} 
            />
            <DashboardMain />
        </div>
    );
};

const mapStateToProps = (state) => ({
    message: state.auth.message,
    success: state.auth.success,
    error: state.auth.error,
});

export default connect(mapStateToProps, null)(Dashboard);
