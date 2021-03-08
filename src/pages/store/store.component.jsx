import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { useStyles } from './store.styles';

import {
    Container,
    TableContainer,
    Table,
    TableRow,
    TableCell,
    TableBody,
    TablePagination,
    Paper,
    Switch,
    FormControlLabel,
} from '@material-ui/core';

import Spinner from '../../components/spinner/spinner.component';
import EnhancedTableHead from '../../components/table-head/table-head.component';
import EnhancedTableRow from '../../components/table-row/table-row.component';
import TableToolbar from '../../components/table-toolbar/table-toolbar.component';

import {
    selectAllStores,
    selectAllHeadCells,
    selectIsStoreLoading,
} from '../../redux/store/store.selector';

import {
    getComparator,
    stableSort,
} from '../../components/utils/utils.component';

const StorePage = ({
    page,
    rowsPerPage,
    order,
    orderBy,
    stores,
    headCells,
    isLoading,
    onHandleChangePage,
    onHandleChangeRowsPerPage,
    onHandleRequestSort,
}) => {
    const classes = useStyles();
    const [selected, setSelected] = useState([]);
    const [dense, setDense] = useState(false);

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

    const isSelected = (name) => selected.indexOf(name) !== -1;
    const storeCount = stores ? stores.totalResults : 0;

    return (
        <Container disableGutters={true}>
            <Paper square>
                <TableToolbar numSelected={selected.length} />
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
                            onRequestSort={onHandleRequestSort}
                            rowCount={storeCount}
                            headCells={headCells}
                        />

                        <TableBody>
                            {stores && !isLoading ? (
                                stableSort(
                                    stores.results,
                                    getComparator(order, orderBy)
                                )
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
                                            onHandleCheckClick={
                                                handleCheckClick
                                            }
                                        />
                                    ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6}>
                                        <Spinner />
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 20, 50, 100]}
                    component="div"
                    count={storeCount}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={onHandleChangePage}
                    onChangeRowsPerPage={onHandleChangeRowsPerPage}
                />
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
    isLoading: (state) => selectIsStoreLoading(state),
});

export default connect(mapStateToProps, null)(StorePage);
