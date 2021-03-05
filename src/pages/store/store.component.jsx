import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { useStyles } from './store.styles';

import {
    TableContainer,
    Table,
    TableBody,
    TablePagination,
    Paper,
    Switch,
    FormControlLabel
} from '@material-ui/core';

import EnhancedTableHead from '../../components/table-head/table-head.component';
import EnhancedTableRow from '../../components/table-row/table-row.component';
import TableToolbar from '../../components/table-toolbar/table-toolbar.component';

import {
    selectAllStores,
    selectAllHeadCells,
} from '../../redux/store/store.selector';

const StorePage = ({ stores, headCells }) => {
    const classes = useStyles();
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('storeName');
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
                                    .map((store, index) => (
                                        <EnhancedTableRow 
                                            key={store.id}
                                            store={store}
                                            index={index}
                                            onIsSelected={isSelected}
                                            onHandleCheckClick={handleCheckClick}
                                        />
                                    ))}
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
