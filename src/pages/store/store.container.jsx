import React, { useEffect, Fragment } from 'react';
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectIsStoreLoading } from "../../redux/store/store.selector";
import { getAllStoresList } from '../../redux/store/store.actions';
import Spinner from "../../components/spinner/spinner.component";
import StorePage from "./store.component";

const StorePageWrap = ({ getStoresList, isLoading }) => {
    useEffect(() => {
        getStoresList()
    }, []);

    return (
        <Fragment>
            { isLoading ? <Spinner /> : <StorePage /> }        
        </Fragment>
    )
}

const mapStateToProps = createStructuredSelector({
    isLoading: state => selectIsStoreLoading(state)
});

const mapDispatchToProps = (dispatch) => ({
    getStoresList: () => dispatch(getAllStoresList())
});

export default connect(mapStateToProps, mapDispatchToProps)(StorePageWrap);