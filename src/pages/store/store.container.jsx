import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import StorePage from './store.component';
import { getAllStoresList } from '../../redux/store/store.actions';

const StorePageContainer = ({ getStoresList }) => {
    const [query, setQuery] = useState(null);
    const handleNavigate = params => setQuery(params);

    useEffect(() => {
        if (query) {
            getStoresList(query);
        }
    }, [query]);

    return <StorePage onNavigate={handleNavigate} />
};

const mapDispatchToProps = (dispatch) => ({
    getStoresList: (query) => dispatch(getAllStoresList(query)),
});

export default connect(null, mapDispatchToProps)(StorePageContainer);
