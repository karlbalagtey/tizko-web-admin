import React, { useState } from 'react';
import { connect } from 'react-redux';

import {
    Button,
    TextField,
    FormControlLabel,
    Checkbox,
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

import {
    emailSignInStart
} from '../../redux/auth/auth.actions';

import {
    SignInContainer,
    SignInTitle,
    FormContainer
} from './sign-in.styles';

import logo from '../../assets/eslogo.png';
import ForgotPasswordDialog from '../forgot-password/forgot-password.component';

const SignIn = ({ emailSignInStart }) => {
    const [userCredentials, setUserCredentials] = useState({
        email: '',
        password: '',
    });
    const { email, password } = userCredentials;
    const theme = useTheme();

    const handleSubmitSignIn = async (event) => {
        event.preventDefault();

        await emailSignInStart(email, password);
    };

    const handleChange = (event) => {
        const { value, name } = event.target;

        setUserCredentials({ ...userCredentials, [name]: value });
    };

    return (
        <SignInContainer>
            <img src={logo} alt="Easy Goody Logo" />
            <SignInTitle theme={theme}>Tizko</SignInTitle>

            <FormContainer onSubmit={handleSubmitSignIn} theme={theme}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={handleChange}
                    autoFocus
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={handleChange}
                />
                <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                />
                <Button
                    size="large"
                    fullWidth
                    variant="contained"
                    color="primary"
                    type="submit"
                >
                    Sign in
                </Button>
            </FormContainer>

            <ForgotPasswordDialog />
        </SignInContainer>
    );
};

const mapDispatchToProps = (dispatch) => ({
    emailSignInStart: (email, password) =>
        dispatch(emailSignInStart({ email, password })),
});

export default connect(null, mapDispatchToProps)(SignIn);
