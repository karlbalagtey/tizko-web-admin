import React from 'react';

import {
    Grid,
    Container
} from '@material-ui/core';

import StoreSignUp from '../../components/store-sign-up/store-sign-up.component';

const StoreSignUpPage = () => (
    <Container>
        <Grid container>
            <Grid item xs={12} sm={8}>
                <StoreSignUp />
            </Grid>
        </Grid>
    </Container>
);

export default StoreSignUpPage;