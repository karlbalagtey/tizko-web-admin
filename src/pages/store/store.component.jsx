import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import queryString from 'query-string';

import { useStyles } from './store.styles';

import {
    Container,
    TableContainer,
    Table,
    TableBody,
    TablePagination,
    Paper,
    Switch,
    FormControlLabel,
} from '@material-ui/core';

import EnhancedTableHead from '../../components/table-head/table-head.component';
import EnhancedTableRow from '../../components/table-row/table-row.component';
import TableToolbar from '../../components/table-toolbar/table-toolbar.component';

import {
    selectAllStores,
    selectAllHeadCells,
    selectIsStoreLoaded,
} from '../../redux/store/store.selector';

import {
    getComparator,
    stableSort,
} from '../../components/utils/utils.component';

const StorePage = ({ stores, headCells, onNavigate, isLoaded }) => {
    const classes = useStyles();
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('name');
    const [searchQuery, setSearchQuery] = useState('');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(1);
    const [dense, setDense] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const location = useLocation();
    const params = queryString.parse(location.search);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = stores && stores.results.map((n) => n.id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
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

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const handleSearch = (e) => {
        const searchTerm = e.target.value;

        if (e.key === 'Enter') {
            setSearchQuery(searchTerm);
        }
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;
    const storeCount = stores ? stores.totalResults : 0;

    useEffect(() => {
        params.page = page;
        params.limit = rowsPerPage;

        if (searchQuery) {
            params.name = searchQuery;
        }

        const queryStr = queryString.stringify(params);

        onNavigate(queryStr);
    }, [page, rowsPerPage, searchQuery]);

    return (
        <Container disableGutters={true}>
            <Paper square>
                <TableToolbar numSelected={selected.length} handlePressEnter={handleSearch} />
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                        aria-label="enhanced table"
                    >
                        <EnhancedTableHead
                            classes={classes}
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={storeCount}
                            headCells={headCells}
                        />

                        <TableBody>
                            {isLoaded &&
                                stableSort(
                                    stores.results,
                                    getComparator(order, orderBy)
                                ).map((store, index) => (
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
                {isLoaded &&
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25, 50, 100]}
                        component="div"
                        count={storeCount}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                }
            </Paper>
            <FormControlLabel
                className={classes.denseSwitch}
                control={
                    <Switch checked={dense} onChange={handleChangeDense} />
                }
                label="Dense padding"
            />
        </Container>
    );
};

const mapStateToProps = createStructuredSelector({
    stores: selectAllStores,
    headCells: selectAllHeadCells,
    isLoaded: (state) => selectIsStoreLoaded(state),
});

export default connect(mapStateToProps, null)(StorePage);
