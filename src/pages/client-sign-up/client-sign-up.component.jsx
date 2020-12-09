import React from 'react';

import ClientSignUp from '../../components/client-sign-up/client-sign-up.component';

import { ClientSignUpContainer, ClientSignUpGrid } from './client-sign-up.styles';

const ClientSignUpPage = () => (
    <ClientSignUpContainer>
        <ClientSignUpGrid>
            <ClientSignUp />
        </ClientSignUpGrid>
    </ClientSignUpContainer>
);

export default ClientSignUpPage;