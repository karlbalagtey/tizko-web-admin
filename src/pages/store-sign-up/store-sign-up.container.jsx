import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectIsUserSubmitting } from '../../redux/user/user.selector';
import Spinner from '../../components/spinner/spinner.component';
import StoreSignUpPage from './store-sign-up.component';

import { Grid, Container } from '@material-ui/core';



const StoreSignUpPageContainer = ({ isLoading }) => {
    return isLoading ? (
        <Spinner />
    ) : (
        <Container>
            <Grid container>
                <Grid item xs={12} sm={8}>
                    <StoreSignUpPage />
                </Grid>
            </Grid>
        </Container>
    );
};

const mapStateToProps = createStructuredSelector({
    isLoading: (state) => selectIsUserSubmitting(state),
});

export default connect(mapStateToProps, null)(StoreSignUpPageContainer);
