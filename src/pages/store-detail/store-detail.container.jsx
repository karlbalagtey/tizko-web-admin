import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { useParams } from 'react-router-dom';
import { createStructuredSelector } from "reselect";

import { selectStoreDetailLoaded } from "../../redux/store/store.selector";
import { getStoreDetails } from '../../redux/store/store.actions';
import Spinner from "../../components/spinner/spinner.component";
import StoreDetailPage from './store-detail.component';

const StoreDetailComponent = ({ getStoreDetailsInfo, hasLoaded }) => {
    const { storeId } = useParams();

    useEffect(() => {
        getStoreDetailsInfo(storeId);
    }, [getStoreDetailsInfo, storeId]);

    return hasLoaded ? <Spinner /> : <StoreDetailPage />
}

const mapStateToProps = createStructuredSelector({
    hasLoaded: (state) => selectStoreDetailLoaded(state)
});

const mapDispatchToProps = (dispatch) => ({
    getStoreDetailsInfo: (storeId) => dispatch(getStoreDetails(storeId))
});

export default connect(mapStateToProps, mapDispatchToProps)(StoreDetailComponent);