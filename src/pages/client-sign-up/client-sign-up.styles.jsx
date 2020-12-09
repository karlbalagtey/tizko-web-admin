import React from 'react';
import styled from "styled-components";
import {
    Grid,
    Container
} from '@material-ui/core';

export const ClientSignUpContainer = styled(({ className, ...props }) => (
    <Container {...props} classes={{ paper: className }} />
))``;

export const ClientSignUpGrid = styled(({ className, ...props }) => (
    <Grid {...props} classes={{ paper: className }} />
))``;
