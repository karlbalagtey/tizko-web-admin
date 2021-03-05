import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { useStyles } from './store.styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { selectAllStores } from '../../redux/store/store.selector';

const StorePage = ({ stores }) => {
    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="caption table">
                <TableHead>
                    <TableRow>
                        <TableCell>Store name</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Location</TableCell>
                        <TableCell>Contact number</TableCell>
                        <TableCell>Created</TableCell>
                        <TableCell>Updated</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {stores && (
                        stores.data.map((store) => (
                            <TableRow key={store.name}>
                                <TableCell component="th" scope="row">
                                    {store.name}
                                </TableCell>
                                <TableCell>{store.description}</TableCell>
                                <TableCell>{store.location}</TableCell>
                                <TableCell>{store.contactNumber}</TableCell>
                                <TableCell>{store.created}</TableCell>
                                <TableCell>{store.updated}</TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

const mapStateToProps = createStructuredSelector({
    stores: selectAllStores,
});

export default connect(mapStateToProps, null)(StorePage);
