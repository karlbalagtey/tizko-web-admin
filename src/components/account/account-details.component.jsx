import React, { useState } from "react";

import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Divider,
    Grid,
    Button,
    TextField,
} from "@material-ui/core";

const AccountDetails = ({ currentUser }) => {
    const [user, setUser] = useState({ 
        firstName: currentUser.firstName, 
        lastName: currentUser.lastName,
        email: currentUser.email,
        contactNumber: currentUser.contactNumber
    });

    const handleChange = (event) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value,
        });
    };

    return (
        <Card>
            <form autoComplete="off" noValidate>
                <CardHeader
                    subheader="The information can be edited"
                    title="Profile"
                />
                <Divider />
                <CardContent>
                    <Grid container spacing={3}>
                        <Grid item md={6} xs={12}>
                            <TextField
                                fullWidth
                                helperText="Please specify the first name"
                                label="First name"
                                margin="dense"
                                name="firstName"
                                onChange={handleChange}
                                required
                                value={user.firstName}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField
                                fullWidth
                                label="Last name"
                                margin="dense"
                                name="lastName"
                                onChange={handleChange}
                                required
                                value={user.lastName}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField
                                fullWidth
                                label="Email Address"
                                margin="dense"
                                name="email"
                                onChange={handleChange}
                                required
                                value={user.email}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField
                                fullWidth
                                label="Contact Number"
                                margin="dense"
                                name="contactNumber"
                                onChange={handleChange}
                                required
                                value={user.contactNumber}
                                variant="outlined"
                            />
                        </Grid>
                    </Grid>
                </CardContent>
                <Divider />
                <CardActions>
                    <Button color="primary" variant="contained">
                        Save details
                    </Button>
                </CardActions>
            </form>
        </Card>
    );
};

export default AccountDetails;
