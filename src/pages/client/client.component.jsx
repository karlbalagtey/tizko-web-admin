import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { DataGrid } from '@material-ui/data-grid';
import { Container } from '@material-ui/core';

import { selectAllClients } from '../../redux/user/user.selector';
import { getAllClientsList } from '../../redux/user/user.actions';

const columns = [
    { field: 'firstName', headerName: 'First name', width: 150 },
    { field: 'lastName', headerName: 'Last name', width: 150 },
    {
        field: 'email',
        headerName: 'Email',
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

const ClientPage = ({ clients, getAllClients }) => {

    useEffect(() => {
        getAllClients();
    }, []);

    if (clients !== null) {
        const { data } = clients;
        list.push(data);
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
            <h1>Clients</h1>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    autoPageSize={true}
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    sortModel={sortModel}
                    loading={clients ? false : true}
                />
            </div>
        </Container>
    );
};

const mapDispatchToProps = (dispatch) => ({
    getAllClients: (userToken) => dispatch(getAllClientsList(userToken)),
});

const mapStateToProps = createStructuredSelector({
    clients: selectAllClients,
});

export default connect(mapStateToProps, mapDispatchToProps)(ClientPage);
