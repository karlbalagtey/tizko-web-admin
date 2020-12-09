import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { DataGrid } from '@material-ui/data-grid';
import { Container } from '@material-ui/core';

import { selectAllStores } from '../../redux/store/store.selector';
import { getAllStoresList } from '../../redux/store/store.actions';

const columns = [
    { field: 'name', headerName: 'Store name', width: 250 },
    { field: 'description', headerName: 'Description', width: 350 },
    {
        field: 'location',
        headerName: 'Location',
        width: 200,
    },
    {
        field: 'contactNumber', headerName: 'Contact No', width: 200
    },
    {
        field: 'created',
        headerName: 'Created',
        width: 150
    },
    {
        field: 'updated',
        headerName: 'Last updated',
        width: 150
    },
];

let list = [];
let rows = [];

const StorePage = ({ stores, getAllStores }) => {
    useEffect(() => {
        getAllStores();
    }, []);

    if (stores !== null) {
        list.push(stores.data.data.data);
        rows = [...list[0]];
    }

    const sortModel = [
        {
            field: 'created',
            sort: 'desc'
        }
    ]

    return (
        <Container>
            <h1>Stores</h1>
            <div style={{ height: 500, width: '100%' }}>
                <DataGrid
                    autoPageSize={true}
                    rows={rows}
                    columns={columns}
                    id={'_id'}
                    pageSize={10}
                    sortModel={sortModel}
                    loading={stores ? false : true}
                />
            </div>
        </Container>
    );
};

const mapDispatchToProps = (dispatch) => ({
    getAllStores: (userToken) => dispatch(getAllStoresList(userToken)),
});

const mapStateToProps = createStructuredSelector({
    stores: selectAllStores,
});

export default connect(mapStateToProps, mapDispatchToProps)(StorePage);
