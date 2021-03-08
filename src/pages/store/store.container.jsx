import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { getAllStoresList } from '../../redux/store/store.actions';
import StorePage from './store.component';

const StorePageWrap = ({ getStoresList, match }) => {
    const { keyword, limit } = match.params;
    const history = useHistory();
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(0);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('name');
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    useEffect(() => {
        getStoresList(keyword, page);
        console.log(match);
    }, [keyword, page, rowsPerPage, match]);

    return (
        <StorePage
            onHandleChangePage={handleChangePage}
            onHandleChangeRowsPerPage={handleChangeRowsPerPage}
            onHandleRequestSort={handleRequestSort}
            page={page}
            rowsPerPage={rowsPerPage}
            order={order}
            orderBy={orderBy}
        />
    );
};

const mapDispatchToProps = (dispatch) => ({
    getStoresList: () => dispatch(getAllStoresList()),
});

export default connect(null, mapDispatchToProps)(StorePageWrap);
