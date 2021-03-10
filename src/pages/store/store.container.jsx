import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import StorePage from './store.component';
import { getAllStoresList } from '../../redux/store/store.actions';

const StorePageContainer = ({ getStoresList }) => {
    const history = useHistory();
    const [query, setQuery] = useState({});
    
    const handleNavigate = params => setQuery(params);

    useEffect(() => {
        const queryStr = queryString.stringify(query);
        
        history.push({ search: queryStr });
        getStoresList(queryStr);
    }, [getStoresList, query]);

    return <StorePage onNavigate={handleNavigate} />
};

const mapDispatchToProps = (dispatch) => ({
    getStoresList: (query) => dispatch(getAllStoresList(query)),
});

export default connect(null, mapDispatchToProps)(StorePageContainer);
