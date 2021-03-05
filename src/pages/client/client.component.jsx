import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { selectAllClients } from '../../redux/user/user.selector';

const ClientPage = ({ clients }) => (
    <Paper square>
        <TableContainer>
            <Table stickyHeader aria-label="caption table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Contact number</TableCell>
                        <TableCell>Role</TableCell>
                        <TableCell>Company address</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {clients &&
                        clients.data.map((client) => (
                            <TableRow key={client.id} hover>
                                <TableCell>
                                    {client.firstName} {client.lastName}
                                </TableCell>
                                <TableCell>{client.email}</TableCell>
                                <TableCell>{client.contactNumber}</TableCell>
                                <TableCell>{client.role}</TableCell>
                                <TableCell>{client.shippingAddress}</TableCell>
                            </TableRow>
                        ))}
                    <TableRow>
                        <TableCell></TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    </Paper>
);

const mapStateToProps = createStructuredSelector({
    clients: selectAllClients,
});

export default connect(mapStateToProps, null)(ClientPage);
