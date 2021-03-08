import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { useParams } from 'react-router-dom';
import { createStructuredSelector } from "reselect";

import { selectIsStoreLoading } from "../../redux/store/store.selector";
import { getStoreDetails } from '../../redux/store/store.actions';
import Spinner from "../../components/spinner/spinner.component";
import StoreDetailPage from './store-detail.component';

const StoreDetailWrap = ({ getStoreDetailsInfo, isLoading }) => {
    let { storeId } = useParams();

    useEffect(() => {
        getStoreDetailsInfo(storeId);
    }, []);

    return (
        <>
            { isLoading ? <Spinner /> : <StoreDetailPage /> }        
        </>
    )
}

const mapStateToProps = createStructuredSelector({
    isLoading: state => selectIsStoreLoading(state)
});

const mapDispatchToProps = (dispatch) => ({
    getStoreDetailsInfo: (storeId) => dispatch(getStoreDetails(storeId))
});

export default connect(mapStateToProps, mapDispatchToProps)(StoreDetailWrap);