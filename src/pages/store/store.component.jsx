import React, { useEffect, useState } from 'react';
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

import Spinner from '../../components/spinner/spinner.component';

import { selectAllStores } from '../../redux/store/store.selector';
import { getAllStoresList } from '../../redux/store/store.actions';

const StorePage = ({ stores, getAllStores }) => {
    const classes = useStyles();
    const [storesList, setStoresList] = useState([]);

    useEffect(() => {
        const fetchStores = async () => {
            console.log('first');
            await getAllStores();
            await setStoresList(stores);
            console.log('second');
        }
        fetchStores();
     }, [storesList]);

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
                    { storesList &&
                        storesList.map((store) => (
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
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
};

const mapDispatchToProps = (dispatch) => ({
    getAllStores: (userToken) => dispatch(getAllStoresList(userToken)),
});

const mapStateToProps = createStructuredSelector({
    stores: selectAllStores,
});

export default connect(mapStateToProps, mapDispatchToProps)(StorePage);
