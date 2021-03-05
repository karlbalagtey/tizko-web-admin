import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { createStructuredSelector } from 'reselect';

import { useStyles } from './store.styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import EnhancedTableHead from '../../components/table-head/table-head.component';
import TableToolbar from '../../components/table-toolbar/table-toolbar.component';

import {
    selectAllStores,
    selectAllHeadCells,
} from '../../redux/store/store.selector';

const StorePage = ({ stores, headCells }) => {
    const classes = useStyles();
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [selected, setSelected] = useState([]);
    const [dense, setDense] = useState(false);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleCheckClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }

        setSelected(newSelected);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked && stores) {
            const newSelecteds = stores.data.map((n) => n.id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleStorePage = (storeId) => {
        alert(storeId);
    }

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    return (
        <Fragment>
            <Paper square>
                <TableToolbar numSelected={selected.length} />
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                        aria-label="enhanced table"
                    >
                        {stores && (
                            <EnhancedTableHead
                                classes={classes}
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={stores.count}
                                headCells={headCells}
                            />
                        )}

                        <TableBody>
                            {stores &&
                                stores.data
                                    .slice(
                                        page * rowsPerPage,
                                        page * rowsPerPage + rowsPerPage
                                    )
                                    .map((store, index) => {
                                        const isItemSelected = isSelected(
                                            store.id
                                        );
                                        const labelId = `enhanced-table-checkbox-${index}`;

                                        return (
                                            <TableRow
                                                hover
                                                role="checkbox"
                                                tabIndex={-1}
                                                key={store.name}
                                            >
                                                <TableCell
                                                    onClick={(event) =>
                                                        handleCheckClick(
                                                            event,
                                                            store.id
                                                        )
                                                    }
                                                    padding="checkbox"
                                                >
                                                    <Checkbox
                                                        checked={isItemSelected}
                                                        inputProps={{
                                                            'aria-labelledby': labelId,
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell
                                                    component={Link}
                                                    to={`/dashboard/store/${store.id}`}
                                                    scope="row"
                                                >
                                                    {store.name}
                                                </TableCell>
                                                <TableCell>
                                                    {store.location}
                                                </TableCell>
                                                <TableCell>
                                                    {store.contactNumber}
                                                </TableCell>
                                                <TableCell>
                                                    {store.created}
                                                </TableCell>
                                                <TableCell>
                                                    {store.updated}
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                        </TableBody>
                    </Table>
                </TableContainer>
                {stores && (
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 20, 50, 100]}
                        component="div"
                        count={stores.count}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                )}
            </Paper>
            <FormControlLabel
                className={classes.denseSwitch}
                control={
                    <Switch checked={dense} onChange={handleChangeDense} />
                }
                label="Dense padding"
            />
        </Fragment>
    );
};

const mapStateToProps = createStructuredSelector({
    stores: selectAllStores,
    headCells: selectAllHeadCells,
});

export default connect(mapStateToProps, null)(StorePage);
