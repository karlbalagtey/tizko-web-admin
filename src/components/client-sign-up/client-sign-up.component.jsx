import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import validate from 'validate.js';
import { TextField, Button } from '@material-ui/core';

import { signUpClientStart } from '../../redux/user/user.actions';

import { makeStyles } from '@material-ui/core/styles';

const schema = {
    firstName: {
        presence: { allowEmpty: false, message: 'is required' },
        length: {
            maximum: 32,
        },
    },
    lastName: {
        presence: { allowEmpty: false, message: 'is required' },
        length: {
            maximum: 32,
        },
    },
    email: {
        presence: { allowEmpty: false, message: 'is required' },
        email: true,
        length: {
            maximum: 64,
        },
    },
    password: {
        presence: { allowEmpty: false, message: 'is required' },
        length: {
            maximum: 128,
        },
    },
};

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.default,
        height: '100%',
    },
    grid: {
        height: '100%',
    },
    form: {
        maxWidth: '50%',
    },
    contentBody: {
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
        [theme.breakpoints.down('md')]: {
            justifyContent: 'center',
        },
    },
    title: {
        marginTop: theme.spacing(3),
    },
    textField: {
        marginTop: theme.spacing(2),
    },
    signUpButton: {
        margin: theme.spacing(2, 0),
    },
}));

const ClientSignUp = ({ clientSignUp }) => {
    const classes = useStyles();

    const [userCredentials, setUserCredentials] = useState({
        firstName: '',
        lastName: '',
        email: '',
        contactNumber: '',
        password: '',
        confirmPassword: '',
    });

    const { firstName, lastName, email, password, confirmPassword, contactNumber } = userCredentials;

    const [formState, setFormState] = useState({
        isValid: false,
        values: {},
        touched: {},
        errors: {},
    });

    useEffect(() => {
        const errors = validate(formState.values, schema);

        setFormState((formState) => ({
            ...formState,
            isValid: errors ? false : true,
            errors: errors || {},
        }));
    }, [formState.values]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert('passwords dont match');
            return;
        }
        setFormState((formState) => ({
            ...formState,
            values: {
                ...formState.values,
                [event.target.name]:
                    event.target.type === 'checkbox'
                        ? event.target.checked
                        : event.target.value,
            },
            touched: {
                ...formState.touched,
                [event.target.name]: true,
            },
        }));

        const res = clientSignUp({ firstName, lastName, email, password, confirmPassword, contactNumber });
        console.log(res);
    };

    const handleChange = (event) => {
        event.persist();

        const { name, value } = event.target;

        setFormState((formState) => ({
            ...formState,
            values: {
                ...formState.values,
                [event.target.name]:
                    event.target.type === 'checkbox'
                        ? event.target.checked
                        : event.target.value,
            },
            touched: {
                ...formState.touched,
                [event.target.name]: true,
            },
        }));

        setUserCredentials({ ...userCredentials, [name]: value });
    };

    const hasError = (field) =>
        formState.touched[field] && formState.errors[field] ? true : false;

    return (
        <div className={classes.root}>
            <div className={classes.content}>
                <div className={classes.contentBody}>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <h1>Create client account</h1>
                        <TextField
                            className={classes.textField}
                            error={hasError('firstName')}
                            fullWidth
                            helperText={
                                hasError('firstName')
                                    ? formState.errors.firstName[0]
                                    : null
                            }
                            label="First name"
                            name="firstName"
                            onChange={handleChange}
                            type="text"
                            value={formState.values.firstName || ''}
                            variant="outlined"
                        />
                        <TextField
                            className={classes.textField}
                            error={hasError('lastName')}
                            fullWidth
                            helperText={
                                hasError('lastName')
                                    ? formState.errors.lastName[0]
                                    : null
                            }
                            label="Last name"
                            name="lastName"
                            onChange={handleChange}
                            type="text"
                            value={formState.values.lastName || ''}
                            variant="outlined"
                        />
                        <TextField
                            className={classes.textField}
                            error={hasError('email')}
                            fullWidth
                            helperText={
                                hasError('email')
                                    ? formState.errors.email[0]
                                    : null
                            }
                            label="Email address"
                            name="email"
                            onChange={handleChange}
                            type="text"
                            value={formState.values.email || ''}
                            variant="outlined"
                            required={true}
                        />
                        <TextField
                            className={classes.textField}
                            error={hasError('contactNumber')}
                            fullWidth
                            helperText={
                                hasError('contactNumber')
                                    ? formState.errors.contactNumber[0]
                                    : null
                            }
                            label="Contact number"
                            name="contactNumber"
                            onChange={handleChange}
                            type="text"
                            value={formState.values.contactNumber || ''}
                            variant="outlined"
                            required={true}
                        />
                        <TextField
                            className={classes.textField}
                            error={hasError('password')}
                            fullWidth
                            helperText={
                                hasError('password')
                                    ? formState.errors.password[0]
                                    : null
                            }
                            label="Password"
                            name="password"
                            onChange={handleChange}
                            type="password"
                            value={formState.values.password || ''}
                            variant="outlined"
                            required={true}
                        />
                        <TextField
                            className={classes.textField}
                            fullWidth
                            helperText={
                                hasError('password')
                                    ? formState.errors.password[0]
                                    : null
                            }
                            variant="outlined"
                            type="password"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={handleChange}
                            label="Confirm Password"
                            required={true}
                        />
                        <Button
                            className={classes.signUpButton}
                            color="primary"
                            disabled={!formState.isValid}
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained"
                        >
                            Sign up now
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => ({
    clientSignUp: (userCredentials) => dispatch(signUpClientStart(userCredentials)),
});

export default connect(null, mapDispatchToProps)(ClientSignUp);
