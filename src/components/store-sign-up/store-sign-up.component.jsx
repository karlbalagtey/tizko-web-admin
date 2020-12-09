import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import validate from 'validate.js';
import { TextField, Button } from '@material-ui/core';

import { signUpStoreStart } from '../../redux/store/store.actions';

import { makeStyles } from '@material-ui/core/styles';

const schema = {
    name: {
        presence: { allowEmpty: false, message: 'is required' },
        length: {
            maximum: 32,
        },
    },
    description: {
        presence: { allowEmpty: false, message: 'is required' },
        length: {
            maximum: 32,
        },
    },
    location: {
        presence: { allowEmpty: false, message: 'is required' },
        length: {
            maximum: 64,
        },
    },
    contactNumber: {
        presence: { allowEmpty: false, message: 'is required' },
        length: {
            maximum: 128,
        },
    },
};

const useStyles = makeStyles((theme) => ({
    textField: {
        marginTop: theme.spacing(2),
    },
    signUpButton: {
        margin: theme.spacing(2, 0),
    },
}));

const StoreSignUp = ({ storeSignUp }) => {
    const classes = useStyles();

    const [storeCredentials, setStoreCredentials] = useState({
        name: '',
        description: '',
        location: '',
        contactNumber: '',
    });

    const { name, description, location, contactNumber } = storeCredentials;

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

        const res = storeSignUp({ name, description, location, contactNumber });
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

        setStoreCredentials({ ...storeCredentials, [name]: value });
    };

    const hasError = (field) =>
        formState.touched[field] && formState.errors[field] ? true : false;

    return (
        <form onSubmit={handleSubmit}>
            <h1>Create store account</h1>
            <TextField
                className={classes.textField}
                error={hasError('name')}
                fullWidth
                helperText={
                    hasError('name')
                        ? formState.errors.name[0]
                        : null
                }
                label="Store name"
                name="name"
                onChange={handleChange}
                type="text"
                value={formState.values.name || ''}
                variant="outlined"
            />
            <TextField
                className={classes.textField}
                error={hasError('description')}
                fullWidth
                helperText={
                    hasError('description')
                        ? formState.errors.description[0]
                        : null
                }
                label="Short description"
                name="description"
                onChange={handleChange}
                type="text"
                value={formState.values.description || ''}
                variant="outlined"
            />
            <TextField
                className={classes.textField}
                error={hasError('location')}
                fullWidth
                helperText={
                    hasError('location')
                        ? formState.errors.location[0]
                        : null
                }
                label="Address"
                name="location"
                onChange={handleChange}
                type="text"
                value={formState.values.location || ''}
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
    );
};

const mapDispatchToProps = (dispatch) => ({
    storeSignUp: (storeCredentials) => dispatch(signUpStoreStart(storeCredentials)),
});

export default connect(null, mapDispatchToProps)(StoreSignUp);
