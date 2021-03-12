import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import StorePage from './store.component';
import { getAllStoresList } from '../../redux/store/store.actions';

const StorePageContainer = ({ getStoresList }) => {
    const [query, setQuery] = useState(null);
    const history = useHistory();
    const handleNavigate = params => setQuery(params);

    useEffect(() => {
        if (query) {
            getStoresList(query);
            // history.push({ search: query });
        }
    }, [query]);

    return <StorePage onNavigate={handleNavigate} />
};

const mapDispatchToProps = (dispatch) => ({
    getStoresList: (query) => dispatch(getAllStoresList(query)),
});

export default connect(null, mapDispatchToProps)(StorePageContainer);
